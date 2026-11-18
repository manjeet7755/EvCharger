import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes('placeholder') &&
  !supabaseAnonKey.includes('placeholder')
);

// Create client if configured, otherwise null
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Server-side double booking conflict check.
 * Validates whether the given charger, date, and timeslot are already booked.
 * Checks Supabase database first; falls back to local persistent store.
 */
export async function validateBookingSlotConflict({ chargerId, date, timeSlot }) {
  // If real Supabase is configured, run server query
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('id, charger_id, date, time_slot, status')
        .eq('charger_id', chargerId)
        .eq('date', date)
        .eq('time_slot', timeSlot)
        .in('status', ['Confirmed', 'Pending', 'In Progress']);

      if (error) {
        console.warn('Supabase query error, falling back to local validation:', error.message);
      } else if (data && data.length > 0) {
        return {
          isConflict: true,
          message: `Slot ${timeSlot} on ${date} is already reserved by another driver.`
        };
      }
    } catch (err) {
      console.warn('Error querying Supabase bookings:', err);
    }
  }

  // Check locally persisted bookings
  try {
    const localBookings = JSON.parse(localStorage.getItem('evcharge_bookings') || '[]');
    const conflict = localBookings.find(
      b => b.chargerId === chargerId &&
           b.date === date &&
           b.timeSlot === timeSlot &&
           b.status !== 'Cancelled'
    );

    if (conflict) {
      return {
        isConflict: true,
        message: `Slot "${timeSlot}" on ${date} has already been reserved. Please select another slot.`
      };
    }
  } catch (e) {
    console.error('Error reading local bookings store:', e);
  }

  return { isConflict: false };
}

