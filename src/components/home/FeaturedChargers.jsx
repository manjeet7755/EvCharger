import React from 'react';
import { Link } from 'react-router-dom';
import { getStoredChargers } from '../../lib/storage';
import { MapPin, Star, Zap, ArrowRight, ShieldCheck } from 'lucide-react';

export default function FeaturedChargers() {
  const chargers = getStoredChargers().slice(0, 3);

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#20D995] bg-[#0D2921] border border-[#214438] px-3.5 py-1.5 rounded-full">
              Handpicked Hubs
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F5F7F6] mt-3">
              Featured Charging Stations
            </h2>
            <p className="text-sm sm:text-base text-[#A5B8AF] mt-2">
              Top-rated fast chargers with verified uptime and superior amenities.
            </p>
          </div>
          <Link
            to="/chargers"
            className="flex items-center space-x-2 text-sm font-bold text-[#20D995] hover:underline underline-offset-4"
          >
            <span>View all 10,000+ chargers</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Chargers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {chargers.map((ch) => (
            <div
              key={ch.id}
              className="rounded-3xl bg-[#0D2921] border border-[#214438] overflow-hidden hover:border-[#20D995]/60 transition-all group flex flex-col justify-between shadow-card-glow"
            >
              <div>
                {/* Image Container with Badges */}
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={ch.images[0]}
                    alt={ch.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D2921] via-transparent to-black/40" />
                  
                  {/* Status Pill */}
                  <div className="absolute top-3 left-3 flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#061A15]/80 backdrop-blur-md border border-[#214438] text-xs font-semibold text-[#20D995]">
                    <span className="w-2 h-2 rounded-full bg-[#20D995] animate-pulse" />
                    <span>{ch.status} • {ch.availablePorts}/{ch.totalPorts} Bays</span>
                  </div>

                  {/* Rating */}
                  <div className="absolute top-3 right-3 flex items-center space-x-1 px-2.5 py-1 rounded-full bg-[#061A15]/80 backdrop-blur-md border border-[#214438] text-xs font-bold text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{ch.rating}</span>
                    <span className="text-[#A5B8AF] text-[10px]">({ch.reviewsCount})</span>
                  </div>

                  {/* Tag */}
                  <div className="absolute bottom-3 left-3 text-[11px] font-bold text-[#F5F7F6] bg-[#20D995]/20 backdrop-blur-md px-2.5 py-1 rounded-lg border border-[#20D995]/30">
                    {ch.tag}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-[#F5F7F6] group-hover:text-[#20D995] transition-colors">
                      {ch.name}
                    </h3>
                    <p className="text-xs text-[#A5B8AF] flex items-center space-x-1.5 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-[#20D995] shrink-0" />
                      <span className="truncate">{ch.address}</span>
                    </p>
                  </div>

                  {/* Connectors & Speed */}
                  <div className="flex flex-wrap gap-2">
                    {ch.connectors.map((c, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg bg-[#061A15] border border-[#214438] text-xs font-medium text-[#F5F7F6] flex items-center space-x-1"
                      >
                        <Zap className="w-3 h-3 text-[#20D995]" />
                        <span>{c.type}</span>
                        <span className="text-[#A5B8AF] text-[10px]">({c.power})</span>
                      </span>
                    ))}
                  </div>

                  {/* Price & Distance */}
                  <div className="pt-3 border-t border-[#214438]/70 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[#A5B8AF] block">Charging Rate</span>
                      <span className="text-base font-extrabold text-[#20D995]">
                        {ch.pricing.currency}{ch.pricing.perKwh}
                        <span className="text-xs text-[#A5B8AF] font-normal"> / kWh</span>
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[#A5B8AF] block">Distance</span>
                      <span className="text-sm font-bold text-[#F5F7F6]">{ch.distance}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 grid grid-cols-2 gap-3">
                <Link
                  to={`/chargers/${ch.id}`}
                  className="w-full py-2.5 rounded-xl font-semibold text-xs text-center text-[#F5F7F6] bg-[#061A15] border border-[#214438] hover:border-[#20D995] hover:text-[#20D995] transition-all"
                >
                  View Details
                </Link>
                <Link
                  to={`/chargers/${ch.id}?action=book`}
                  className="w-full py-2.5 rounded-xl font-bold text-xs text-center text-[#061A15] bg-[#20D995] hover:bg-[#1ab87e] shadow-mint-sm transition-all"
                >
                  Book Slot
                </Link>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

