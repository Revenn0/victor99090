import React, { useState } from 'react';
import { Listing } from '../types';
import { Star, Heart, Maximize2 } from 'lucide-react';

interface ListingCardProps {
  listing: Listing;
  className?: string;
  variant?: 'vertical' | 'horizontal';
  onClick?: () => void;
  nightCount?: number | null;
}

export const ListingCard: React.FC<ListingCardProps> = ({ 
  listing, 
  className = '', 
  variant = 'vertical',
  onClick,
  nightCount = null
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const finalPrice = nightCount ? listing.price * nightCount : listing.price;
  const priceLabel = nightCount ? 'total' : 'night';

  // Horizontal variant (Compact Preview / Tooltip)
  if (variant === 'horizontal') {
    return (
      <div 
        onClick={onClick}
        className={`flex gap-3 items-center group cursor-pointer relative pr-8 ${className}`}
      >
        {/* Thumbnail Image */}
        <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200 shadow-sm">
          <img 
            src={listing.imageUrl} 
            alt={listing.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 min-w-0 justify-center gap-0.5">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-slate-900 truncate text-sm leading-tight">{listing.location}</h3>
            <div className="flex items-center gap-1 flex-shrink-0">
              <Star size={12} className="fill-slate-900 stroke-slate-900" />
              <span className="text-slate-900 text-xs font-medium">{listing.rating}</span>
            </div>
          </div>
          
          <p className="text-slate-500 text-xs truncate leading-tight">{listing.title}</p>
          
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="font-semibold text-slate-900 text-sm">${finalPrice.toLocaleString()}</span>
            <span className="text-slate-500 text-[10px]">{priceLabel}</span>
          </div>
        </div>

        {/* Expand Icon Indicator */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-300 group-hover:text-rose-500 transition-colors">
          <Maximize2 size={16} strokeWidth={2} />
        </div>
      </div>
    );
  }

  // Vertical variant (Default Full Card)
  return (
    <div 
      onClick={onClick}
      className={`flex flex-col gap-3 group cursor-pointer ${className}`}
    >
      {/* Image Container */}
      <div className="relative aspect-[20/19] overflow-hidden rounded-2xl bg-gray-200">
        <img 
          src={listing.imageUrl} 
          alt={listing.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Favorite Button */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
          className="absolute top-3 right-3 p-2 rounded-full hover:bg-white/10 active:scale-90 transition-all z-10"
        >
          <Heart 
            size={24} 
            className={`${isFavorite ? 'fill-rose-500 stroke-rose-500' : 'fill-black/50 stroke-white'}`} 
            strokeWidth={2}
          />
        </button>

        {/* Guest Favorite Badge */}
        {listing.isGuestFavorite && (
          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm z-10">
            <span className="text-xs font-bold text-slate-900">Guest favorite</span>
          </div>
        )}

        {/* Pagination Dots (Simulated) */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            <div className="w-1.5 h-1.5 bg-white rounded-full shadow-sm"></div>
            <div className="w-1.5 h-1.5 bg-white/60 rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-white/60 rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-white/60 rounded-full"></div>
        </div>
      </div>

      {/* Info Content */}
      <div className="flex flex-col gap-0.5 px-1">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-slate-900 truncate pr-2 text-[15px]">{listing.location}</h3>
          <div className="flex items-center gap-1">
            <Star size={14} className="fill-slate-900 stroke-slate-900" />
            <span className="text-slate-900 text-sm">{listing.rating}</span>
          </div>
        </div>
        
        <p className="text-slate-500 text-[15px] leading-snug">{listing.distance}</p>
        <p className="text-slate-500 text-[15px] leading-snug">{listing.dates}</p>
        
        <div className="mt-1.5 flex items-baseline gap-1">
          <span className="font-semibold text-slate-900 text-[15px]">${finalPrice.toLocaleString()}</span>
          <span className="text-slate-900 text-[15px]">
            {nightCount ? ` total (${nightCount} nights)` : ' night'}
          </span>
        </div>
      </div>
    </div>
  );
};