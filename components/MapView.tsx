import React, { useState, useEffect, useRef } from 'react';
import { Listing } from '../types';
import { ListingCard } from './ListingCard';
import { X, Locate } from 'lucide-react';

// Declare Leaflet globally since we are loading it via CDN
declare global {
  interface Window {
    L: any;
  }
}

interface MapViewProps {
  listings: Listing[];
  nightCount?: number | null;
}

export const MapView: React.FC<MapViewProps> = ({ listings, nightCount = null }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const circleRef = useRef<any>(null);
  
  const [selectedListingId, setSelectedListingId] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Trigger state for circle animation
  const [pulseTrigger, setPulseTrigger] = useState(0);

  const selectedListing = listings.find(l => l.id === selectedListingId);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || !window.L || mapInstanceRef.current) return;

    // Center on the first listing or a default location
    const initialCenter = listings.length > 0 
      ? [listings[0].coordinates.lat, listings[0].coordinates.lng] 
      : [-27.442721, -48.486249];

    const map = window.L.map(mapContainerRef.current, {
      center: initialCenter,
      zoom: 15, // Zoomed in closer to show neighborhood
      zoomControl: false, 
      attributionControl: false,
    });

    // Add Tile Layer (CartoDB Voyager - Clean, modern)
    window.L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20
    }).addTo(map);

    // Add Search Radius Circle (Simulating the user's "Location I sent")
    const searchRadius = window.L.circle(initialCenter, {
        color: '#334155', // Slate-700 Border
        weight: 1.5,
        fillColor: '#64748b', // Slate-500 Fill
        fillOpacity: 0.1,
        radius: 800 // 800 meters radius
    }).addTo(map);
    
    circleRef.current = searchRadius;
    mapInstanceRef.current = map;

    // Handle map interaction to animate circle
    map.on('moveend', () => {
        setPulseTrigger(prev => prev + 1);
    });

    // Handle map click to deselect
    map.on('click', () => {
      setSelectedListingId(null);
      setIsExpanded(false);
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Markers when listings or selection changes
  useEffect(() => {
    if (!mapInstanceRef.current || !window.L) return;

    const map = mapInstanceRef.current;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    listings.forEach(listing => {
      const isSelected = listing.id === selectedListingId;
      const displayPrice = nightCount ? (listing.price * nightCount).toLocaleString() : listing.price;
      
      // Create Custom HTML Icon (Dark Blue Pill Style)
      const iconHtml = `
        <div class="relative transition-all duration-300 ${isSelected ? 'z-50 scale-110' : 'z-10 hover:z-40 hover:scale-105'}">
          <div class="
            px-3 py-1.5 rounded-full shadow-lg font-bold text-[13px] border-2 border-white
            flex items-center justify-center whitespace-nowrap
            ${isSelected 
              ? 'bg-rose-500 text-white transform scale-105' 
              : 'bg-[#1e293b] text-white'} 
          ">
            $${displayPrice}
          </div>
        </div>
      `;

      const customIcon = window.L.divIcon({
        className: 'custom-marker-container', 
        html: iconHtml,
        iconSize: [60, 34], 
        iconAnchor: [30, 17], 
      });

      const marker = window.L.marker([listing.coordinates.lat, listing.coordinates.lng], {
        icon: customIcon,
        zIndexOffset: isSelected ? 1000 : 0
      }).addTo(map);

      // Handle Marker Click
      marker.on('click', (e: any) => {
        window.L.DomEvent.stopPropagation(e);
        
        setSelectedListingId(listing.id);
        setIsExpanded(false); // CRITICAL: Reset to preview mode on new pin selection

        // Pan to marker with offset to accommodate the bottom preview card
        const targetLatLng = map.project([listing.coordinates.lat, listing.coordinates.lng], map.getZoom());
        targetLatLng.y += 100; // Shift map down slightly so pin is visible above the card
        const target = map.unproject(targetLatLng, map.getZoom());
        
        map.flyTo(target, map.getZoom(), {
          animate: true,
          duration: 0.5,
          easeLinearity: 0.25
        });
      });

      markersRef.current.push(marker);
    });

  }, [listings, selectedListingId, nightCount]);

  // Sync selection change to animation trigger
  useEffect(() => {
    setPulseTrigger(prev => prev + 1);
  }, [selectedListingId]);

  // Circle Animation Effect
  useEffect(() => {
    if (!circleRef.current) return;

    let start: number | null = null;
    let animationId: number;
    const duration = 600; // ms
    const baseRadius = 800;
    const targetRadius = 860;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;

      if (progress < duration) {
        // Sine wave for smooth pulse (0 -> 1 -> 0)
        const ease = Math.sin((progress / duration) * Math.PI);
        const currentRadius = baseRadius + (ease * (targetRadius - baseRadius));
        
        circleRef.current.setRadius(currentRadius);
        circleRef.current.setStyle({
             fillOpacity: 0.1 + (ease * 0.08),
             weight: 1.5 + (ease * 1)
        });

        animationId = requestAnimationFrame(animate);
      } else {
        // Reset to default
        circleRef.current.setRadius(baseRadius);
        circleRef.current.setStyle({
            fillOpacity: 0.1,
            weight: 1.5
       });
      }
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      // Ensure we reset state on unmount/re-trigger to avoid getting stuck in expanded state
      if (circleRef.current) {
        circleRef.current.setRadius(baseRadius);
        circleRef.current.setStyle({ fillOpacity: 0.1, weight: 1.5 });
      }
    };
  }, [pulseTrigger]);

  const handleClose = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedListingId(null);
    setIsExpanded(false);
  };

  const handleLocateMe = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        if (mapInstanceRef.current) {
          mapInstanceRef.current.flyTo([latitude, longitude], 15, {
            animate: true,
            duration: 1.5
          });
          
          // Optional: Add/Update a user location marker here if desired
        }
      }, (error) => {
        console.warn("Location access denied or error:", error);
      });
    } else {
      console.warn("Geolocation not supported");
    }
  };

  return (
    <div className="relative w-full h-[calc(100dvh-150px)] bg-slate-50 overflow-hidden border-t border-gray-100">
      
      {/* Map Container */}
      <div ref={mapContainerRef} className="w-full h-full z-0 outline-none" />

      {/* Locate Me Button */}
      <button
        onClick={handleLocateMe}
        className="absolute top-4 right-4 z-[400] bg-white p-3 rounded-full shadow-lg border border-gray-100 text-slate-700 hover:text-slate-900 active:scale-90 transition-transform focus:outline-none"
        aria-label="Locate me"
      >
        <Locate size={20} strokeWidth={2.5} />
      </button>

      {/* Selected Listing Popup */}
      {selectedListing && (
        <div className={`absolute bottom-6 left-5 right-5 z-[500] flex flex-col justify-end transition-all duration-500 ease-spring`}>
            <div 
              className={`bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] relative transition-all duration-300 ease-in-out overflow-hidden w-full ${isExpanded ? 'p-3' : 'p-2'}`}
            >
                {/* Close Button */}
                <button 
                    onClick={handleClose}
                    className="absolute top-2 right-2 z-20 bg-gray-100/80 p-1.5 rounded-full shadow-sm hover:bg-gray-200 backdrop-blur-sm"
                >
                    <X size={14} className="text-slate-900" />
                </button>

                {/* Listing Card */}
                <ListingCard 
                  listing={selectedListing} 
                  variant={isExpanded ? 'vertical' : 'horizontal'}
                  nightCount={nightCount}
                  onClick={() => {
                    if (!isExpanded) setIsExpanded(true);
                  }}
                  className="animate-in fade-in zoom-in-95 duration-200 w-full"
                />
            </div>
        </div>
      )}
      
      {/* Overlay to close on background click when expanded */}
      {selectedListing && isExpanded && (
          <div 
            className="absolute inset-0 z-[400] bg-black/20 backdrop-blur-[1px] transition-opacity duration-300" 
            onClick={() => handleClose()}
          ></div>
      )}
    </div>
  );
};