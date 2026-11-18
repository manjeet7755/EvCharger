import React, { createContext, useContext, useState, useEffect } from 'react';
import { getStoredVehicles, saveStoredVehicles } from '../lib/storage';

const VehicleContext = createContext(null);

export function VehicleProvider({ children }) {
  const [vehicles, setVehicles] = useState(getStoredVehicles);
  const [activeVehicleId, setActiveVehicleId] = useState(() => {
    return vehicles[0]?.id || null;
  });

  useEffect(() => {
    saveStoredVehicles(vehicles);
  }, [vehicles]);

  const activeVehicle = vehicles.find(v => v.id === activeVehicleId) || vehicles[0] || null;

  const addVehicle = (newVeh) => {
    const formatted = {
      id: 'veh-' + Date.now(),
      make: newVeh.make,
      model: newVeh.model,
      year: parseInt(newVeh.year, 10) || 2024,
      batteryCapacity: parseFloat(newVeh.batteryCapacity) || 60,
      currentBattery: parseInt(newVeh.currentBattery, 10) || 75,
      range: `${Math.round((newVeh.batteryCapacity || 60) * 3.5)} miles`,
      temp: '76.0°F',
      batteryStatus: 'Good',
      connectorType: newVeh.connectorType || 'CCS2',
      plate: newVeh.plate.toUpperCase(),
      image: newVeh.image || 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=600&q=80'
    };

    const updated = [formatted, ...vehicles];
    setVehicles(updated);
    setActiveVehicleId(formatted.id);
    return formatted;
  };

  const deleteVehicle = (id) => {
    const updated = vehicles.filter(v => v.id !== id);
    setVehicles(updated);
    if (activeVehicleId === id && updated.length > 0) {
      setActiveVehicleId(updated[0].id);
    }
  };

  return (
    <VehicleContext.Provider
      value={{
        vehicles,
        activeVehicle,
        activeVehicleId,
        setActiveVehicleId,
        addVehicle,
        deleteVehicle
      }}
    >
      {children}
    </VehicleContext.Provider>
  );
}

export function useVehicles() {
  const context = useContext(VehicleContext);
  if (!context) throw new Error('useVehicles must be used within a VehicleProvider');
  return context;
}

