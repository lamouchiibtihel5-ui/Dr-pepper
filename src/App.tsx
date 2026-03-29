import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, ShoppingCart, MapPin, Instagram, Twitter, Facebook, 
  ArrowRight, Sparkles, Zap, ShieldCheck, Star, 
  ChevronRight, ChevronLeft, Search, Mail, Phone
} from 'lucide-react';

// --- Types ---
interface Product {
  id: string;
  name: string;
  tagline: string;
  price: string;
  color: string;
  image: string;
  description: string;
}

// --- Mock Data ---
const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Original Rebel',
    tagline: 'The 23-Flavor Masterpiece',
    price: '$2.99',
    color: 'bg-cherry',
    image: 'https://picsum.photos/seed/rebel1/400/600',
    description: 'A complex, bold fusion of 23 secret flavors that defies explanation.'
  },
  {
    id: '2',
    name: 'Midnight Cherry',
    tagline: 'Darker. Bolder. Deeper.',
    price: '$3.49',
    color: 'bg-burgundy',
    image: 'https://picsum.photos/seed/rebel2/400/600',
    description: 'Intense black cherry notes with a smooth, mysterious finish.'
  },
  {
    id: '3',
    name: 'Golden Fizz',
    tagline: 'Limited Edition Luxury',
    price: '$4.99',
    color: 'bg-gold',
    image: 'https://picsum.photos/seed/rebel3/400/600',
    description: 'Infused with botanical extracts and a touch of gold-standard sparkle.'
  }
];

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'glass-dark py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="/" className="text-2xl font-black tracking-tighter text-cream flex items-center gap-2">
          <Zap className="text-gold fill-gold" />
          CHERRY REBEL
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {['Products', 'Flavors', 'About', 'Store Locator'].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-sm font-bold uppercase tracking-widest text-cream/80 hover:text-gold transition-colors">
              {item}
            </a>
          ))}
          <button className="bg-gold text-burgundy px-6 py-2 rounded-full font-bold text-xs uppercase tracking-widest hover:scale-105 transition-transform">
            Shop Now
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <button className="text-cream"><ShoppingCart size={20} /></button>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-cream">
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full glass-dark p-6 flex flex-col gap-4 md:hidden"
          >
            {['Products', 'Flavors', 'About', 'Store Locator'].map((item) => (
              <a key={item} href="#" className="text-xl font-black text-cream uppercase">{item}</a>
            ))}
            <button className="bg-gold text-burgundy w-full py-4 rounded-xl font-black uppercase">Shop Now</button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-burgundy">
      {/* Animated Fizz Background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i} 
            className="fizz-particle"
            style={{
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              animationDuration: `${Math.random() * 3 + 2}s`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block bg-gold/20 text-gold border border-gold/30 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-[0.3em] mb-6">
            The Revolution is Here
          </span>
          <h1 className="text-6xl md:text-9xl text-cream leading-[0.85] mb-8">
            TASTE THE <br />
            <span className="text-gold italic">REBELLION</span>
          </h1>
          <p className="text-cream/70 text-lg md:text-xl max-w-xl mx-auto mb-10 font-light">
            23 flavors. One mysterious fusion. Crafted for those who refuse to blend in.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto bg-cherry text-white px-10 py-5 rounded-full font-black uppercase tracking-widest hover:bg-cherry/80 transition-all flex items-center justify-center gap-2 group">
              Explore Flavors <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="w-full sm:w-auto border border-cream/30 text-cream px-10 py-5 rounded-full font-black uppercase tracking-widest hover:bg-cream hover:text-burgundy transition-all">
              Find Near You
            </button>
          </div>
        </motion.div>
      </div>

      {/* Floating Product Preview */}
      <motion.div 
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-10%] right-[-5%] opacity-20 md:opacity-40 pointer-events-none"
      >
        <img src="https://picsum.photos/seed/can/800/1200" alt="Can" className="w-[400px] md:w-[600px] rotate-12" />
      </motion.div>
    </section>
  );
};

const ProductShowcase = () => {
  return (
    <section id="products" className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-5xl md:text-7xl mb-4">THE LINEUP</h2>
            <p className="text-burgundy/60 text-lg">Pick your poison. Each can is a masterpiece of carbonated chaos.</p>
          </div>
          <button className="text-burgundy font-bold uppercase tracking-widest flex items-center gap-2 group">
            View All Products <ChevronRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRODUCTS.map((product) => (
            <motion.div 
              key={product.id}
              whileHover={{ y: -10 }}
              className="group relative bg-white rounded-[2rem] p-8 overflow-hidden shadow-xl shadow-burgundy/5"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 ${product.color} opacity-10 rounded-bl-full transition-all group-hover:scale-150`} />
              
              <div className="relative z-10">
                <div className="aspect-[3/4] mb-8 overflow-hidden rounded-2xl">
                  <motion.img 
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-3xl mb-1">{product.name}</h3>
                <p className="text-burgundy/50 font-bold text-sm uppercase mb-6">{product.tagline}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-black text-cherry">{product.price}</span>
                  <button className="bg-burgundy text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-cherry transition-colors">
                    <ShoppingCart size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const USPSection = () => {
  return (
    <section className="py-24 bg-burgundy text-cream overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative z-10 aspect-square rounded-full border-2 border-gold/20 flex items-center justify-center"
          >
            <div className="text-center">
              <span className="text-[12rem] font-black leading-none text-gold">23</span>
              <p className="text-2xl font-bold uppercase tracking-[0.5em] -mt-8">Flavors</p>
            </div>
          </motion.div>
          {/* Decorative circles */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-gold/10 rounded-full animate-pulse" />
        </div>

        <div>
          <h2 className="text-5xl md:text-7xl mb-8">WHY SO <br /> <span className="text-gold">COMPLEX?</span></h2>
          <div className="space-y-8">
            {[
              { icon: <Sparkles />, title: "Secret Fusion", text: "A proprietary blend of 23 distinct ingredients that creates a flavor profile unlike anything else on earth." },
              { icon: <Zap />, title: "High Voltage Fizz", text: "Carbonated at peak pressure for a crisp, sharp bite that wakes up your senses instantly." },
              { icon: <ShieldCheck />, title: "Premium Only", text: "No high-fructose corn syrup. Only pure cane sugar and natural extracts for a cleaner, bolder finish." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.2 }}
                className="flex gap-6"
              >
                <div className="text-gold shrink-0">{item.icon}</div>
                <div>
                  <h4 className="text-xl mb-2">{item.title}</h4>
                  <p className="text-cream/60 leading-relaxed">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const FlavorExplorer = () => {
  const [activeFlavor, setActiveFlavor] = useState(0);

  return (
    <section id="flavors" className="py-24 bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-5xl md:text-8xl text-center mb-16">CHOOSE YOUR <br /> <span className="text-cherry">VIBE</span></h2>
        
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="w-full md:w-1/2">
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeFlavor}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                className="space-y-6"
              >
                <h3 className="text-6xl text-burgundy">{PRODUCTS[activeFlavor].name}</h3>
                <p className="text-xl text-burgundy/70 leading-relaxed">
                  {PRODUCTS[activeFlavor].description}
                </p>
                <div className="flex gap-4">
                  <span className="bg-burgundy text-cream px-4 py-2 rounded-lg font-bold text-sm uppercase">Bold</span>
                  <span className="bg-cherry text-cream px-4 py-2 rounded-lg font-bold text-sm uppercase">Sweet</span>
                  <span className="bg-gold text-burgundy px-4 py-2 rounded-lg font-bold text-sm uppercase">Sparkling</span>
                </div>
                <button className="bg-cherry text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest hover:scale-105 transition-transform">
                  Order This Flavor
                </button>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="w-full md:w-1/2 relative flex justify-center">
            <div className="flex gap-4 overflow-x-auto pb-8 snap-x">
              {PRODUCTS.map((p, i) => (
                <button 
                  key={p.id}
                  onClick={() => setActiveFlavor(i)}
                  className={`shrink-0 w-64 aspect-[2/3] rounded-3xl overflow-hidden transition-all duration-500 snap-center ${activeFlavor === i ? 'scale-100 ring-4 ring-gold' : 'scale-90 opacity-50'}`}
                >
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const SocialProof = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl mb-4">JOIN THE REBELLION</h2>
          <p className="text-burgundy/50 text-xl">See how the world is tasting the difference.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[1,2,3,4].map(i => (
            <div key={i} className="aspect-square rounded-2xl overflow-hidden relative group">
              <img src={`https://picsum.photos/seed/social${i}/600/600`} alt="Social" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-burgundy/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Instagram className="text-white" size={32} />
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: "Alex R.", text: "I've never tasted anything like it. It's like a party in my mouth and everyone's invited.", role: "Gamer" },
            { name: "Sarah J.", text: "The Midnight Cherry is my absolute favorite. It's dark, mysterious, and so satisfying.", role: "Artist" },
            { name: "Mike D.", text: "Finally a soda that doesn't taste like pure syrup. The carbonation is perfect.", role: "Skater" }
          ].map((t, i) => (
            <div key={i} className="bg-cream p-8 rounded-3xl border border-burgundy/5">
              <div className="flex text-gold mb-4">
                {[...Array(5)].map((_, j) => <Star key={j} size={16} fill="currentColor" />)}
              </div>
              <p className="text-burgundy/80 italic mb-6">"{t.text}"</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-burgundy/10" />
                <div>
                  <p className="font-bold">{t.name}</p>
                  <p className="text-xs text-burgundy/40 uppercase font-bold tracking-widest">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTABanner = () => {
  return (
    <section className="py-24 bg-cherry relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
      </div>
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-5xl md:text-8xl text-white mb-8 leading-none">READY TO <br /> <span className="text-gold">REBEL?</span></h2>
        <p className="text-white/80 text-xl mb-12">Don't settle for ordinary. Your taste buds deserve a revolution.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-gold text-burgundy px-12 py-6 rounded-full font-black uppercase tracking-widest text-lg hover:scale-105 transition-transform shadow-2xl shadow-burgundy/20">
            Taste the Difference
          </button>
          <button className="bg-white text-burgundy px-12 py-6 rounded-full font-black uppercase tracking-widest text-lg hover:bg-cream transition-colors">
            Find a Store
          </button>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-burgundy text-cream pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-24">
          <div className="col-span-1 md:col-span-2">
            <a href="/" className="text-4xl font-black tracking-tighter mb-8 block">CHERRY REBEL</a>
            <p className="text-cream/50 max-w-sm mb-8 leading-relaxed">
              We don't just make soda. We craft experiences for the bold, the brave, and the rebellious. Join the movement.
            </p>
            <div className="flex gap-4">
              {[Instagram, Twitter, Facebook].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 rounded-full border border-cream/10 flex items-center justify-center hover:bg-gold hover:text-burgundy transition-all">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-gold uppercase tracking-widest font-bold mb-8">Quick Links</h4>
            <ul className="space-y-4 text-cream/60">
              <li><a href="#" className="hover:text-gold transition-colors">Our Story</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">All Flavors</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Store Locator</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Merch Shop</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-gold uppercase tracking-widest font-bold mb-8">Newsletter</h4>
            <p className="text-sm text-cream/50 mb-6">Get secret drops and limited edition alerts.</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Your Email" 
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 focus:outline-none focus:border-gold transition-colors"
              />
              <button className="absolute right-2 top-2 bottom-2 bg-gold text-burgundy px-4 rounded-lg font-bold">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-cream/30 uppercase tracking-widest font-bold">
          <p>© 2026 CHERRY REBEL BEVERAGE CO. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FlavorQuiz = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [result, setResult] = useState<Product | null>(null);

  const questions = [
    { q: "What's your ideal Friday night?", options: ["Gaming till dawn", "Underground club", "Rooftop lounge"] },
    { q: "Choose a color palette:", options: ["Neon & Chrome", "Deep Red & Gold", "Black & White"] },
    { q: "How do you like your fizz?", options: ["Sharp & Crisp", "Smooth & Subtle", "Extra Intense"] }
  ];

  const handleAnswer = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setResult(PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)]);
    }
  };

  const reset = () => {
    setStep(0);
    setResult(null);
    setIsOpen(false);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-40 bg-gold text-burgundy w-16 h-16 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform group"
      >
        <Sparkles className="group-hover:rotate-12 transition-transform" />
        <span className="absolute right-full mr-4 bg-burgundy text-cream px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          Flavor Quiz
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-burgundy/90 backdrop-blur-xl"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-cream w-full max-w-lg rounded-[3rem] p-12 relative overflow-hidden"
            >
              <button onClick={reset} className="absolute top-8 right-8 text-burgundy/30 hover:text-burgundy">
                <X size={32} />
              </button>

              {!result ? (
                <div className="text-center">
                  <span className="text-gold font-bold uppercase tracking-widest text-sm mb-4 block">Question {step + 1} of 3</span>
                  <h3 className="text-4xl mb-8">{questions[step].q}</h3>
                  <div className="space-y-4">
                    {questions[step].options.map((opt, i) => (
                      <button 
                        key={i}
                        onClick={handleAnswer}
                        className="w-full py-4 px-6 border-2 border-burgundy/10 rounded-2xl text-lg font-bold hover:bg-gold hover:border-gold transition-all"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <span className="text-gold font-bold uppercase tracking-widest text-sm mb-4 block">Your Match is...</span>
                  <h3 className="text-5xl mb-6">{result.name}</h3>
                  <div className="aspect-[3/4] w-48 mx-auto mb-8 rounded-2xl overflow-hidden shadow-2xl">
                    <img src={result.image} alt={result.name} className="w-full h-full object-cover" />
                  </div>
                  <p className="text-burgundy/60 mb-8">{result.description}</p>
                  <button onClick={reset} className="bg-cherry text-white px-10 py-4 rounded-xl font-black uppercase tracking-widest">
                    Shop This Flavor
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// --- Main App ---

export default function App() {
  return (
    <div className="min-h-screen selection:bg-gold selection:text-burgundy">
      <Navbar />
      <main>
        <Hero />
        <ProductShowcase />
        <USPSection />
        <FlavorExplorer />
        <SocialProof />
        <CTABanner />
      </main>
      <Footer />
      <FlavorQuiz />
      
      {/* Custom Cursor Bubbles (Optional/Subtle) */}
      <div className="fixed inset-0 pointer-events-none z-[9999]">
        <motion.div 
          className="w-4 h-4 rounded-full bg-gold/30 blur-sm"
          animate={{
            x: [0, 10, -10, 0],
            y: [0, -10, 10, 0],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
    </div>
  );
}
