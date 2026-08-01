import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, CheckCircle2, ArrowRight, Mail, MessageCircle, 
  BarChart2, Code2, Sparkles, Zap, Monitor, Shield, 
  Search, Award, Cpu, LineChart, Check, ArrowUpRight, PhoneCall, Menu, X,
  Share2, MapPin, Star, Play, ArrowLeft, Send, Users, Image as ImageIcon,
  BookOpen, HelpCircle, Phone, Sun, Moon
} from 'lucide-react';
import portfolioData from './data/portfolioData.json';

// Local Instagram Icon to prevent package resolution errors
const Instagram = ({ size = 16, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

// Local Facebook Icon to prevent package resolution errors
const Facebook = ({ size = 16, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

// Local Clock Icon to prevent package resolution errors
const Clock = ({ size = 16, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const springTransition = { type: "spring", stiffness: 85, damping: 16 };

const fadeUp = {
  hidden: { opacity: 0, y: 35, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: springTransition }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05
    }
  }
};

// Premium Floating Particle Background Component with Gold and Emerald/Cyan Glow
const ParticleBackground = () => {
  const particles = Array.from({ length: 30 });
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {particles.map((_, i) => {
        const size = Math.random() * 4 + 2.5; // glowing dots
        const leftPosition = Math.random() * 100;
        const delay = Math.random() * 8;
        const duration = Math.random() * 15 + 13;
        
        // 3 floating colors: Emerald, Gold, Cyan
        const randVal = Math.random();
        let colorClass = 'bg-emerald-400/30 shadow-[0_0_10px_rgba(52,211,153,0.4)]';
        if (randVal > 0.66) {
          colorClass = 'bg-yellow-400/30 shadow-[0_0_10px_rgba(234,179,8,0.4)]';
        } else if (randVal > 0.33) {
          colorClass = 'bg-cyan-400/30 shadow-[0_0_10px_rgba(34,211,238,0.4)]';
        }
        
        return (
          <motion.div
            key={i}
            className={`absolute rounded-full ${colorClass}`}
            style={{
              width: size,
              height: size,
              left: `${leftPosition}%`,
              bottom: `-20px`,
            }}
            animate={{
              y: ['0vh', '-110vh'],
              opacity: [0, 0.65, 0.65, 0],
              x: [0, Math.random() * 60 - 30, Math.random() * 60 - 30],
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: delay,
            }}
          />
        );
      })}
    </div>
  );
};

function App() {
  const { hero, about, services, showcase, instagramVideos, testimonials, contact } = portfolioData;
  
  // Custom theme state
  const [isLight, setIsLight] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'light';
    }
    return false;
  });

  useEffect(() => {
    if (isLight) {
      document.body.classList.add('light');
      localStorage.setItem('theme', 'light');
    } else {
      document.body.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    }
  }, [isLight]);

  // Custom Reviews Carousel states
  const [reviewIndex, setReviewIndex] = useState(0);
  
  // Lightbox modal states (for the Showcase Gallery)
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Instagram Video viewer modal states
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Copy to clipboard Toast state
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Contact Form states
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Auto-scroll testimonials carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setReviewIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setToastMessage('Link copied to clipboard!');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (!formName || !formPhone) {
      setToastMessage('Please enter your name and phone number!');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2500);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${contact.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: "New Lead from ChandraBud Marketing Card",
          Name: formName,
          Phone: formPhone,
          Message: formMessage
        })
      });

      const data = await response.json();
      
      if (response.ok && data.success === 'true') {
        setSubmitSuccess(true);
        setFormName('');
        setFormPhone('');
        setFormMessage('');
      } else {
        throw new Error(data.message || 'Submission failed');
      }
    } catch (err) {
      console.error(err);
      setToastMessage('Failed to send message. Please try again!');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const navigateLightbox = (direction) => {
    let newIndex = selectedImageIndex + direction;
    if (newIndex < 0) newIndex = showcase.length - 1;
    if (newIndex >= showcase.length) newIndex = 0;
    setSelectedImageIndex(newIndex);
    setSelectedImage(showcase[newIndex]);
  };

  return (
    <div className={`min-h-screen ${isLight ? 'light' : ''} bg-[#030303] text-[#ededed] overflow-x-hidden font-sans relative selection:bg-yellow-500/30 selection:text-white`}>
      
      {/* Background Glows & Floating Particles */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-15%] w-[45vw] h-[45vw] rounded-full bg-emerald-500/5 blur-[160px] animate-pulse-glow" />
        <div className="absolute bottom-[-10%] right-[-15%] w-[45vw] h-[45vw] rounded-full bg-yellow-500/5 blur-[160px] animate-pulse-glow" style={{ animationDelay: '4s' }} />
      </div>
      <ParticleBackground />

      {/* Main Container: Mobile Visicard Frame Centered on Desktop */}
      <div className="relative z-10 max-w-2xl mx-auto px-0 sm:px-4 py-0 sm:py-8 min-h-screen flex flex-col justify-between">
        
        {/* Floating Custom Toast */}
        <AnimatePresence>
          {showToast && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full bg-yellow-500 text-black text-xs font-black shadow-xl flex items-center gap-2 border border-yellow-400/35"
            >
              <Sparkles size={14} className="animate-spin" />
              <span>{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Outer glass capsule card */}
        <div className="w-full bg-[#070707]/90 sm:border sm:border-white/10 sm:rounded-[2.5rem] shadow-[0_0_80px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col pb-24 glass-capsule">
          
          {/* Section 1: Hero Header Branding */}
          <header id="home" className="relative p-6 sm:p-8 flex flex-col items-center text-center">
            {/* Top Studio Label */}
            <div className="w-full flex justify-between items-center mb-6">
              <div className="cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <img 
                  src="/chandrabud-logo-removebg.png" 
                  alt="ChandraBud Logo" 
                  className="h-9 object-contain drop-shadow-[0_0_8px_rgba(234,179,8,0.2)]" 
                />
              </div>
              
              <div className="flex items-center gap-2">
                <div className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[9px] font-semibold uppercase tracking-widest text-zinc-400 flex items-center gap-1.5 badge-studio">
                  <Sparkles size={9} className="text-yellow-400 animate-pulse" />
                  <span>Visibility Agency</span>
                </div>

                {/* Theme Toggle Button */}
                <button
                  onClick={() => setIsLight(!isLight)}
                  className="p-2 rounded-full bg-white/[0.04] border border-white/10 text-zinc-400 hover:text-yellow-400 transition-all badge-studio flex items-center justify-center cursor-pointer"
                  title={isLight ? "Switch to Dark Mode" : "Switch to Light Mode"}
                >
                  {isLight ? (
                    <Moon size={11} className="text-zinc-600" />
                  ) : (
                    <Sun size={11} className="text-yellow-400 animate-pulse" />
                  )}
                </button>
              </div>
            </div>

            {/* Rotating Synergy Graphics */}
            <div className="relative w-full max-w-[280px] aspect-square rounded-3xl border border-white/5 bg-gradient-to-b from-white/[0.01] to-transparent p-6 flex items-center justify-center overflow-hidden mb-6 sm:mb-8 mx-auto shadow-inner synergy-container">
              <div className="absolute inset-0 bg-radial-gradient from-white/[0.02] to-transparent pointer-events-none" />
              
              <div className="absolute w-20 h-20 rounded-full bg-gradient-to-tr from-yellow-500/20 via-teal-500/10 to-emerald-500/20 blur-xl animate-pulse-glow" />
              
              {/* Spinning Orbit 1: Marketing */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                className="absolute w-40 h-40 rounded-full border border-yellow-500/10 border-dashed flex items-center justify-center"
              >
                <div className="absolute -top-2 w-6 h-6 rounded-lg bg-yellow-950 border border-yellow-500/30 flex items-center justify-center text-yellow-400 shadow-[0_0_12px_rgba(234,179,8,0.3)] synergy-orbit-yellow">
                  <LineChart size={11} />
                </div>
                <div className="absolute -bottom-2 w-6 h-6 rounded-lg bg-yellow-950 border border-yellow-500/30 flex items-center justify-center text-yellow-400 shadow-[0_0_12px_rgba(234,179,8,0.3)] synergy-orbit-yellow">
                  <Search size={11} />
                </div>
              </motion.div>

              {/* Spinning Orbit 2: Development */}
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 16, ease: "linear" }}
                className="absolute w-28 h-28 rounded-full border border-emerald-500/10 flex items-center justify-center"
              >
                <div className="absolute -left-2 w-6 h-6 rounded-lg bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.3)] synergy-orbit-emerald">
                  <Code2 size={11} />
                </div>
                <div className="absolute -right-2 w-6 h-6 rounded-lg bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.3)] synergy-orbit-emerald">
                  <Cpu size={11} />
                </div>
              </motion.div>

              {/* Center Logo image badge */}
              <div className="relative text-center z-10 select-none flex flex-col items-center">
                <img 
                  src="/chandrabud-logo-removebg.png" 
                  alt="ChandraBud Logo" 
                  className="w-16 h-16 object-contain drop-shadow-[0_0_12px_rgba(234,179,8,0.35)] animate-pulse" 
                />
              </div>
            </div>

            {/* Headline and descriptions */}
            <motion.h1 
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-snug mb-3"
            >
              Google <span className="gradient-text-gold">Local SEO</span> & Organic <span className="gradient-text-emerald">Keyword Indexing</span>
            </motion.h1>
            
            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light px-2 mb-6"
            >
              {hero.subheadline}
            </motion.p>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="flex justify-center w-full"
            >
              <a 
                href={hero.ctaLink}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-yellow-500 to-emerald-500 text-black text-xs font-bold hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(234,179,8,0.2)] flex items-center gap-1.5"
              >
                {hero.ctaText} <ArrowRight size={13} />
              </a>
            </motion.div>
          </header>

          {/* Zigzag boundary divider */}
          <div className="zigzag-divider mt-2 mb-4" />

          {/* Section 2: Quick Action Bar (Call, WhatsApp, Maps Direction, Email, Share Profile) */}
          <section className="px-6 py-2">
            <div className="grid grid-cols-5 gap-2 text-center">
              
              <a 
                href={`tel:${contact.phone}`}
                className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-yellow-500/20 hover:bg-yellow-500/5 transition-all group action-btn"
                title="Call Now"
              >
                <div className="w-10 h-10 rounded-full bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-400 group-hover:scale-110 transition-transform mb-1.5">
                  <PhoneCall size={16} />
                </div>
                <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider">Call</span>
              </a>

              <a 
                href={`https://wa.me/${contact.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/20 hover:bg-emerald-500/5 transition-all group action-btn"
                title="WhatsApp"
              >
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform mb-1.5">
                  <MessageCircle size={16} />
                </div>
                <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider">WhatsApp</span>
              </a>

              <a 
                href="#map"
                className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/20 hover:bg-cyan-500/5 transition-all group action-btn"
                title="Directions"
              >
                <div className="w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform mb-1.5">
                  <MapPin size={16} />
                </div>
                <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider">Direction</span>
              </a>

              <a 
                href={`mailto:${contact.email}`}
                className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-yellow-500/20 hover:bg-yellow-500/5 transition-all group action-btn"
                title="Email Us"
              >
                <div className="w-10 h-10 rounded-full bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-400 group-hover:scale-110 transition-transform mb-1.5">
                  <Mail size={16} />
                </div>
                <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider">Email</span>
              </a>

              <button 
                onClick={handleShare}
                className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-purple-500/20 hover:bg-purple-500/5 transition-all group action-btn"
                title="Share Profile"
              >
                <div className="w-10 h-10 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform mb-1.5">
                  <Share2 size={16} />
                </div>
                <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider">Share</span>
              </button>

            </div>
          </section>

          {/* Section 3: About Us Card Profile */}
          <section id="about" className="px-6 py-4 scroll-mt-6">
            <div className="glass-card p-5 sm:p-6 rounded-3xl border border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-yellow-500/5 filter blur-[35px] pointer-events-none" />
              
              <h2 className="text-xs font-bold uppercase tracking-widest text-yellow-400 mb-2">Our Profile</h2>
              <h3 className="text-xl font-bold tracking-tight text-white mb-3">About Chandrabud Studio</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-light mb-5">
                {about.bio}
              </p>

              {/* Statistics row */}
              <div className="grid grid-cols-3 gap-3 border-t border-white/5 pt-4 text-center stats-row">
                <div>
                  <div className="text-sm font-black text-white">{about.experience}</div>
                  <div className="text-[8px] text-zinc-500 uppercase tracking-wider font-semibold mt-0.5">Experience</div>
                </div>
                <div>
                  <div className="text-sm font-black text-yellow-400">{about.projects}</div>
                  <div className="text-[8px] text-zinc-500 uppercase tracking-wider font-semibold mt-0.5">Completed</div>
                </div>
                <div>
                  <div className="text-sm font-black text-emerald-400 flex items-center justify-center gap-0.5">
                    <Star size={10} className="fill-yellow-400 text-yellow-400" />
                    <span>4.9/5</span>
                  </div>
                  <div className="text-[8px] text-zinc-500 uppercase tracking-wider font-semibold mt-0.5">{about.reviewsCount}</div>
                </div>
              </div>
            </div>
          </section>

          {/* Zigzag boundary divider */}
          <div className="zigzag-divider mt-2 mb-4" />

          {/* Section 4: Services capabilities overview list */}
          <section id="services" className="px-6 py-4 scroll-mt-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-yellow-400 text-center mb-1">Our Services</h2>
            <h3 className="text-lg font-bold text-white text-center mb-5">SEO & Search Visibility Focus</h3>
            
            <div className="space-y-4">
              
              {/* Marketing Services block */}
              <div className="glass-card p-4 rounded-2xl border border-white/5 relative overflow-hidden">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-400">
                    <BarChart2 size={15} />
                  </div>
                  <div>
                    <span className="text-[8px] font-bold uppercase tracking-wider text-yellow-400">Marketing</span>
                    <h4 className="text-xs font-bold text-white">{services.marketing.title}</h4>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[9px] text-zinc-300">
                  {services.marketing.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-1">
                      <CheckCircle2 size={10} className="text-yellow-400 shrink-0" />
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </section>

          {/* Zigzag boundary divider */}
          <div className="zigzag-divider mt-2 mb-4" />

          {/* Section 5: Interactive Showcase Gallery (Only SEO and Marketing Showcase) */}
          <section id="gallery" className="px-6 py-4 scroll-mt-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-yellow-400 text-center mb-1">Our Showcase</h2>
            <h3 className="text-lg font-bold text-white text-center mb-5">SEO & Marketing Cases</h3>

            {/* Images Grid */}
            <div className="grid grid-cols-2 gap-3">
              {showcase.map((item, idx) => (
                <div
                  key={idx}
                  className="group cursor-pointer rounded-2xl border border-white/5 bg-[#0b0b0b] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-yellow-500/20 showcase-card"
                  onClick={() => {
                    setSelectedImage(item);
                    setSelectedImageIndex(idx);
                  }}
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <ImageIcon size={18} className="text-yellow-400" />
                    </div>
                  </div>
                  <div className="p-3 text-left">
                    <h4 className="text-[10px] font-bold text-white group-hover:text-yellow-400 transition-colors truncate">{item.title}</h4>
                    <p className="text-[8px] text-zinc-500 truncate mt-0.5 font-light">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Zigzag boundary divider */}
          <div className="zigzag-divider mt-2 mb-4" />

          {/* Section 6: Instagram Reels/Videos Showcase */}
          <section id="videos" className="px-6 py-4 scroll-mt-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-yellow-400 text-center mb-1">Video Portfolio</h2>
            <h3 className="text-lg font-bold text-white text-center mb-5">Instagram Reels & Campaigns</h3>

            <div className="grid grid-cols-3 gap-2.5">
              {instagramVideos.map((vid, idx) => (
                <div 
                  key={idx}
                  onClick={() => setSelectedVideo(vid)}
                  className="relative aspect-[9/16] rounded-xl overflow-hidden cursor-pointer border border-white/5 bg-zinc-900 group hover:border-yellow-500/30 transition-all flex flex-col justify-end p-2 video-card"
                >
                  {/* Background thumbnail */}
                  <img 
                    src={vid.thumbnail} 
                    alt={vid.title} 
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-85 transition-opacity duration-300"
                  />
                  
                  {/* Shadow overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

                  {/* Top tag/category */}
                  <div className="absolute top-1.5 left-1.5 z-10">
                    <span className="text-[6px] font-black uppercase tracking-wider bg-black/80 text-yellow-400 border border-yellow-500/20 px-1.5 py-0.5 rounded">
                      {vid.tag}
                    </span>
                  </div>

                  {/* Instagram icon badge */}
                  <div className="absolute top-1.5 right-1.5 z-10 text-white/60 group-hover:text-pink-500 transition-colors">
                    <Instagram size={11} />
                  </div>

                  {/* Central Play overlay */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                    <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center shadow-lg group-hover:bg-white group-hover:text-black transition-all group-hover:scale-110">
                      <Play size={10} className="fill-current ml-0.5" />
                    </div>
                  </div>

                  {/* Visual Title text */}
                  <div className="relative z-10 text-left">
                    <h4 className="text-[8px] font-extrabold text-zinc-100 group-hover:text-yellow-400 transition-colors line-clamp-2 leading-tight leading-[1.1] video-overlay-title">
                      {vid.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Zigzag boundary divider */}
          <div className="zigzag-divider mt-2 mb-4" />

          {/* Section 7: Google Reviews carousel */}
          <section className="px-6 py-4 relative">
            <div className="flex flex-col items-center text-center">
              
              {/* Google Header */}
              <div className="flex items-center gap-1.5 justify-center mb-3">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" 
                  alt="Google logo"
                  className="w-4 h-4" 
                />
                <span className="text-[10px] font-black uppercase tracking-wider text-white">Review us on Google</span>
              </div>

              {/* 5 stars gold display */}
              <div className="flex gap-0.5 text-yellow-400 justify-center mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} className="fill-yellow-400 text-yellow-400 animate-pulse" />
                ))}
              </div>

              {/* Reviews Slide panel with active states */}
              <div className="w-full relative min-h-[140px] flex items-center justify-center px-4 overflow-hidden mb-2">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={reviewIndex}
                    initial={{ opacity: 0, x: 25 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -25 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <p className="text-xs text-zinc-300 leading-relaxed font-light italic">
                      "{testimonials[reviewIndex].quote}"
                    </p>
                    
                    <div>
                      <cite className="not-italic text-[10px] font-black text-white block">
                        {testimonials[reviewIndex].author}
                      </cite>
                      <span className="text-[8px] text-yellow-400 font-bold uppercase tracking-widest">
                        {testimonials[reviewIndex].company}
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Carousel Indicators & Arrows */}
              <div className="flex items-center gap-3 mt-2">
                <button 
                  onClick={() => setReviewIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                  className="p-1 rounded-full bg-white/5 border border-white/10 hover:border-yellow-500/20 text-zinc-400 hover:text-white transition-colors review-arrow"
                >
                  <ChevronRight size={12} className="rotate-180" />
                </button>

                <div className="flex gap-1.5">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setReviewIndex(i)}
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                        reviewIndex === i ? 'bg-yellow-500 w-3' : 'bg-zinc-700 review-dot-inactive'
                      }`}
                    />
                  ))}
                </div>

                <button 
                  onClick={() => setReviewIndex((prev) => (prev + 1) % testimonials.length)}
                  className="p-1 rounded-full bg-white/5 border border-white/10 hover:border-yellow-500/20 text-zinc-400 hover:text-white transition-colors review-arrow"
                >
                  <ChevronRight size={12} />
                </button>
              </div>

            </div>
          </section>

          {/* Zigzag boundary divider */}
          <div className="zigzag-divider mt-2 mb-4" />

          {/* Section 8: Maps Location details & Form */}
          <section id="contact" className="px-6 py-4 scroll-mt-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-yellow-400 text-center mb-1">Connect</h2>
            <h3 className="text-lg font-bold text-white text-center mb-5">Get in Touch</h3>

            <div id="map" className="w-full h-44 rounded-2xl overflow-hidden border border-white/5 mb-5 shadow-inner">
              <iframe
                title="ChandraBud Location Map"
                src={contact.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) grayscale(25%) contrast(110%)' }}
                className="map-iframe"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            {/* Direct details */}
            <div className="space-y-2.5 text-left mb-6 text-xs text-zinc-400">
              <div className="flex items-start gap-2.5">
                <MapPin size={14} className="text-yellow-400 shrink-0 mt-0.5" />
                <span>{contact.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={14} className="text-emerald-400 shrink-0" />
                <a href={`tel:${contact.phone}`} className="hover:text-yellow-400 transition-colors">
                  {contact.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={14} className="text-cyan-400 shrink-0" />
                <a href={`mailto:${contact.email}`} className="hover:text-yellow-400 transition-colors truncate">
                  {contact.email}
                </a>
              </div>
              {contact.workingHours && (
                <div className="flex items-start gap-2.5">
                  <Clock size={14} className="text-amber-400 shrink-0 mt-0.5" />
                  <span>{contact.workingHours}</span>
                </div>
              )}
            </div>

            {/* Contact Form */}
            <form onSubmit={handleContactSubmit} className="space-y-3.5 text-left">
              <div className="space-y-1">
                <label htmlFor="name-input" className="text-[9px] uppercase tracking-wider text-zinc-500 font-bold form-label">Your Name</label>
                <input
                  id="name-input"
                  type="text"
                  placeholder="Enter name"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.02] border border-white/5 focus:border-yellow-500/30 text-xs focus:outline-none transition-all form-input"
                  required
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="phone-input" className="text-[9px] uppercase tracking-wider text-zinc-500 font-bold form-label">Phone Number</label>
                <input
                  id="phone-input"
                  type="tel"
                  placeholder="Enter number"
                  value={formPhone}
                  onChange={(e) => setFormPhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.02] border border-white/5 focus:border-yellow-500/30 text-xs focus:outline-none transition-all form-input"
                  required
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="message-input" className="text-[9px] uppercase tracking-wider text-zinc-500 font-bold form-label">Message Details</label>
                <textarea
                  id="message-input"
                  rows="3"
                  placeholder="Tell us about your project"
                  value={formMessage}
                  onChange={(e) => setFormMessage(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.02] border border-white/5 focus:border-yellow-500/30 text-xs focus:outline-none transition-all resize-none form-input"
                />
              </div>



              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-white text-black text-xs font-extrabold hover:bg-zinc-200 transition-colors uppercase tracking-widest flex items-center justify-center gap-1.5 disabled:opacity-50 form-submit-btn"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-3 h-3 rounded-full border border-black border-t-transparent animate-spin inline-block" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={12} /> Send Message
                  </>
                )}
              </button>
            </form>
          </section>

          {/* Footer watermark & social links */}
          <footer className="mt-8 pt-6 pb-4 text-center border-t border-white/5">
            {contact.socials && (
              <div className="flex justify-center items-center gap-4 mb-4">
                {contact.socials.facebook && (
                  <a 
                    href={contact.socials.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-full bg-white/[0.03] border border-white/5 flex items-center justify-center text-zinc-400 hover:text-blue-500 hover:border-blue-500/20 hover:bg-blue-500/5 transition-all duration-300 social-btn"
                    title="Facebook Page"
                  >
                    <Facebook size={16} />
                  </a>
                )}
                {contact.socials.instagram && (
                  <a 
                    href={contact.socials.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-full bg-white/[0.03] border border-white/5 flex items-center justify-center text-zinc-400 hover:text-pink-500 hover:border-pink-500/20 hover:bg-pink-500/5 transition-all duration-300 social-btn"
                    title="Instagram Profile"
                  >
                    <Instagram size={16} />
                  </a>
                )}
              </div>
            )}
            <p className="text-[9px] text-zinc-600 footer-watermark">&copy; {new Date().getFullYear()} Chandrabud Studio.</p>
            <p className="tracking-widest uppercase text-[7px] font-bold mt-1 text-zinc-700 footer-subtitle">Digital Business Card</p>
          </footer>

        </div>

        {/* Section 9: Fixed Bottom Navigation Bar */}
        <div className="fixed bottom-4 left-4 right-4 z-40 max-w-lg mx-auto pointer-events-auto">
          <nav className="rounded-full border border-white/10 bg-[#070707]/90 backdrop-blur-2xl px-4 py-2 shadow-[0_-10px_35px_rgba(0,0,0,0.8)] flex justify-between items-center gap-1 bottom-nav-container">
            
            <a 
              href="#home"
              className="flex flex-col items-center justify-center flex-1 py-1 rounded-full text-zinc-400 hover:text-yellow-400 transition-all font-bold group bottom-nav-link"
            >
              <Zap size={15} className="group-hover:scale-115 transition-transform" />
              <span className="text-[7px] uppercase mt-0.5 tracking-wider">Home</span>
            </a>

            <a 
              href="#about"
              className="flex flex-col items-center justify-center flex-1 py-1 rounded-full text-zinc-400 hover:text-yellow-400 transition-all font-bold group bottom-nav-link"
            >
              <Users size={15} className="group-hover:scale-115 transition-transform" />
              <span className="text-[7px] uppercase mt-0.5 tracking-wider">About</span>
            </a>

            <a 
              href="#services"
              className="flex flex-col items-center justify-center flex-1 py-1 rounded-full text-zinc-400 hover:text-yellow-400 transition-all font-bold group bottom-nav-link"
            >
              <Cpu size={15} className="group-hover:scale-115 transition-transform" />
              <span className="text-[7px] uppercase mt-0.5 tracking-wider">Services</span>
            </a>

            <a 
              href="#gallery"
              className="flex flex-col items-center justify-center flex-1 py-1 rounded-full text-zinc-400 hover:text-yellow-400 transition-all font-bold group bottom-nav-link"
            >
              <ImageIcon size={15} className="group-hover:scale-115 transition-transform" />
              <span className="text-[7px] uppercase mt-0.5 tracking-wider">Gallery</span>
            </a>

            <a 
              href="#videos"
              className="flex flex-col items-center justify-center flex-1 py-1 rounded-full text-zinc-400 hover:text-yellow-400 transition-all font-bold group bottom-nav-link"
            >
              <Play size={15} className="group-hover:scale-115 transition-transform" />
              <span className="text-[7px] uppercase mt-0.5 tracking-wider">Videos</span>
            </a>

            <a 
              href="#contact"
              className="flex flex-col items-center justify-center flex-1 py-1 rounded-full text-zinc-400 hover:text-yellow-400 transition-all font-bold group bottom-nav-link"
            >
              <Mail size={15} className="group-hover:scale-115 transition-transform" />
              <span className="text-[7px] uppercase mt-0.5 tracking-wider">Contact</span>
            </a>

          </nav>
        </div>

      </div>

      {/* LIGHTBOX OVERLAY MODAL (Showcase Grid) */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4"
          >
            {/* Top Bar inside modal */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
              <button 
                onClick={() => setSelectedImage(null)}
                className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:border-yellow-500/20 text-zinc-400 hover:text-white transition-colors"
                title="Go Back"
              >
                <ArrowLeft size={16} />
              </button>
              
              <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-black">
                {selectedImageIndex + 1} / {showcase.length}
              </div>

              <button 
                onClick={() => setSelectedImage(null)}
                className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:border-yellow-500/20 text-zinc-400 hover:text-white transition-colors"
                title="Close"
              >
                <X size={16} />
              </button>
            </div>

            {/* Central content frame */}
            <div className="w-full max-w-4xl relative flex items-center justify-center px-8">
              
              {/* Left Navigate Trigger */}
              <button 
                onClick={() => navigateLightbox(-1)}
                className="absolute left-0 p-2.5 rounded-full bg-white/5 border border-white/10 hover:border-yellow-500/20 text-zinc-400 hover:text-white transition-colors"
              >
                <ChevronRight size={16} className="rotate-180" />
              </button>

              <div className="space-y-4 text-center">
                <motion.img
                  key={selectedImage.image}
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className="max-h-[60vh] max-w-full rounded-2xl object-contain border border-white/10 mx-auto"
                />
                
                <div className="max-w-md mx-auto text-center space-y-1 px-4">
                  <h4 className="text-sm font-extrabold text-white">{selectedImage.title}</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed font-light">{selectedImage.desc}</p>
                </div>
              </div>

              {/* Right Navigate Trigger */}
              <button 
                onClick={() => navigateLightbox(1)}
                className="absolute right-0 p-2.5 rounded-full bg-white/5 border border-white/10 hover:border-yellow-500/20 text-zinc-400 hover:text-white transition-colors"
              >
                <ChevronRight size={16} />
              </button>

            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* INSTAGRAM VIDEO PLAYER MODAL */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4 overflow-y-auto"
          >
            <div className="w-full max-w-md flex justify-between items-center mb-3">
              <span className="text-[10px] font-black uppercase tracking-widest text-yellow-400 flex items-center gap-1.5">
                <Instagram size={12} className="text-pink-500" /> Instagram Campaign
              </span>
              <button 
                onClick={() => setSelectedVideo(null)}
                className="p-2 rounded-full bg-white/5 border border-white/10 hover:border-yellow-500/20 text-zinc-400 hover:text-white transition-colors"
                title="Close"
              >
                <X size={15} />
              </button>
            </div>

            {/* Embedded Iframe Container */}
            <div className="w-full max-w-sm aspect-[9/16] max-h-[65vh] rounded-2xl overflow-hidden border border-white/10 bg-black shadow-2xl relative">
              <iframe
                title={selectedVideo.title}
                src={selectedVideo.link.includes('/p/') ? `https://www.instagram.com/p/${selectedVideo.id}/embed/` : `https://www.instagram.com/reel/${selectedVideo.id}/embed/`}
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                allowtransparency="true"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
                className="border-0"
              />
            </div>
            
            {/* Modal Bottom Actions */}
            <div className="w-full max-w-sm text-center mt-4 space-y-3.5 px-2">
              <div>
                <h4 className="text-xs font-extrabold text-white">{selectedVideo.title}</h4>
                <p className="text-[8px] text-zinc-500 uppercase tracking-widest font-bold mt-0.5">Campaign Reel & Content Case</p>
              </div>

              {/* Direct Redirect Button */}
              <a
                href={selectedVideo.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-500 text-white text-xs font-extrabold hover:opacity-90 transition-opacity justify-center items-center gap-1.5 shadow-[0_0_20px_rgba(236,72,153,0.3)] uppercase tracking-wider"
              >
                <Instagram size={14} /> Open in Instagram <ArrowUpRight size={12} />
              </a>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
      {/* SUCCESS MODAL */}
      <AnimatePresence>
        {submitSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="w-full max-w-sm bg-[#0a0a0a] border border-white/10 rounded-3xl p-6 text-center shadow-[0_0_50px_rgba(16,185,129,0.15)] relative overflow-hidden success-modal-content"
            >
              {/* Gold & Emerald floating glows inside modal */}
              <div className="absolute top-[-20%] left-[-20%] w-32 h-32 rounded-full bg-emerald-500/10 blur-[40px] pointer-events-none" />
              <div className="absolute bottom-[-20%] right-[-20%] w-32 h-32 rounded-full bg-yellow-500/5 blur-[40px] pointer-events-none" />

              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mx-auto mb-4 shadow-[0_0_20px_rgba(16,185,129,0.15)]">
                <CheckCircle2 size={32} className="animate-pulse" />
              </div>
              <h3 className="text-base font-extrabold text-white mb-2">Message Sent!</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-light mb-6">
                Thank you for reaching out. We have received your inquiry and our team will get in touch with you shortly.
              </p>
              <button
                onClick={() => setSubmitSuccess(false)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-emerald-500 text-black text-xs font-black uppercase tracking-widest hover:scale-[1.02] transition-transform"
              >
                Okay, Got it
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default App;
