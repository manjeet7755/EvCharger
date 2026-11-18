import React from 'react';
import { useVehicles } from '../../context/VehicleContext';
import { BatteryCharging, Zap, Thermometer, Gauge, Navigation, ChevronDown, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function VehicleStatsWidget({ nearbyStation }) {
  const { vehicles, activeVehicle, setActiveVehicleId } = useVehicles();

  if (!activeVehicle) return null;

  return (
    <div className="bg-[#0D2921] border border-[#214438] rounded-2xl p-5 shadow-card-glow space-y-5">
      
      {/* Widget Header with vehicle switcher */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h3 className="text-base font-bold text-[#F5F7F6]">Vehicle Telemetry</h3>
          <span className="w-2 h-2 rounded-full bg-[#20D995] animate-pulse" />
        </div>

        {/* Vehicle Selector */}
        {vehicles.length > 1 && (
          <div className="relative">
            <select
              value={activeVehicle.id}
              onChange={(e) => setActiveVehicleId(e.target.value)}
              className="bg-[#061A15] border border-[#214438] text-xs font-semibold text-[#20D995] py-1 px-2.5 rounded-lg focus:outline-none cursor-pointer"
            >
              {vehicles.map((v) => (
                <option key={v.id} value={v.id} className="bg-[#0D2921] text-[#F5F7F6]">
                  {v.make} {v.model}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Vehicle Image & Name (inspired by Screenshot 2) */}
      <div className="relative rounded-xl overflow-hidden bg-gradient-to-b from-[#061A15] to-[#08211B] p-4 text-center border border-[#214438]">
        <img
          src={activeVehicle.image || "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=600&q=80"}
          alt={activeVehicle.model}
          className="w-full h-32 object-contain drop-shadow-xl hover:scale-105 transition-transform duration-300"
        />
        <div className="mt-2 flex items-center justify-between text-xs">
          <div>
            <span className="text-[#A5B8AF] text-[10px] uppercase font-bold block">Model</span>
            <span className="font-bold text-[#F5F7F6]">{activeVehicle.make} {activeVehicle.model}</span>
          </div>
          <div className="text-right">
            <span className="text-[#A5B8AF] text-[10px] uppercase font-bold block">License Plate</span>
            <span className="font-mono font-bold text-[#20D995]">{activeVehicle.plate}</span>
          </div>
        </div>
      </div>

      {/* Key Telemetry Stats Grid (inspired by Screenshot 2) */}
      <div className="grid grid-cols-2 gap-3">
        
        {/* Battery Level */}
        <div className="bg-[#061A15] p-3 rounded-xl border border-[#214438]">
          <div className="flex items-center justify-between text-xs text-[#A5B8AF] mb-1">
            <span className="flex items-center space-x-1">
              <BatteryCharging className="w-3.5 h-3.5 text-[#20D995]" />
              <span>Battery</span>
            </span>
            <span className="font-bold text-[#20D995]">{activeVehicle.currentBattery}%</span>
          </div>
          {/* Progress bar */}
          <div className="w-full bg-[#0D2921] h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#0DAB75] to-[#20D995] h-full rounded-full shadow-mint-sm"
              style={{ width: `${activeVehicle.currentBattery}%` }}
            />
          </div>
        </div>

        {/* Estimated Range */}
        <div className="bg-[#061A15] p-3 rounded-xl border border-[#214438]">
          <div className="text-xs text-[#A5B8AF] flex items-center space-x-1">
            <Gauge className="w-3.5 h-3.5 text-[#20D995]" />
            <span>Range</span>
          </div>
          <p className="text-lg font-black text-[#F5F7F6] mt-0.5">{activeVehicle.range}</p>
        </div>

        {/* Pack Temperature */}
        <div className="bg-[#061A15] p-3 rounded-xl border border-[#214438]">
          <div className="text-xs text-[#A5B8AF] flex items-center space-x-1">
            <Thermometer className="w-3.5 h-3.5 text-[#20D995]" />
            <span>Battery Temp</span>
          </div>
          <p className="text-sm font-bold text-[#F5F7F6] mt-0.5">{activeVehicle.temp}</p>
        </div>

        {/* Battery Health */}
        <div className="bg-[#061A15] p-3 rounded-xl border border-[#214438]">
          <div className="text-xs text-[#A5B8AF] flex items-center space-x-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#20D995]" />
            <span>Health</span>
          </div>
          <p className="text-sm font-bold text-[#20D995] mt-0.5">
            {activeVehicle.batteryStatus}
          </p>
        </div>

      </div>

      {/* Nearby Recommended Station (inspired by Screenshot 2) */}
      {nearbyStation && (
        <div className="bg-[#061A15] p-3.5 rounded-xl border border-[#214438] flex items-center justify-between">
          <div>
            <span className="text-[10px] text-[#A5B8AF] uppercase font-bold tracking-wider block">
              Nearest Compatible
            </span>
            <p className="text-xs font-bold text-[#F5F7F6] truncate max-w-[170px]">
              {nearbyStation.name}
            </p>
            <p className="text-[11px] text-[#20D995] font-semibold mt-0.5">
              {nearbyStation.distance} • {nearbyStation.connectors[0]?.power}
            </p>
          </div>
          
          <Link
            to={`/chargers/${nearbyStation.id}`}
            className="w-8 h-8 rounded-lg bg-[#20D995] hover:bg-[#1ab87e] text-[#061A15] flex items-center justify-center transition-transform hover:scale-110 shadow-mint-sm shrink-0"
            title="Navigate to Station"
          >
            <Navigation className="w-4 h-4 fill-[#061A15]" />
          </Link>
        </div>
      )}

      {/* Avg Energy Mini Curve Graph (inspired by Screenshot 2) */}
      <div className="bg-[#061A15] p-3.5 rounded-xl border border-[#214438] space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-[#A5B8AF]">Avg Consumption</span>
          <span className="font-bold text-[#20D995]">165 Wh / km</span>
        </div>
        <div className="h-10 w-full pt-1">
          <svg viewBox="0 0 200 40" className="w-full h-full overflow-visible">
            <path
              d="M 0,25 Q 30,10 60,22 T 120,18 T 160,28 T 200,15"
              fill="none"
              stroke="#20D995"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx="200" cy="15" r="3.5" fill="#20D995" />
          </svg>
        </div>
      </div>

    </div>
  );
}

