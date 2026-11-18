import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('evcharge_user');
    if (saved) {
      try { return JSON.parse(saved); } catch { return null; }
    }
    // Default logged in user for showcase
    return {
      id: 'usr-1',
      name: 'Tejas Shukla',
      firstName: 'Tejas',
      lastName: 'Shukla',
      email: 'tejas@evcharge.in',
      phone: '+91 98765 43210',
      role: 'host', // host & driver
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      totalCharges: 14,
      totalEarned: '₹42,850'
    };
  });
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    if (isSupabaseConfigured && supabase) {
      // Listen to auth state
      const { data: authListener } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          if (session?.user) {
            const formatted = {
              id: session.user.id,
              email: session.user.email,
              name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'EV Driver',
              role: session.user.user_metadata?.role || 'driver',
              avatar: session.user.user_metadata?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
            };
            setUser(formatted);
            localStorage.setItem('evcharge_user', JSON.stringify(formatted));
          } else if (event === 'SIGNED_OUT') {
            setUser(null);
            localStorage.removeItem('evcharge_user');
          }
        }
      );

      return () => {
        authListener.subscription.unsubscribe();
      };
    }
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    setAuthError(null);

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (error) throw error;
        return { success: true, user: data.user };
      } catch (err) {
        setAuthError(err.message);
        return { success: false, error: err.message };
      } finally {
        setLoading(false);
      }
    }

    // Demo authentication fallback
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUser = {
          id: 'usr-1',
          name: email.split('@')[0].toUpperCase(),
          firstName: email.split('@')[0],
          lastName: '',
          email: email,
          phone: '+91 98765 43210',
          role: 'host',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
          totalCharges: 14,
          totalEarned: '₹42,850'
        };
        setUser(mockUser);
        localStorage.setItem('evcharge_user', JSON.stringify(mockUser));
        setLoading(false);
        resolve({ success: true, user: mockUser });
      }, 500);
    });
  };

  const signup = async ({ firstName, lastName, email, password }) => {
    setLoading(true);
    setAuthError(null);

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              first_name: firstName,
              last_name: lastName,
              full_name: `${firstName} ${lastName}`.trim(),
              role: 'driver'
            }
          }
        });
        if (error) throw error;
        return { success: true, user: data.user };
      } catch (err) {
        setAuthError(err.message);
        return { success: false, error: err.message };
      } finally {
        setLoading(false);
      }
    }

    // Demo signup fallback
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser = {
          id: 'usr-' + Date.now(),
          name: `${firstName} ${lastName}`.trim() || 'EV User',
          firstName,
          lastName,
          email,
          phone: '+91 99887 66554',
          role: 'driver',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
          totalCharges: 0,
          totalEarned: '₹0'
        };
        setUser(newUser);
        localStorage.setItem('evcharge_user', JSON.stringify(newUser));
        setLoading(false);
        resolve({ success: true, user: newUser });
      }, 500);
    });
  };

  const resetPassword = async (email) => {
    setLoading(true);
    setAuthError(null);

    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`
        });
        if (error) throw error;
        return { success: true };
      } catch (err) {
        setAuthError(err.message);
        return { success: false, error: err.message };
      } finally {
        setLoading(false);
      }
    }

    return new Promise((resolve) => {
      setTimeout(() => {
        setLoading(false);
        resolve({ success: true, message: `Password reset email sent to ${email}` });
      }, 600);
    });
  };

  const logout = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
    localStorage.removeItem('evcharge_user');
  };

  const updateProfile = (data) => {
    setUser((prev) => {
      const updated = { ...prev, ...data };
      localStorage.setItem('evcharge_user', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        authError,
        isConfigured: isSupabaseConfigured,
        login,
        signup,
        logout,
        resetPassword,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

