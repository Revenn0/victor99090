import React, { useState, useMemo } from 'react';
import { SearchBar } from './components/SearchBar';
import { CategoryFilter } from './components/CategoryFilter';
import { ListingCard } from './components/ListingCard';
import { MapView } from './components/MapView';
import { BottomNav } from './components/BottomNav';
import { SearchOverlay } from './components/SearchOverlay';
import { CATEGORIES, LISTINGS } from './constants';
import { Tab } from './types';
import { MapPin, List } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('explore');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showMap, setShowMap] = useState(false);
  
  // Search State
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchFilters, setSearchFilters] = useState({
    location: '',
    dates: 'Any week',
    guests: 0
  });

  // Filter listings based on category AND search input
  const filteredListings = useMemo(() => {
    let result = LISTINGS;

    // 1. Filter by Category
    if (selectedCategory !== 'all') {
      result = result.filter(l => l.categoryId === selectedCategory);
    }

    // 2. Filter by Search Location (Simple string matching)
    if (searchFilters.location) {
      const query = searchFilters.location.toLowerCase();
      result = result.filter(l => 
        l.location.toLowerCase().includes(query) || 
        l.title.toLowerCase().includes(query)
      );
    }

    return result;
  }, [selectedCategory, searchFilters]);

  // Determine if we should show total price based on date selection
  const isDateSelected = searchFilters.dates !== 'Any week';
  const nightCount = isDateSelected ? 5 : null; // Simulating 5 nights if a specific date/week is chosen

  return (
    <div className="min-h-screen bg-white pb-24 relative overflow-hidden sm:overflow-auto">
      {/* Search Overlay */}
      <SearchOverlay 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSearch={(filters) => {
          setSearchFilters(filters);
          // If searching, maybe switch to 'all' category to show more results unless user specifically picked one
          if (filters.location) setSelectedCategory('all');
        }}
        currentFilters={searchFilters}
      />

      {/* Main Content Area */}
      <main className="w-full max-w-md mx-auto bg-white min-h-screen relative shadow-2xl shadow-gray-200">
        
        {activeTab === 'explore' ? (
          <>
            {/* Header / Search */}
            <SearchBar 
              location={searchFilters.location}
              dates={searchFilters.dates}
              guests={searchFilters.guests}
              onSearchClick={() => setIsSearchOpen(true)} 
            />
            
            {/* Category Filter */}
            <CategoryFilter 
              categories={CATEGORIES} 
              selectedId={selectedCategory} 
              onSelect={setSelectedCategory} 
            />

            {/* Toggle Map/List Button (Sticky Overlay) */}
            <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 transform transition-transform hover:scale-105 active:scale-95">
              <button 
                onClick={() => setShowMap(!showMap)}
                className="bg-slate-900 text-white px-5 py-2.5 rounded-full shadow-lg flex items-center gap-2 font-medium text-sm transition-colors hover:bg-slate-800"
              >
                <p>{showMap ? 'List' : 'Map'}</p>
                {showMap ? <List size={16} /> : <MapPin size={16} />}
              </button>
            </div>

            {/* Content Area */}
            {showMap ? (
               <MapView listings={filteredListings} nightCount={nightCount} />
            ) : (
              <div className="px-5 pt-4 flex flex-col gap-8 pb-8">
                {filteredListings.length > 0 ? (
                  filteredListings.map((listing) => (
                    <ListingCard 
                      key={listing.id} 
                      listing={listing} 
                      nightCount={nightCount}
                    />
                  ))
                ) : (
                  <div className="py-20 text-center flex flex-col items-center">
                    <div className="bg-gray-100 p-4 rounded-full mb-4">
                       <MapPin className="text-slate-300" size={48} />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900">No matches found</h3>
                    <p className="text-slate-500 max-w-[200px] mt-2">Try changing your search destination or removing filters.</p>
                    <button 
                      onClick={() => setSearchFilters({ location: '', dates: 'Any week', guests: 0 })}
                      className="mt-6 text-rose-500 font-semibold text-sm hover:underline"
                    >
                      Clear all filters
                    </button>
                  </div>
                )}
                {/* Footer spacer */}
                <div className="h-4"></div>
              </div>
            )}
          </>
        ) : (
          <div className="flex items-center justify-center h-screen px-6 text-center">
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">Coming Soon</h2>
              <p className="text-slate-500">The {activeTab} view is under construction.</p>
            </div>
          </div>
        )}

      </main>

      {/* Fixed Bottom Navigation */}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      
    </div>
  );
}