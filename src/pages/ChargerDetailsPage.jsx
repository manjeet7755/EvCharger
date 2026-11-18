import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams, Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import BookingFlowModal from '../components/booking/BookingFlowModal';
import { getStoredChargers, updateStoredCharger } from '../lib/storage';
import { useAuth } from '../context/AuthContext';
import { 
  MapPin, 
  Star, 
  Zap, 
  Clock, 
  ShieldCheck, 
  Check, 
  ArrowLeft, 
  Calendar, 
  Share2, 
  Heart, 
  MessageSquare, 
  Award, 
  Coffee, 
  Wifi, 
  Car, 
  AlertCircle 
} from 'lucide-react';

export default function ChargerDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const autoBook = searchParams.get('action') === 'book';
  const { user } = useAuth();

  const [chargers, setChargers] = useState(getStoredChargers);
  const charger = chargers.find(c => c.id === id) || chargers[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(autoBook);
  const [isSaved, setIsSaved] = useState(false);

  // Review submission state
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [showReviewSuccess, setShowReviewSuccess] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (autoBook) {
      setIsBookingModalOpen(true);
    }
  }, [autoBook]);

  if (!charger) {
    return (
      <div className="min-h-screen bg-[#061A15] text-[#F5F7F6] flex flex-col justify-between">
        <Navbar />
        <div className="text-center py-24 space-y-4">
          <AlertCircle className="w-12 h-12 text-amber-400 mx-auto" />
          <h2 className="text-2xl font-bold">Charger Not Found</h2>
          <p className="text-sm text-[#A5B8AF]">The charging station you requested could not be located.</p>
          <Link to="/chargers" className="inline-block px-5 py-2.5 bg-[#20D995] text-[#061A15] font-bold rounded-xl">
            Back to Stations
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const newRev = {
      id: 'rev-' + Date.now(),
      user: user?.name || 'EV Driver',
      rating: newRating,
      date: 'Just now',
      comment: newComment
    };

    const updatedReviews = [newRev, ...(charger.reviews || [])];
    const newRatingAvg = Math.round(
      (updatedReviews.reduce((acc, r) => acc + r.rating, 0) / updatedReviews.length) * 10
    ) / 10;

    const updatedChargers = updateStoredCharger(charger.id, {
      reviews: updatedReviews,
      reviewsCount: (charger.reviewsCount || 0) + 1,
      rating: newRatingAvg
    });

    setChargers(updatedChargers);
    setNewComment('');
    setShowReviewSuccess(true);
    setTimeout(() => setShowReviewSuccess(false), 3500);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: charger.name,
        text: `Charge your EV at ${charger.name}`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Station link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-[#061A15] text-[#F5F7F6] flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-xs font-semibold text-[#A5B8AF] hover:text-[#20D995] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Discovery</span>
          </button>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsSaved(!isSaved)}
              className={`p-2 rounded-xl border transition-colors flex items-center space-x-1.5 text-xs font-semibold ${
                isSaved
                  ? 'bg-red-500/20 text-red-400 border-red-500/40'
                  : 'bg-[#0D2921] text-[#A5B8AF] border-[#214438] hover:text-[#F5F7F6]'
              }`}
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-red-400' : ''}`} />
              <span>{isSaved ? 'Saved' : 'Save'}</span>
            </button>
            <button
              onClick={handleShare}
              className="p-2 rounded-xl bg-[#0D2921] border border-[#214438] text-[#A5B8AF] hover:text-[#20D995] text-xs font-semibold flex items-center space-x-1.5"
            >
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* Station Title Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-[#214438]">
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2.5">
              <span className="text-xs font-bold bg-[#20D995]/20 text-[#20D995] border border-[#20D995]/30 px-3 py-0.5 rounded-full">
                {charger.tag || 'High Power Hub'}
              </span>
              <span className="text-xs text-[#20D995] font-semibold flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-[#20D995] animate-pulse" />
                <span>{charger.status} • {charger.availablePorts}/{charger.totalPorts} Bays Ready</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-[#F5F7F6] tracking-tight">
              {charger.name}
            </h1>

            <p className="text-sm text-[#A5B8AF] flex items-center space-x-1.5">
              <MapPin className="w-4 h-4 text-[#20D995] shrink-0" />
              <span>{charger.address}</span>
              <span className="text-[#20D995] font-bold ml-1">• {charger.distance} away</span>
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="flex items-center space-x-1.5 text-amber-400 justify-end">
                <Star className="w-5 h-5 fill-amber-400" />
                <span className="text-xl font-black text-[#F5F7F6]">{charger.rating}</span>
              </div>
              <span className="text-xs text-[#A5B8AF]">({charger.reviewsCount} verified reviews)</span>
            </div>

            <button
              type="button"
              onClick={() => setIsBookingModalOpen(true)}
              className="px-6 py-3 rounded-xl font-bold text-sm bg-[#20D995] text-[#061A15] hover:bg-[#1ab87e] shadow-mint-glow transition-all"
            >
              Book Slot Now
            </button>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="space-y-3">
          {/* Main Hero Photo */}
          <div className="relative h-72 sm:h-96 w-full rounded-3xl overflow-hidden border border-[#214438] bg-[#061A15]">
            <img
              src={charger.images[activeImageIndex] || charger.images[0]}
              alt={charger.name}
              className="w-full h-full object-cover transition-all duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#061A15]/60 via-transparent to-transparent pointer-events-none" />
            
            <div className="absolute bottom-4 left-4 flex items-center space-x-2 bg-[#061A15]/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#214438] text-xs font-semibold">
              <Clock className="w-3.5 h-3.5 text-[#20D995]" />
              <span>{charger.operatingHours}</span>
            </div>
          </div>

          {/* Thumbnails Row */}
          {charger.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-1">
              {charger.images.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveImageIndex(i)}
                  className={`relative w-24 h-16 rounded-xl overflow-hidden border transition-all shrink-0 ${
                    activeImageIndex === i
                      ? 'border-[#20D995] shadow-mint-sm scale-105'
                      : 'border-[#214438] opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`thumb-${i}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Main Details & Booking Section Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (8 cols): Specifications, Description, Host, Reviews */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Description */}
            <div className="bg-[#0D2921] border border-[#214438] rounded-2xl p-6 space-y-3 shadow-card-glow">
              <h3 className="text-lg font-bold text-[#F5F7F6]">Station Overview</h3>
              <p className="text-sm text-[#A5B8AF] leading-relaxed">
                {charger.description}
              </p>
            </div>

            {/* Technical Specifications Grid */}
            <div className="bg-[#0D2921] border border-[#214438] rounded-2xl p-6 space-y-4 shadow-card-glow">
              <h3 className="text-lg font-bold text-[#F5F7F6]">Connector Compatibility & Rates</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {charger.connectors.map((c, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-[#061A15] border border-[#214438] space-y-2 hover:border-[#20D995]/50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-base text-[#F5F7F6] flex items-center space-x-1.5">
                        <Zap className="w-4 h-4 text-[#20D995]" />
                        <span>{c.type}</span>
                      </span>
                      <span className="text-xs font-mono font-bold text-[#20D995] bg-[#0D2921] px-2 py-0.5 rounded border border-[#214438]">
                        {c.power}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-[#A5B8AF] pt-1">
                      <span>Rate: <strong className="text-[#20D995]">{charger.pricing.currency}{c.price}/kWh</strong></span>
                      <span className="flex items-center space-x-1">
                        <span className={`w-2 h-2 rounded-full ${c.status === 'Available' ? 'bg-[#20D995]' : 'bg-amber-400'}`} />
                        <span>{c.status}</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pricing Fineprint */}
              <div className="grid grid-cols-3 gap-3 pt-3 border-t border-[#214438] text-xs text-[#A5B8AF]">
                <div>
                  <span className="block text-[10px] uppercase font-bold text-[#F5F7F6]">Idle Parking Fee</span>
                  <span>{charger.pricing.currency}{charger.pricing.idleFeePerMin || '2.0'}/min after 15m</span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-bold text-[#F5F7F6]">Entry Fee</span>
                  <span>Free / Included</span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-bold text-[#F5F7F6]">Payment</span>
                  <span>Wallet, UPI, Card</span>
                </div>
              </div>
            </div>

            {/* Amenities Section */}
            <div className="bg-[#0D2921] border border-[#214438] rounded-2xl p-6 space-y-4 shadow-card-glow">
              <h3 className="text-lg font-bold text-[#F5F7F6]">Station Amenities & Driver Comfort</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {charger.amenities.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center space-x-2 text-xs text-[#F5F7F6] p-2.5 rounded-xl bg-[#061A15] border border-[#214438]"
                  >
                    <Check className="w-4 h-4 text-[#20D995] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Host Profile Card */}
            <div className="bg-[#0D2921] border border-[#214438] rounded-2xl p-6 space-y-4 shadow-card-glow">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={charger.host.avatar}
                    alt={charger.host.name}
                    className="w-14 h-14 rounded-2xl object-cover border border-[#20D995]"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="text-base font-bold text-[#F5F7F6]">{charger.host.name}</h4>
                      {charger.host.isSuperHost && (
                        <span className="flex items-center space-x-1 text-[10px] font-bold text-[#20D995] bg-[#20D995]/20 border border-[#20D995]/30 px-2 py-0.5 rounded-full">
                          <Award className="w-3 h-3" />
                          <span>SuperHost</span>
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#A5B8AF]">Member since {charger.host.joined} • Verified Charger Owner</p>
                  </div>
                </div>

                <a
                  href={`tel:${charger.host.phone}`}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#061A15] border border-[#214438] text-[#20D995] hover:bg-[#13382D] transition-colors"
                >
                  Contact Host
                </a>
              </div>
            </div>

            {/* Ratings & User Reviews */}
            <div className="bg-[#0D2921] border border-[#214438] rounded-2xl p-6 space-y-6 shadow-card-glow">
              <div className="flex items-center justify-between pb-4 border-b border-[#214438]">
                <h3 className="text-lg font-bold text-[#F5F7F6] flex items-center space-x-2">
                  <MessageSquare className="w-5 h-5 text-[#20D995]" />
                  <span>Ratings & Driver Experiences</span>
                </h3>
                <span className="text-xs font-bold text-[#20D995]">
                  {charger.rating} out of 5 stars
                </span>
              </div>

              {/* Review Form */}
              <form onSubmit={handleAddReview} className="space-y-3 bg-[#061A15] p-4 rounded-xl border border-[#214438]">
                <label className="text-xs font-bold text-[#F5F7F6] block">Leave a Verified Review</label>
                
                {/* Rating Stars Picker */}
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setNewRating(s)}
                      className="p-1 text-amber-400 hover:scale-125 transition-transform"
                    >
                      <Star className={`w-5 h-5 ${s <= newRating ? 'fill-amber-400' : 'text-[#214438]'}`} />
                    </button>
                  ))}
                  <span className="text-xs text-[#A5B8AF] ml-2">({newRating} Stars)</span>
                </div>

                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="How was your charging experience? Speeds, cleanliness, accessibility..."
                  rows={2}
                  className="w-full bg-[#0D2921] border border-[#214438] focus:border-[#20D995] rounded-xl p-3 text-xs text-[#F5F7F6] focus:outline-none"
                />

                <div className="flex items-center justify-between pt-1">
                  {showReviewSuccess ? (
                    <span className="text-xs text-[#20D995] font-semibold">Review submitted successfully!</span>
                  ) : <div />}
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-[#20D995] text-[#061A15] hover:bg-[#1ab87e] shadow-mint-sm"
                  >
                    Post Review
                  </button>
                </div>
              </form>

              {/* Existing Reviews List */}
              <div className="space-y-4">
                {charger.reviews?.map((r) => (
                  <div key={r.id} className="p-4 rounded-xl bg-[#061A15] border border-[#214438] space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-bold text-[#F5F7F6]">{r.user}</span>
                        <span className="text-[10px] text-[#20D995] bg-[#20D995]/15 px-2 py-0.5 rounded-full">
                          Verified Charge
                        </span>
                      </div>
                      <span className="text-[11px] text-[#A5B8AF]">{r.date}</span>
                    </div>
                    
                    <div className="flex items-center space-x-1 text-amber-400">
                      {[...Array(r.rating)].map((_, idx) => (
                        <Star key={idx} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>

                    <p className="text-xs text-[#A5B8AF] leading-relaxed">{r.comment}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column (4 cols): Sticky Booking Card */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
            
            <div className="bg-[#0D2921] border border-[#20D995] rounded-3xl p-6 shadow-mint-glow space-y-6">
              
              <div>
                <span className="text-xs text-[#A5B8AF] uppercase font-bold tracking-wider block">
                  Reserve This Charger
                </span>
                <div className="flex items-baseline space-x-1 mt-1">
                  <span className="text-3xl font-black text-[#20D995]">
                    {charger.pricing.currency}{charger.pricing.perKwh}
                  </span>
                  <span className="text-xs text-[#A5B8AF]">/ kWh</span>
                </div>
                <p className="text-xs text-[#20D995] mt-1 flex items-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Double-booking prevention active</span>
                </p>
              </div>

              {/* Quick Specs Overview */}
              <div className="space-y-2.5 text-xs text-[#A5B8AF] pt-4 border-t border-[#214438]">
                <div className="flex justify-between">
                  <span>Available Bays:</span>
                  <span className="font-bold text-[#F5F7F6]">{charger.availablePorts} of {charger.totalPorts} open</span>
                </div>
                <div className="flex justify-between">
                  <span>Max Peak Power:</span>
                  <span className="font-bold text-[#20D995]">{charger.connectors[0]?.power}</span>
                </div>
                <div className="flex justify-between">
                  <span>Operating Window:</span>
                  <span className="font-bold text-[#F5F7F6]">{charger.operatingHours}</span>
                </div>
              </div>

              {/* Big CTA to open the 6-step booking workflow */}
              <button
                type="button"
                onClick={() => setIsBookingModalOpen(true)}
                className="w-full py-4 rounded-2xl font-bold text-sm bg-[#20D995] text-[#061A15] hover:bg-[#1ab87e] shadow-mint-glow transition-all transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve Charging Slot</span>
              </button>

              <div className="text-center text-[11px] text-[#A5B8AF] space-y-1">
                <p>No charge until booking is finalized</p>
                <p className="text-[#20D995]">Free cancellation up to 10 min before arrival</p>
              </div>

            </div>

          </div>

        </div>

      </main>

      {/* Booking Flow Modal */}
      {isBookingModalOpen && (
        <BookingFlowModal
          charger={charger}
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
          onBookingSuccess={() => {
            setChargers(getStoredChargers());
          }}
        />
      )}

      <Footer />
    </div>
  );
}

