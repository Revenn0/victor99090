import React, { useState } from 'react';
import { X, Search, Minus, Plus, MapPin, Calendar, Users } from 'lucide-react';

interface SearchFilters {
  location: string;
  dates: string;
  guests: number;
}

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (filters: SearchFilters) => void;
  currentFilters: SearchFilters;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({ 
  isOpen, 
  onClose, 
  onSearch,
  currentFilters 
}) => {
  const [step, setStep] = useState<'where' | 'when' | 'who'>('where');
  const [location, setLocation] = useState(currentFilters.location);
  const [dates, setDates] = useState(currentFilters.dates);
  const [guests, setGuests] = useState(currentFilters.guests);

  if (!isOpen) return null;

  const handleSearch = () => {
    onSearch({ location, dates, guests });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] bg-gray-50 flex flex-col animate-in slide-in-from-bottom-10 duration-300">
      {/* Header */}
      <div className="bg-white px-4 py-4 flex items-center justify-between border-b border-gray-100">
        <button 
          onClick={onClose}
          className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X size={20} className="text-slate-900" />
        </button>
        
        <div className="flex gap-4 text-sm font-medium">
          <button 
            onClick={() => setStep('where')}
            className={`${step === 'where' ? 'text-slate-900 border-b-2 border-slate-900' : 'text-slate-500'} pb-1 transition-colors`}
          >
            Stays
          </button>
          <button 
            className="text-slate-300 cursor-not-allowed pb-1"
          >
            Experiences
          </button>
        </div>
        
        <div className="w-9" /> {/* Spacer for centering */}
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
        
        {/* WHERE Section */}
        <div 
          className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 ${step === 'where' ? 'flex-1' : 'flex-none'}`}
        >
          {step !== 'where' ? (
            <button 
              onClick={() => setStep('where')}
              className="w-full p-4 flex justify-between items-center"
            >
              <span className="text-slate-500 text-sm font-medium">Where</span>
              <span className="text-slate-900 font-semibold text-sm">{location || 'I\'m flexible'}</span>
            </button>
          ) : (
            <div className="p-5 flex flex-col h-full">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Where to?</h2>
              
              <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Search destinations"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-4 pl-12 pr-4 text-slate-900 font-semibold placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  autoFocus
                />
              </div>

              <div className="flex-1 overflow-y-auto">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Suggested Regions</h3>
                <div className="flex gap-4 overflow-x-auto pb-4">
                  {['Jurerê', 'Canasvieiras', 'Lagoa', 'Centro'].map((loc) => (
                    <button
                      key={loc}
                      onClick={() => setLocation(loc)}
                      className={`flex-shrink-0 px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
                        location === loc 
                          ? 'bg-slate-900 text-white border-slate-900' 
                          : 'bg-white border-gray-200 text-slate-700 hover:border-slate-400'
                      }`}
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* WHEN Section */}
        <div 
          className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 ${step === 'when' ? 'flex-1' : 'flex-none'}`}
        >
          {step !== 'when' ? (
             <button 
             onClick={() => setStep('when')}
             className="w-full p-4 flex justify-between items-center"
           >
             <span className="text-slate-500 text-sm font-medium">When</span>
             <span className="text-slate-900 font-semibold text-sm">{dates}</span>
           </button>
          ) : (
            <div className="p-5">
               <h2 className="text-2xl font-bold text-slate-900 mb-6">When's your trip?</h2>
               <div className="flex flex-wrap gap-3">
                  {['Any week', 'Weekend', 'Next week', 'Next month'].map((d) => (
                    <button
                      key={d}
                      onClick={() => setDates(d)}
                      className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
                        dates === d 
                          ? 'bg-slate-900 text-white border-slate-900' 
                          : 'bg-white border-gray-200 text-slate-700 hover:border-slate-400'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
               </div>
               <div className="mt-8 p-4 bg-gray-50 rounded-xl flex items-center justify-center text-slate-400 text-sm">
                  <Calendar size={18} className="mr-2" />
                  Calendar selection coming soon
               </div>
            </div>
          )}
        </div>

        {/* WHO Section */}
        <div 
          className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 ${step === 'who' ? 'flex-1' : 'flex-none'}`}
        >
          {step !== 'who' ? (
             <button 
             onClick={() => setStep('who')}
             className="w-full p-4 flex justify-between items-center"
           >
             <span className="text-slate-500 text-sm font-medium">Who</span>
             <span className="text-slate-900 font-semibold text-sm">{guests > 0 ? `${guests} guests` : 'Add guests'}</span>
           </button>
          ) : (
            <div className="p-5">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Who's coming?</h2>
              
              <div className="flex items-center justify-between py-4 border-b border-gray-100">
                <div>
                  <div className="font-semibold text-slate-900">Adults</div>
                  <div className="text-slate-500 text-sm">Ages 13 or above</div>
                </div>
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setGuests(Math.max(0, guests - 1))}
                    disabled={guests === 0}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-slate-600 disabled:opacity-30 hover:border-slate-900 transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="font-semibold text-slate-900 w-4 text-center">{guests}</span>
                  <button 
                    onClick={() => setGuests(guests + 1)}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-slate-600 hover:border-slate-900 transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-100 p-4 pb-6 flex items-center justify-between">
        <button 
          onClick={() => {
             setLocation('');
             setDates('Any week');
             setGuests(0);
          }}
          className="text-slate-900 font-semibold underline text-sm decoration-2 underline-offset-4"
        >
          Clear all
        </button>

        <button 
          onClick={handleSearch}
          className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-3.5 rounded-xl font-semibold flex items-center gap-2 shadow-lg shadow-rose-200 transition-all active:scale-95"
        >
          <Search size={20} strokeWidth={2.5} />
          Search
        </button>
      </div>
    </div>
  );
};