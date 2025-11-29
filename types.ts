export interface Category {
  id: string;
  label: string;
  iconName: string; 
}

export interface Listing {
  id: string;
  title: string;
  location: string;
  price: number;
  rating: number;
  imageUrl: string;
  distance: string;
  dates: string;
  isSuperhost?: boolean;
  isGuestFavorite?: boolean;
  categoryId: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export type Tab = 'explore' | 'wishlists' | 'trips' | 'inbox' | 'profile';