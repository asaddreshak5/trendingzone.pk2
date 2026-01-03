
import { Product, StoreContact } from './types';

export const STORE_INFO: StoreContact = {
  owner: "Ali Asad",
  brandName: "TrendingZone.pk",
  whatsapp: "03366441941",
  instagram: "trendingzone.pk",
  facebook: "trendingzone.pk"
};

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Luxury Chronograph Watch',
    category: 'Accessories',
    price: 4500,
    image: 'https://picsum.photos/seed/watch1/600/600',
    description: 'Precision engineered timepiece for the modern man. Features stainless steel casing and water resistance.',
    trending: true
  },
  {
    id: '2',
    name: 'Premium Leather Wallet',
    category: 'Accessories',
    price: 1800,
    image: 'https://picsum.photos/seed/wallet/600/600',
    description: 'Genuine cowhide leather wallet with RFID protection and multiple card slots.',
    trending: true
  },
  {
    id: '3',
    name: 'Urban Streetwear Hoodie',
    category: 'Apparel',
    price: 3200,
    image: 'https://picsum.photos/seed/hoodie/600/600',
    description: 'Over-sized fit heavy cotton hoodie. Perfect for the winter season.',
    trending: true
  },
  {
    id: '4',
    name: 'Tech Pro Wireless Earbuds',
    category: 'Electronics',
    price: 2500,
    image: 'https://picsum.photos/seed/buds/600/600',
    description: 'High-fidelity audio with active noise cancellation and 24-hour battery life.',
    trending: false
  },
  {
    id: '5',
    name: 'Classic Aviator Sunglasses',
    category: 'Accessories',
    price: 1500,
    image: 'https://picsum.photos/seed/sun/600/600',
    description: 'UV400 protected polarized lenses with a lightweight titanium frame.',
    trending: false
  },
  {
    id: '6',
    name: 'Smart Fitness Tracker V2',
    category: 'Electronics',
    price: 5500,
    image: 'https://picsum.photos/seed/smart/600/600',
    description: 'Monitor your health 24/7 with heart rate tracking, sleep analysis, and GPS.',
    trending: true
  }
];
