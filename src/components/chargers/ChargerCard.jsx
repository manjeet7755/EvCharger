import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, Zap, Clock, ShieldCheck, ChevronRight } from 'lucide-react';

export default function ChargerCard({ charger, isSelected, onSelect, onBook }) {
  const isAvailable = charger.status === 'Available' && charger.availablePorts > 0;

  return (
    <div
      onClick={() => onSelect && onSelect(charger)}
      className={`rounded-2xl transition-all duration-300 cursor-pointer overflow-hidden border ${
        isSelected
          ? 'bg-[#13382D] border-[#20D995] shadow-mint-glow scale-[1.01]'
          : 'bg-[#0D2921] border-[#214438] hover:border-[#20D995]/60 hover:bg-[#13382D]/70'
      }`}
    >
      <div className="p-4 sm:p-5 flex flex-col sm:flex-row gap-4">
        
        {/* Charger Thumbnail Photo */}
        <div className="relative w-full sm:w-36 h-36 rounded-xl overflow-hidden shrink-0">
          <img
            src={charger.images?.[0] || "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=400&q=80"}
            alt={charger.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Status Badge on thumbnail */}
          <div className="absolute bottom-2 left-2 flex items-center space-x-1.5 px-2 py-0.5 rounded-full bg-[#061A15]/85 backdrop-blur-md text-[10px] font-bold">
            <span
              className={`w-2 h-2 rounded-full ${
                isAvailable ? 'bg-[#20D995] animate-pulse' : 'bg-amber-400'
              }`}
            />
            <span className={isAvailable ? 'text-[#20D995]' : 'text-amber-400'}>
              {isAvailable ? `${charger.availablePorts}/${charger.totalPorts} Free` : 'Occupied'}
            </span>
          </div>
        </div>

        {/* Details Content */}
        <div className="flex-1 flex flex-col justify-between space-y-2">
          
          <div>
            {/* Top row: Name and Rating */}
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#F5F7F6] hover:text-[#20D995] transition-colors leading-tight">
                  {charger.name}
                </h3>
                <p className="text-xs text-[#A5B8AF] flex items-center space-x-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-[#20D995] shrink-0" />
                  <span className="truncate max-w-[200px] sm:max-w-xs">{charger.address}</span>
                  {charger.distance && (
                    <span className="font-semibold text-[#20D995] ml-1">
                      • {charger.distance}
                    </span>
                  )}
                </p>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-1 px-2 py-0.5 rounded-md bg-[#061A15] border border-[#214438] text-xs font-bold text-amber-400 shrink-0">
                <Star className="w-3 h-3 fill-amber-400" />
                <span>{charger.rating}</span>
                <span className="text-[#A5B8AF] text-[10px]">({charger.reviewsCount})</span>
              </div>
            </div>

            {/* Connectors & Power */}
            <div className="flex flex-wrap gap-1.5 mt-2.5">
              {charger.connectors?.map((conn, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md bg-[#061A15] border border-[#214438] text-[11px] font-medium text-[#F5F7F6] flex items-center space-x-1"
                >
                  <Zap className="w-3 h-3 text-[#20D995]" />
                  <span>{conn.type}</span>
                  <span className="text-[#20D995] font-mono font-semibold">{conn.power}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Pricing, Open Hours & Actions */}
          <div className="pt-2 border-t border-[#214438]/60 flex items-center justify-between gap-3 flex-wrap">
            <div>
              <span className="text-[11px] text-[#A5B8AF] block">Rate</span>
              <div className="text-base font-extrabold text-[#20D995]">
                {charger.pricing?.currency || '₹'}{charger.pricing?.perKwh}
                <span className="text-xs font-normal text-[#A5B8AF]"> / kWh</span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Link
                to={`/chargers/${charger.id}`}
                onClick={(e) => e.stopPropagation()}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[#061A15] text-[#F5F7F6] border border-[#214438] hover:border-[#20D995] hover:text-[#20D995] transition-all"
              >
                View Details
              </Link>
              
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (onBook) onBook(charger);
                }}
                className="px-4 py-1.5 rounded-lg text-xs font-bold bg-[#20D995] text-[#061A15] hover:bg-[#1ab87e] shadow-mint-sm transition-all flex items-center space-x-1"
              >
                <span>Book Slot</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

