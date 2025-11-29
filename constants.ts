import { Category, Listing } from './types';

export const CATEGORIES: Category[] = [
  { id: 'all', label: 'All', iconName: 'LayoutGrid' },
  { id: 'beach', label: 'Beachfront', iconName: 'Umbrella' },
  { id: 'cabin', label: 'Cabins', iconName: 'Tent' },
  { id: 'trending', label: 'Trending', iconName: 'Flame' },
  { id: 'city', label: 'City Views', iconName: 'Building2' },
  { id: 'countryside', label: 'Countryside', iconName: 'Wheat' },
  { id: 'luxe', label: 'Luxe', iconName: 'Gem' },
];

// Centered around Jurerê Internacional, Florianópolis for demo purposes
// Center Point approx: -27.442, -48.486
export const LISTINGS: Listing[] = [
  {
    id: '1',
    title: 'Modern Beachfront Villa',
    location: 'Av. dos Búzios, Jurerê',
    price: 450,
    rating: 4.92,
    imageUrl: 'https://picsum.photos/800/600?random=1',
    distance: '0.2 km from center',
    dates: 'Oct 15 - 20',
    isGuestFavorite: true,
    categoryId: 'beach',
    coordinates: { lat: -27.442721, lng: -48.486249 }
  },
  {
    id: '2',
    title: 'Cozy Garden Cabin',
    location: 'Rua das Algas, Jurerê',
    price: 120,
    rating: 4.85,
    imageUrl: 'https://picsum.photos/800/600?random=2',
    distance: '0.5 km from center',
    dates: 'Nov 2 - 7',
    isSuperhost: true,
    categoryId: 'cabin',
    coordinates: { lat: -27.445000, lng: -48.482000 }
  },
  {
    id: '3',
    title: 'Minimalist Studio Loft',
    location: 'Av. dos Dourados, Jurerê',
    price: 85,
    rating: 4.76,
    imageUrl: 'https://picsum.photos/800/600?random=3',
    distance: '0.3 km from center',
    dates: 'Oct 22 - 25',
    categoryId: 'city',
    coordinates: { lat: -27.441000, lng: -48.489000 }
  },
  {
    id: '4',
    title: 'Luxury Glass House',
    location: 'Alameda César Nascimento',
    price: 890,
    rating: 4.98,
    imageUrl: 'https://picsum.photos/800/600?random=4',
    distance: '0.8 km from center',
    dates: 'Dec 10 - 15',
    isGuestFavorite: true,
    categoryId: 'luxe',
    coordinates: { lat: -27.439000, lng: -48.485000 }
  },
  {
    id: '5',
    title: 'Rustic Guest House',
    location: 'Rua do Marisco',
    price: 65,
    rating: 4.60,
    imageUrl: 'https://picsum.photos/800/600?random=5',
    distance: '1.2 km from center',
    dates: 'Jan 5 - 12',
    categoryId: 'countryside',
    coordinates: { lat: -27.448000, lng: -48.488000 }
  },
  {
    id: '6',
    title: 'Seaside Bungalow',
    location: 'Av. das Raias',
    price: 210,
    rating: 4.88,
    imageUrl: 'https://picsum.photos/800/600?random=6',
    distance: '0.6 km from center',
    dates: 'Nov 15 - 20',
    categoryId: 'beach',
    coordinates: { lat: -27.443000, lng: -48.480000 }
  },
  {
    id: '7',
    title: 'Urban Penthouse',
    location: 'Beco dos Namorados',
    price: 320,
    rating: 4.95,
    imageUrl: 'https://picsum.photos/800/600?random=7',
    distance: '0.9 km from center',
    dates: 'Oct 28 - 30',
    categoryId: 'city',
    coordinates: { lat: -27.446000, lng: -48.490000 }
  },
];