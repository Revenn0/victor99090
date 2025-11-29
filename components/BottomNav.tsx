import React from 'react';
import { Tab } from '../types';
import { Search, Heart, Map, MessageSquare, UserCircle } from 'lucide-react';

interface BottomNavProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'explore', label: 'Explore', icon: Search },
    { id: 'wishlists', label: 'Wishlists', icon: Heart },
    { id: 'trips', label: 'Trips', icon: Map },
    { id: 'inbox', label: 'Inbox', icon: MessageSquare },
    { id: 'profile', label: 'Profile', icon: UserCircle },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe pt-2 z-50 px-6 h-[80px]">
      <div className="flex justify-between items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as Tab)}
              className="flex flex-col items-center gap-1 min-w-[48px] active:scale-95 transition-transform"
            >
              <Icon 
                size={24} 
                className={`transition-colors ${isActive ? 'stroke-rose-500' : 'stroke-slate-400'}`}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span className={`text-[10px] font-medium transition-colors ${isActive ? 'text-slate-900' : 'text-slate-500'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};