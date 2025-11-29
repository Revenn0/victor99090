import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';

interface SearchBarProps {
  location?: string;
  dates?: string;
  guests?: number;
  onSearchClick: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  location = '', 
  dates = 'Any week', 
  guests = 0,
  onSearchClick 
}) => {
  const hasFilters = location || guests > 0 || dates !== 'Any week';

  return (
    <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-3 pb-4">
      <button 
        onClick={onSearchClick}
        className={`w-full flex items-center gap-3 bg-white border shadow-sm rounded-full p-2.5 pr-4 transition-all active:scale-[0.98] text-left ${hasFilters ? 'border-rose-500/30 ring-1 ring-rose-500/10' : 'border-gray-200'}`}
      >
        <div className="flex-shrink-0 bg-rose-500 text-white p-2 rounded-full shadow-sm">
          <Search size={20} strokeWidth={2.5} />
        </div>
        
        <div className="flex-1 flex flex-col justify-center min-w-0">
          <span className={`text-sm font-semibold truncate leading-tight ${location ? 'text-slate-900' : 'text-slate-900'}`}>
            {location || 'Where to?'}
          </span>
          <span className="text-xs text-slate-500 leading-tight truncate">
            {dates} • {guests > 0 ? `${guests} guests` : 'Add guests'}
          </span>
        </div>

        <div className="p-2 border border-gray-200 rounded-full text-slate-700 bg-transparent hover:bg-gray-50 transition-colors">
          <SlidersHorizontal size={16} />
        </div>
      </button>
    </div>
  );
};