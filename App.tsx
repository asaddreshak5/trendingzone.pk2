
import React, { useState, useMemo } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Instagram, 
  Facebook, 
  Phone, 
  Star, 
  Trash2, 
  Plus, 
  Minus,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Truck
} from 'lucide-react';
import { Product, CartItem } from './types';
import { PRODUCTS, STORE_INFO } from './constants';
import Assistant from './components/Assistant';

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const categories = useMemo(() => ['All', ...new Set(PRODUCTS.map(p => p.category))], []);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === 'All' || p.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, categoryFilter]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const cartTotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }, [cart]);

  const checkoutWhatsApp = () => {
    const text = `Assalam-o-Alaikum! I want to order from TrendingZone.pk:\n\n` + 
      cart.map(item => `- ${item.name} (x${item.quantity}) - PKR ${item.price * item.quantity}`).join('\n') +
      `\n\nTotal: PKR ${cartTotal}\n\nPlease confirm availability.`;
    window.open(`https://wa.me/${STORE_INFO.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <TrendingUp className="text-white" size={24} />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              TrendingZone<span className="text-indigo-600">.pk</span>
            </h1>
          </div>

          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search premium products..." 
                className="w-full bg-gray-100 border-none rounded-full py-2 pl-10 pr-4 focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-slate-700 hover:text-indigo-600 transition-colors"
            >
              <ShoppingBag size={24} />
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 bg-indigo-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-white">
                  {cart.reduce((a, b) => a + b.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden bg-slate-900">
          <img 
            src="https://picsum.photos/seed/store-bg/1920/1080" 
            className="absolute inset-0 w-full h-full object-cover opacity-40"
            alt="Hero background"
          />
          <div className="relative z-10 text-center px-4">
            <span className="inline-block px-3 py-1 bg-indigo-600 text-white text-xs font-bold rounded-full mb-4 animate-bounce">
              PREMIUM QUALITY BRANDS
            </span>
            <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
              Upgrade Your Style with<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                TrendingZone.pk
              </span>
            </h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-8">
              Curated by Ali Asad. Bringing you the most trending fashion and lifestyle gadgets in Pakistan at unbeatable prices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#shop" className="bg-white text-slate-900 px-8 py-3 rounded-full font-bold hover:bg-indigo-600 hover:text-white transition-all flex items-center justify-center gap-2">
                Shop Collection <ArrowRight size={18} />
              </a>
              <a href={`https://wa.me/${STORE_INFO.whatsapp}`} target="_blank" className="bg-green-500 text-white px-8 py-3 rounded-full font-bold hover:bg-green-600 transition-all flex items-center justify-center gap-2">
                <Phone size={18} /> Direct WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* Features Bar */}
        <section className="bg-indigo-50 border-y border-indigo-100 py-6">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4 justify-center">
              <div className="bg-white p-2 rounded-full shadow-sm">
                <Truck className="text-indigo-600" size={24} />
              </div>
              <div className="text-sm">
                <p className="font-bold">Fast Delivery</p>
                <p className="text-slate-500 text-xs">All across Pakistan</p>
              </div>
            </div>
            <div className="flex items-center gap-4 justify-center">
              <div className="bg-white p-2 rounded-full shadow-sm">
                <ShieldCheck className="text-indigo-600" size={24} />
              </div>
              <div className="text-sm">
                <p className="font-bold">Original Quality</p>
                <p className="text-slate-500 text-xs">100% genuine products</p>
              </div>
            </div>
            <div className="flex items-center gap-4 justify-center">
              <div className="bg-white p-2 rounded-full shadow-sm">
                <Star className="text-indigo-600" size={24} />
              </div>
              <div className="text-sm">
                <p className="font-bold">Top Trending</p>
                <p className="text-slate-500 text-xs">Updated weekly</p>
              </div>
            </div>
          </div>
        </section>

        {/* Product Listing */}
        <section id="shop" className="max-w-7xl mx-auto px-4 py-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
            <div>
              <h3 className="text-3xl font-bold text-slate-900 mb-2">Explore Collection</h3>
              <p className="text-slate-500">Find what moves you from our curated catalog</p>
            </div>
            
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                    categoryFilter === cat 
                      ? 'bg-indigo-600 text-white shadow-lg' 
                      : 'bg-white border border-gray-200 text-slate-600 hover:border-indigo-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map(product => (
              <div 
                key={product.id} 
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col border border-gray-100"
              >
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {product.trending && (
                    <span className="absolute top-4 left-4 bg-indigo-600 text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 uppercase tracking-wider">
                      <TrendingUp size={12} /> Trending
                    </span>
                  )}
                  <button 
                    onClick={() => addToCart(product)}
                    className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all text-indigo-600 hover:bg-indigo-600 hover:text-white"
                  >
                    <Plus size={20} />
                  </button>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">{product.category}</p>
                    <div className="flex items-center gap-1 text-yellow-400">
                      <Star size={14} fill="currentColor" />
                      <span className="text-xs font-bold text-slate-400">4.9</span>
                    </div>
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                    {product.name}
                  </h4>
                  <p className="text-slate-500 text-sm line-clamp-2 mb-4 flex-1">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <p className="text-xl font-extrabold text-slate-900">
                      PKR <span className="text-indigo-600">{product.price.toLocaleString()}</span>
                    </p>
                    <button 
                      onClick={() => addToCart(product)}
                      className="text-indigo-600 font-bold text-sm flex items-center gap-1 hover:underline"
                    >
                      Quick Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
              <Search size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-bold text-slate-900">No items found</h3>
              <p className="text-slate-500">Try adjusting your search or category filters.</p>
              <button 
                onClick={() => {setSearchQuery(''); setCategoryFilter('All');}}
                className="mt-6 text-indigo-600 font-bold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-indigo-600 p-2 rounded-lg">
                  <TrendingUp className="text-white" size={24} />
                </div>
                <h1 className="text-2xl font-bold tracking-tight">
                  TrendingZone<span className="text-indigo-400">.pk</span>
                </h1>
              </div>
              <p className="text-slate-400 max-w-sm mb-8">
                Pakistan's premium brands store bringing the latest tech, fashion, and accessories to your doorstep. Owned and managed by Ali Asad.
              </p>
              <div className="flex gap-4">
                <a href={`https://facebook.com/${STORE_INFO.facebook}`} target="_blank" className="bg-slate-800 p-3 rounded-full hover:bg-indigo-600 transition-all">
                  <Facebook size={20} />
                </a>
                <a href={`https://instagram.com/${STORE_INFO.instagram}`} target="_blank" className="bg-slate-800 p-3 rounded-full hover:bg-indigo-600 transition-all">
                  <Instagram size={20} />
                </a>
                <a href={`https://wa.me/${STORE_INFO.whatsapp}`} target="_blank" className="bg-slate-800 p-3 rounded-full hover:bg-indigo-600 transition-all">
                  <Phone size={20} />
                </a>
              </div>
            </div>
            
            <div>
              <h5 className="font-bold text-lg mb-6">Quick Links</h5>
              <ul className="space-y-4 text-slate-400">
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Home</a></li>
                <li><a href="#shop" className="hover:text-indigo-400 transition-colors">Shop All</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Latest Trends</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Customer Reviews</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-lg mb-6">Contact Us</h5>
              <ul className="space-y-4 text-slate-400">
                <li className="flex items-center gap-3">
                  <Phone size={16} className="text-indigo-400" />
                  <span>{STORE_INFO.whatsapp}</span>
                </li>
                <li className="text-xs uppercase tracking-widest text-slate-500 font-bold mt-4">Owned By</li>
                <li className="font-bold text-white text-lg">{STORE_INFO.owner}</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-10 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-slate-500">
            <p>© {new Date().getFullYear()} TrendingZone.pk. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-6 border-b flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag size={24} className="text-indigo-600" />
                <h2 className="text-xl font-bold text-slate-900">Your Cart</h2>
              </div>
              <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Trash2 size={20} className="text-gray-400" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="text-center py-20">
                  <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ShoppingBag size={32} className="text-gray-400" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Cart is empty</h3>
                  <p className="text-slate-500 mb-8">Start adding items to your shopping cart.</p>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="bg-indigo-600 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-indigo-200"
                  >
                    Go Shopping
                  </button>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <h4 className="font-bold text-slate-900 text-sm">{item.name}</h4>
                        <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <p className="text-xs text-slate-500 mb-3">{item.category}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center bg-gray-100 rounded-lg p-1">
                          <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:text-indigo-600">
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:text-indigo-600">
                            <Plus size={14} />
                          </button>
                        </div>
                        <p className="font-bold text-sm text-indigo-600">PKR {(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 bg-gray-50 border-t">
                <div className="flex justify-between mb-2">
                  <p className="text-slate-500">Subtotal</p>
                  <p className="font-bold text-slate-900">PKR {cartTotal.toLocaleString()}</p>
                </div>
                <div className="flex justify-between mb-6">
                  <p className="text-slate-500">Shipping</p>
                  <p className="text-green-600 font-bold">FREE</p>
                </div>
                <div className="flex justify-between mb-8">
                  <p className="text-lg font-bold text-slate-900">Total</p>
                  <p className="text-2xl font-extrabold text-indigo-600">PKR {cartTotal.toLocaleString()}</p>
                </div>
                <button 
                  onClick={checkoutWhatsApp}
                  className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-colors"
                >
                  Confirm Order via WhatsApp <ArrowRight size={20} />
                </button>
                <p className="text-center text-[10px] text-slate-400 mt-4 uppercase tracking-widest font-bold">
                  Fast delivery all over Pakistan
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* AI Assistant */}
      <Assistant />
    </div>
  );
};

export default App;
