import React from 'react';
import { Category } from '../types';
import { 
  Umbrella, 
  Tent, 
  Flame, 
  Building2, 
  Wheat, 
  Gem, 
  LayoutGrid 
} from 'lucide-react';

interface CategoryFilterProps {
  categories: Category[];
  selectedId: string;
  onSelect: (id: string) => void;
}

const IconMap: Record<string, React.FC<any>> = {
  Umbrella,
  Tent,
  Flame,
  Building2,
  Wheat,
  Gem,
  LayoutGrid
};

export const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories, selectedId, onSelect }) => {
  return (
    <div className="w-full bg-white pt-2 pb-2 sticky top-[76px] z-40 shadow-sm">
      <div className="flex items-center overflow-x-auto no-scrollbar gap-6 px-5 snap-x">
        {categories.map((cat) => {
          const Icon = IconMap[cat.iconName] || LayoutGrid;
          const isSelected = selectedId === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onSelect(cat.id)}
              className={`snap-center flex flex-col items-center gap-2 min-w-[64px] pb-3 border-b-2 transition-all duration-200 cursor-pointer group ${
                isSelected 
                  ? 'border-slate-900 text-slate-900 opacity-100' 
                  : 'border-transparent text-slate-500 hover:text-slate-800 hover:opacity-100 opacity-70'
              }`}
            >
              <Icon 
                size={24} 
                strokeWidth={isSelected ? 2 : 1.5} 
                className={`transition-transform duration-200 ${isSelected ? 'scale-110' : 'group-hover:scale-110'}`}
              />
              <span className={`text-xs font-medium whitespace-nowrap ${isSelected ? 'font-semibold' : ''}`}>
                {cat.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};