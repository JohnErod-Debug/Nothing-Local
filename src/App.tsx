import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Search, Menu, X, ArrowRight, Instagram, Twitter, ChevronRight, Play, Star, Clock, Check } from 'lucide-react';
import { PRODUCTS, Product } from './types.ts';

// --- Sub-components ---

const Navbar = ({ cartCount, onOpenCart }: { cartCount: number, onOpenCart: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${isScrolled ? 'bg-brand-black/90 backdrop-blur-xl border-white/10 py-5' : 'bg-transparent border-transparent py-8'}`}>
      <div className="max-w-[1440px] mx-auto px-8 flex justify-between items-center relative">
        <div className="flex items-center gap-12">
          <div className="hidden lg:flex gap-8 text-[10px] uppercase tracking-[0.3em] font-medium text-white/50">
            <a href="#shop" className="hover:text-white transition-colors">Collections</a>
            <a href="#story" className="hover:text-white transition-colors">Editorial</a>
            <a href="#archive" className="hover:text-white transition-colors">Archive</a>
          </div>
          <button onClick={() => setIsMenuOpen(true)} className="lg:hidden hover:opacity-70 transition-opacity">
            <Menu size={20} />
          </button>
        </div>

        <h1 className="text-xl md:text-2xl font-display font-bold tracking-[0.3em] uppercase absolute left-1/2 -translate-x-1/2">
          Nothing Local
        </h1>

        <div className="flex items-center gap-8 text-[10px] uppercase tracking-[0.3em] font-medium">
          <button className="hidden sm:block text-white/50 hover:text-white transition-colors">
            Search
          </button>
          <button onClick={onOpenCart} className="flex items-center gap-2 group">
            <span className="text-white/50 group-hover:text-white transition-colors">Bag</span>
            <span className="bg-white text-black px-1.5 py-0.5 rounded-full text-[8px] font-bold">
              {cartCount}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-brand-black z-[60] flex flex-col p-12"
          >
            <button onClick={() => setIsMenuOpen(false)} className="self-end mb-12 p-2 hover:bg-brand-gray rounded-full">
              <X size={32} />
            </button>
            <div className="flex flex-col gap-8">
              {['New Arrivals', 'Outerwear', 'Hoodies', 'T-Shirts', 'Accessory', 'Archive'].map((item, i) => (
                <motion.a
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-5xl font-display font-bold hover:italic hover:pl-4 transition-all duration-300"
                >
                  {item}
                </motion.a>
              ))}
            </div>
            <div className="mt-auto flex gap-6">
              <Instagram className="opacity-50 hover:opacity-100 cursor-pointer" />
              <Twitter className="opacity-50 hover:opacity-100 cursor-pointer" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const ProductCard = ({ product, onQuickAdd, onPreview }: { product: Product, onQuickAdd: (e: React.MouseEvent, p: Product) => void, onPreview: (p: Product) => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group cursor-pointer border border-brand-border p-4 hover:bg-white/5 transition-all duration-500 rounded-sm"
      onClick={() => onPreview(product)}
    >
      <div className="relative overflow-hidden aspect-[4/5] bg-brand-charcoal mb-6 rounded-sm">
        {product.isNew && (
          <span className="absolute top-4 left-4 z-10 bg-white text-black text-[9px] font-bold px-3 py-1 uppercase tracking-[0.2em] shadow-xl">
            New
          </span>
        )}
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-center items-center p-6">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => { e.stopPropagation(); onQuickAdd(e, product); }}
            className="px-8 py-3 bg-white text-black text-[10px] font-bold uppercase tracking-[0.3em] rounded-sm shadow-2xl"
          >
            Quick Add
          </motion.button>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <p className="text-[9px] uppercase text-white/40 tracking-[0.3em] font-bold">{product.category}</p>
          <p className="text-[11px] font-display font-light text-white/60">£{product.price}.00</p>
        </div>
        <h3 className="text-[12px] font-bold tracking-[0.1em] uppercase group-hover:text-brand-accent transition-colors">{product.name}</h3>
      </div>
    </motion.div>
  );
};

const ProductOverlay = ({ product, isOpen, onClose, onAddToCart }: { product: Product | null, isOpen: boolean, onClose: () => void, onAddToCart: (p: Product) => void }) => {
  if (!product) return null;
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
        >
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose} />
          <motion.div 
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="relative bg-brand-charcoal w-full max-w-6xl h-full md:h-auto md:max-h-[85vh] overflow-hidden flex flex-col md:flex-row rounded-md shadow-2xl border border-white/5"
          >
            <button onClick={onClose} className="absolute top-6 right-6 z-20 p-2 bg-black/20 hover:bg-black/40 rounded-full transition-colors">
              <X size={24} />
            </button>

            <div className="w-full md:w-1/2 h-[50vh] md:h-auto relative">
              <img src={product.image} className="w-full h-full object-cover" alt={product.name} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto hide-scrollbar flex flex-col">
              <span className="text-[11px] uppercase tracking-[0.3em] text-brand-accent mb-2">{product.category}</span>
              <h2 className="text-4xl md:text-5xl font-display font-bold leading-none mb-6">{product.name}</h2>
              <p className="text-2xl font-display font-light mb-8 italic">£{product.price}.00</p>
              
              <div className="space-y-8 flex-grow">
                <div>
                  <h4 className="text-[10px] uppercase font-bold tracking-widest mb-4">Description</h4>
                  <p className="text-brand-accent text-sm leading-relaxed font-light">{product.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-[10px] uppercase font-bold tracking-widest mb-4">Features</h4>
                    <ul className="text-[11px] space-y-2 opacity-70">
                      {product.features.map(f => <li key={f} className="flex items-center gap-2"><Check size={12} /> {f}</li>)}
                    </ul>
                  </div>
                  <div>
                   <h4 className="text-[10px] uppercase font-bold tracking-widest mb-4">Size Guide</h4>
                   <div className="flex flex-wrap gap-2">
                     {product.sizes.map(s => (
                       <button key={s} className="w-10 h-10 flex items-center justify-center border border-white/20 text-[10px] hover:bg-white hover:text-black transition-all rounded-sm">{s}</button>
                     ))}
                   </div>
                  </div>
                </div>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02, backgroundColor: '#FFFFFF' }}
                whileTap={{ scale: 0.98 }}
                onClick={() => { onAddToCart(product); onClose(); }}
                className="mt-12 w-full py-5 bg-brand-accent text-black font-bold uppercase tracking-[0.2em] text-xs transition-colors rounded-sm"
              >
                Add To Collection
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const CartDrawer = ({ isOpen, onClose, cart, setCart }: { 
  isOpen: boolean, 
  onClose: () => void, 
  cart: Product[], 
  setCart: React.Dispatch<React.SetStateAction<Product[]>> 
}) => {
  const total = cart.reduce((acc, curr) => acc + curr.price, 0);

  const removeItem = (id: string) => {
    const index = cart.findIndex(i => i.id === id);
    if (index > -1) {
      const newCart = [...cart];
      newCart.splice(index, 1);
      setCart(newCart);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-brand-black z-[110] shadow-2xl p-8 flex flex-col"
          >
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-xl font-display font-bold uppercase tracking-widest">Your Collection</h2>
              <button onClick={onClose} className="p-2 hover:bg-brand-gray transition-colors rounded-full"><X /></button>
            </div>

            <div className="flex-grow overflow-y-auto hide-scrollbar space-y-8">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                  <ShoppingBag size={48} strokeWidth={1} className="mb-4" />
                  <p className="text-sm uppercase tracking-widest">Empty Archive</p>
                </div>
              ) : (
                cart.map((item, i) => (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} key={`${item.id}-${i}`} className="flex gap-4">
                    <img src={item.image} className="w-24 h-32 object-cover rounded-sm" />
                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <h4 className="text-sm font-medium tracking-tight">{item.name}</h4>
                        <button onClick={() => removeItem(item.id)} className="opacity-40 hover:opacity-100"><X size={14}/></button>
                      </div>
                      <p className="text-[10px] uppercase text-brand-accent mb-2">{item.category}</p>
                      <p className="text-sm font-display font-light">£{item.price}</p>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            <div className="mt-8 pt-8 border-t border-white/10">
              <div className="flex justify-between items-end mb-6">
                <span className="text-[10px] uppercase font-bold tracking-[0.2em] opacity-50">Subtotal</span>
                <span className="text-2xl font-display font-bold">£{total}.00</span>
              </div>
              <button disabled={cart.length === 0} className="w-full py-5 bg-white text-black font-bold uppercase tracking-[0.2em] text-xs hover:bg-brand-accent transition-colors disabled:opacity-40 disabled:cursor-not-allowed rounded-sm">
                Checkout Now
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// --- Main Page Sections ---

const Hero = () => {
  return (
    <section className="relative min-h-screen w-full flex flex-col lg:flex-row pt-24 border-b border-brand-border">
      {/* Left: Editorial Column */}
      <div className="w-full lg:w-[45%] border-r border-brand-border flex flex-col p-8 md:p-16 lg:p-24 justify-between">
        <motion.div
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 1 }}
        >
          <span className="text-[10px] uppercase tracking-[0.4em] text-white/40 mb-6 block underline underline-offset-8 decoration-white/20">Drop 01 / Series A</span>
          <h2 className="text-7xl md:text-8xl xl:text-9xl font-display font-bold tracking-tighter leading-[0.85] mb-10 uppercase">
            ANTI<br/>AVERAGE<br/><span className="text-white/20 italic font-light italic-stroke">CULTURE</span>
          </h2>
          <p className="max-w-xs text-sm md:text-base leading-relaxed text-white/50 italic font-serif opacity-80">
            A global mindset curated for those who refuse to be defined by their coordinates. Premium heavyweight garments designed for the modern nomad.
          </p>
        </motion.div>

        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.5, duration: 1 }}
           className="mt-16 flex flex-wrap items-center gap-12"
        >
          <button className="px-12 py-5 bg-white text-black text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-[#EAEAEA] transition-all transform hover:-translate-y-1 rounded-sm">
            Shop Collection
          </button>
          <div className="flex flex-col">
            <span className="text-[9px] uppercase tracking-[0.3em] text-white/40 mb-1">Next Drop In</span>
            <span className="text-xl md:text-2xl font-mono tracking-tighter tabular-nums text-white/90 underline underline-offset-4 decoration-white/10">04:12:44:02</span>
          </div>
        </motion.div>
      </div>

      {/* Right: Product & Imagery Section */}
      <div className="w-full lg:w-[55%] flex flex-col">
        <div className="flex-grow relative bg-brand-secondary overflow-hidden group cursor-crosshair h-[60vh] lg:h-auto">
          <motion.video 
            autoPlay muted loop playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay scale-110"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-fashion-model-on-a-city-street-4334-large.mp4" type="video/mp4" />
          </motion.video>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="relative"
            >
              <div className="w-64 h-80 bg-white/5 backdrop-blur-sm rounded-[40px] border border-white/10 mb-8 flex items-center justify-center overflow-hidden">
                 <img src={PRODUCTS[0].image} className="w-full h-full object-cover opacity-80" />
              </div>
              <h3 className="text-xs uppercase tracking-[0.4em] font-bold mb-2">Heavyweight Box Hoodie</h3>
              <p className="text-[10px] text-white/40 uppercase tracking-[0.4em]">Onyx Black — £185.00</p>
            </motion.div>
          </div>

          <div className="absolute top-8 right-8 flex space-x-3">
            <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
            <div className="w-1.5 h-1.5 rounded-full border border-white/30"></div>
            <div className="w-1.5 h-1.5 rounded-full border border-white/30"></div>
          </div>
          
          <div className="absolute bottom-8 left-8 text-[9px] uppercase tracking-[0.3em] text-white/30 font-medium">
             [ Strictly limited to 150 pieces ]
          </div>
        </div>

        <div className="h-[35%] lg:h-64 grid grid-cols-2 border-t border-brand-border">
          <div className="border-r border-brand-border p-10 flex flex-col justify-between group hover:bg-white/5 transition-colors">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold group-hover:text-white transition-colors">New Arrival</div>
            <div>
              <h4 className="text-sm uppercase tracking-[0.3em] font-bold mb-2">Signature Cargo</h4>
              <p className="text-[9px] text-white/30 uppercase tracking-[0.2em] group-hover:text-white transition-colors">View Detail —&gt;</p>
            </div>
          </div>
          <div className="p-10 flex flex-col justify-between bg-white text-black group hover:bg-brand-white/90 transition-colors">
            <div className="text-[10px] uppercase tracking-[0.3em] font-black">Newsletter</div>
            <div className="w-full">
               <p className="text-xs font-bold mb-6 leading-tight uppercase tracking-tight">Access Drop 02 & Private Pricing.</p>
               <div className="border-b border-black/20 pb-2 flex justify-between items-center group/input overflow-hidden">
                 <span className="text-[10px] uppercase font-bold opacity-30 group-hover/input:opacity-100 transition-opacity">Submit Email</span>
                 <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const BrandMarquee = () => {
  return (
    <div className="bg-brand-white flex items-center overflow-hidden h-14 border-y border-white/10 text-black">
      <div className="flex animate-marquee whitespace-nowrap text-[10px] uppercase tracking-[0.4em] font-black italic">
        {[1, 2, 3, 4, 5].map(i => (
          <React.Fragment key={i}>
            <span className="mx-12">Nothing Local Clothing &reg;</span>
            <span className="mx-12">Global Mindset &bull; Anti-Average</span>
            <span className="mx-12">Autumn Winter 2024 Collection</span>
            <span className="mx-12">Worldwide Shipping Available</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState({ h: 23, m: 59, s: 59 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.s > 0) return { ...prev, s: prev.s - 1 };
        if (prev.m > 0) return { ...prev, m: prev.m - 1, s: 59 };
        if (prev.h > 0) return { h: prev.h - 1, m: 59, s: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex gap-4">
      {Object.entries(timeLeft).map(([key, val]) => (
        <div key={key} className="text-center">
          <div className="text-2xl md:text-4xl font-display font-bold tabular-nums">{val < 10 ? `0${val}` : val}</div>
          <div className="text-[8px] uppercase tracking-widest opacity-40">{key === 'h' ? 'Hours' : key === 'm' ? 'Mins' : 'Secs'}</div>
        </div>
      ))}
    </div>
  );
};

const LimitedDrop = () => {
  return (
    <section className="py-32 border-y border-brand-border bg-brand-charcoal relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -30 }} 
          whileInView={{ opacity: 1, x: 0 }} 
          viewport={{ once: true }}
          className="order-2 md:order-1"
        >
          <span className="text-white/40 text-[10px] font-bold uppercase tracking-[0.5em] mb-6 block flex items-center gap-3">
            <Clock size={12} /> Rare Collective Drop / Series 09
          </span>
          <h2 className="text-6xl lg:text-8xl font-display font-extrabold uppercase leading-[0.9] tracking-tighter mb-8">
            HEAVY WEIGHT<br />
            ESSENTIALS <span className="italic font-light text-white/20 italic-stroke">2.0</span>
          </h2>
          <p className="text-white/50 text-sm md:text-base font-serif italic max-w-md leading-relaxed mb-12">
            The next evolution in premium streetwear. Constructed with double-layered 500GSM Portuguese cotton. Strictly limited to 150 pieces worldwide.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-12">
            <Timer />
            <button className="px-12 py-5 bg-white text-black font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-brand-white/80 transition-all rounded-sm flex items-center gap-4 group">
              Early Access <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
        
        <div className="order-1 md:order-2 border border-brand-border p-4 bg-brand-black/40 rounded-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            viewport={{ once: true }}
            className="aspect-[4/5] bg-brand-black overflow-hidden relative group rounded-sm"
          >
            <img 
              src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1287&auto=format&fit=crop" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-70 grayscale hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black/60 to-transparent" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const StorySection = () => {
  return (
    <section id="story" className="py-32 bg-brand-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
          <motion.div 
             initial={{ opacity: 0, y: 50 }} 
             whileInView={{ opacity: 1, y: 0 }} 
             viewport={{ once: true }}
             className="relative"
          >
            <div className="absolute -top-12 -left-12 text-[15rem] font-display font-bold text-white/[0.03] select-none pointer-events-none">NO</div>
            <h3 className="text-4xl md:text-6xl font-display font-bold uppercase leading-tight mb-12">
              YOUR POTENTIAL IS <br /><span className="italic text-brand-accent font-light italic-stroke tracking-tight">NOT LOCAL.</span>
            </h3>
            <div className="space-y-6 text-brand-accent/70 font-light leading-relaxed max-w-lg text-sm md:text-base">
              <p>Nothing Local is not just a brand; it’s a rejection of the average. It’s a statement that your ambition, your style, and your impact should never be confined to where you started.</p>
              <p>We craft premium streetwear designed for the global citizen. Every piece is built with intention, combining high-fashion silhouettes with the grit of street culture.</p>
              <p>Est. 2024. Designed for those who see no borders.</p>
            </div>
            <div className="mt-12 flex gap-8 items-center border-t border-white/10 pt-8">
               <div className="flex -space-x-4">
                 {[1,2,3].map(i => <div key={i} className="w-12 h-12 rounded-full border-2 border-brand-black bg-brand-charcoal flex items-center justify-center text-[10px] font-bold overflow-hidden"><img src={`https://i.pravatar.cc/150?u=${i}`} /></div>)}
                 <div className="w-12 h-12 rounded-full border-2 border-brand-black bg-white text-black flex items-center justify-center text-[10px] font-bold">+2k</div>
               </div>
               <p className="text-[10px] uppercase font-bold tracking-[0.2em]">Joined the Collective</p>
            </div>
          </motion.div>
          <div className="grid grid-cols-2 gap-4">
            <motion.img initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }} src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1480&auto=format&fit=crop" className="w-full h-full object-cover rounded-sm aspect-[3/4] grayscale hover:grayscale-0 transition-all duration-700" />
            <motion.img initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }} src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1287&auto=format&fit=crop" className="w-full h-full object-cover rounded-sm aspect-[3/4] translate-y-12 grayscale hover:grayscale-0 transition-all duration-700" />
          </div>
        </div>
      </div>
    </section>
  );
};

const SocialProof = () => {
    const reviews = [
        { name: "JORDAN H.", role: "Creative Director", text: "Quality is unmatched. The 480GSM hoodie feels like a weighted fabric masterpiece. Essential." },
        { name: "MARIA S.", role: "Fashion Editor", text: "Minimalism done with actual grit. The silhouette is progressive yet timeless." },
        { name: "KAI T.", role: "Global Nomad", text: "The anti-average mindset resonate. Piece arrived in Tokyo in 3 days. Perfection." }
    ];

    return (
        <section className="py-32 border-t border-brand-border">
            <div className="max-w-[1440px] mx-auto px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-10">
                    <h2 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tighter leading-[0.9]">OUR COLLECTIVE <br/><span className="text-white/20 italic italic-stroke">VOICE.</span></h2>
                    <div className="flex flex-col items-end gap-2">
                        <div className="flex text-white space-x-1"><Star size={12} fill="white" /><Star size={12} fill="white" /><Star size={12} fill="white" /><Star size={12} fill="white" /><Star size={12} fill="white" /></div>
                        <p className="text-[9px] uppercase tracking-[0.4em] font-bold opacity-40">Verified Industry Standard</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3">
                    {reviews.map((r, i) => (
                        <motion.div 
                            key={i} 
                            initial={{ opacity: 0 }} 
                            whileInView={{ opacity: 1 }} 
                            viewport={{ once: true }} 
                            transition={{ delay: i * 0.2 }}
                            className={`p-12 border-brand-border flex flex-col justify-between hover:bg-white/5 transition-colors group ${i !== 2 ? 'md:border-r' : ''} border-b md:border-b-0`}
                        >
                            <p className="text-sm md:text-base font-serif italic text-white/60 group-hover:text-white transition-colors leading-relaxed mb-12">"{r.text}"</p>
                            <div>
                                <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-1">{r.name}</h4>
                                <p className="text-[9px] uppercase text-white/30 tracking-[0.2em]">{r.role}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const Footer = () => {
  return (
    <footer className="pt-32 pb-16 bg-brand-black border-t border-brand-border">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-32">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-4xl font-display font-bold uppercase tracking-[0.2em] mb-8">NOTHING LOCAL&reg;</h2>
            <p className="text-white/40 text-sm max-w-sm mb-12 font-serif italic leading-relaxed">
              Curating premium essentials for the globally ambitious. Our objects are designed to destroy boundaries and redefine coordinates.
            </p>
            <div className="flex gap-10">
              {['INSTA', 'TT', 'X', 'YT'].map(s => (
                <a key={s} href="#" className="text-[10px] font-bold uppercase tracking-[0.3em] hover:text-white transition-opacity opacity-40">{s}</a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] mb-10 text-white/30">Archive Objects</h4>
            <div className="flex flex-col gap-5 text-[11px] font-bold tracking-[0.1em] uppercase overflow-hidden">
              <a href="#" className="hover:pl-2 transition-all duration-300">New Arrivals</a>
              <a href="#" className="hover:pl-2 transition-all duration-300">Objects</a>
              <a href="#" className="hover:pl-2 transition-all duration-300">Editorial</a>
              <a href="#" className="hover:pl-2 transition-all duration-300">Stores</a>
            </div>
          </div>
          <div>
             <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] mb-10 text-white/30">Client Service</h4>
             <div className="flex flex-col gap-5 text-[11px] font-bold tracking-[0.1em] uppercase overflow-hidden">
               <a href="#" className="hover:pl-2 transition-all duration-300">Inquiry</a>
               <a href="#" className="hover:pl-2 transition-all duration-300">Shipping</a>
               <a href="#" className="hover:pl-2 transition-all duration-300">Returns</a>
               <a href="#" className="hover:pl-2 transition-all duration-300">Legal</a>
             </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-10 pt-16 border-t border-brand-border text-[9px] uppercase font-bold tracking-[0.5em] text-white/20">
          <p>© 2026 NOTHING LOCAL CLOTHING. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-6">
             <span>Terms</span>
             <span>Privacy</span>
             <span className="text-white/40">Est. 2024</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

const NewsletterPopup = () => {
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 5000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div 
                    initial={{ opacity: 0, y: 100 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, y: 100 }}
                    transition={{ type: 'spring', damping: 25 }}
                    className="fixed bottom-8 right-8 z-[110] w-[calc(100%-4rem)] sm:w-[420px] bg-white text-black p-12 rounded-sm shadow-2xl border border-black/10"
                >
                    <button onClick={() => setIsVisible(false)} className="absolute top-6 right-6 hover:rotate-90 transition-transform duration-300"><X size={20}/></button>
                    <div className="relative">
                        <span className="text-[10px] font-bold uppercase tracking-[0.5em] mb-6 block text-black/30 underline decoration-black/10 underline-offset-4">Identity Verification</span>
                        <h3 className="text-4xl font-display font-extrabold uppercase leading-[0.9] mb-6 tracking-tighter">ACCESS DROP 02 <br/><span className="italic font-light opacity-30 italic-stroke">EARLY</span></h3>
                        <p className="text-[11px] leading-relaxed mb-10 opacity-60 uppercase tracking-widest font-bold">Join the Archive for exclusive early access and member-only pricing. Strictly enforced.</p>
                        <div className="space-y-6">
                            <input type="email" placeholder="EMAIL ADDRESS" className="w-full bg-transparent border-b border-black/20 py-4 text-xs font-bold uppercase tracking-widest outline-none focus:border-black transition-colors" />
                            <button className="w-full py-5 bg-black text-white text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-brand-gray transition-colors rounded-sm shadow-xl">Join Archive —&gt;</button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

// --- Main App Component ---

export default function App() {
  const [cart, setCart] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const addToCart = (e: React.MouseEvent | null, product: Product) => {
    if (e) e.stopPropagation();
    setCart(prev => [...prev, product]);
    setIsCartOpen(true);
  };

  return (
    <div className="relative min-h-screen">
      <Navbar cartCount={cart.length} onOpenCart={() => setIsCartOpen(true)} />
      
      <main>
        <Hero />
        <BrandMarquee />
        
        <section id="shop" className="py-24 max-w-[1440px] mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-10">
            <h2 className="text-5xl md:text-8xl font-display font-extrabold uppercase leading-[0.8] tracking-tighter">THE NEW<br /><span className="text-white/20 italic italic-stroke tracking-tight">OBJECTS</span></h2>
            <div className="flex gap-4">
               {['All', 'Outerwear', 'Hoodies', 'Tees'].map((cat, i) => (
                 <button key={cat} className={`text-[10px] font-bold uppercase tracking-[0.3em] px-8 py-3 rounded-sm border border-brand-border hover:border-white transition-all ${i===0 ? 'bg-white text-black' : 'text-white/40'}`}>{cat}</button>
               ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border-l border-t border-brand-border">
            {PRODUCTS.map((product) => (
              <div key={product.id} className="border-r border-b border-brand-border h-full">
                <ProductCard 
                  product={product} 
                  onQuickAdd={addToCart} 
                  onPreview={setSelectedProduct}
                />
              </div>
            ))}
          </div>
          <div className="mt-20">
             <button className="text-[10px] font-bold uppercase tracking-[0.4em] hover:text-white transition-all group flex items-center justify-center mx-auto gap-4 text-white/30">
                View Entire Collection [42] <ChevronRight size={14} className="group-hover:translate-x-2 transition-transform" />
             </button>
          </div>
        </section>

        <LimitedDrop />
        <StorySection />
        <SocialProof />

        <section className="py-32 bg-brand-black text-center px-8 border-t border-brand-border">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                <h2 className="text-6xl md:text-9xl font-display font-black uppercase mb-12 leading-[0.8] tracking-tighter">STAY <br /> <span className="text-white/10 italic-stroke">CONNECTED.</span></h2>
                <div className="max-w-xl mx-auto">
                    <p className="text-white/30 text-xs mb-12 font-bold tracking-[0.4em] uppercase">Join the Inner Archive for secret collection drops.</p>
                    <div className="flex flex-col sm:flex-row gap-6">
                        <input type="email" placeholder="EMAIL ADDRESS ARCHIVE" className="flex-grow bg-white/5 border border-brand-border px-8 py-5 text-[10px] font-bold tracking-[0.3em] uppercase outline-none focus:border-white transition-colors rounded-sm" />
                        <button className="px-12 py-5 bg-white text-black font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-brand-white/80 transition-all rounded-sm whitespace-nowrap">Join Collective</button>
                    </div>
                </div>
            </motion.div>
        </section>
      </main>

      <Footer />

      <ProductOverlay 
        product={selectedProduct} 
        isOpen={!!selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
        onAddToCart={(p) => addToCart(null, p)}
      />
      
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart} 
        setCart={setCart}
      />

      <NewsletterPopup />
    </div>
  );
}
