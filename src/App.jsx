import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, CheckCircle2, ArrowRight, Mail, MessageCircle, 
  BarChart2, Code2, Sparkles, Zap, Monitor, Shield, 
  Search, Award, Cpu, LineChart, Check, ArrowUpRight, PhoneCall, Menu, X
} from 'lucide-react';
import portfolioData from './data/portfolioData.json';

const springTransition = { type: "spring", stiffness: 85, damping: 16 };
const slowSpring = { type: "spring", stiffness: 45, damping: 12 };

const fadeUp = {
  hidden: { opacity: 0, y: 35, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: springTransition }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05
    }
  }
};

// Premium Floating Particle Background Component with Soft Glow Depth
const ParticleBackground = () => {
  const particles = Array.from({ length: 35 });
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {particles.map((_, i) => {
        const size = Math.random() * 4 + 2.5; // 2.5px to 6.5px glowing dots
        const leftPosition = Math.random() * 100; // 0% to 100% horizontal range
        const delay = Math.random() * 8;
        const duration = Math.random() * 15 + 13; // 13s to 28s float time
        const isEmerald = Math.random() > 0.5;
        
        return (
          <motion.div
            key={i}
            className={`absolute rounded-full ${
              isEmerald 
                ? 'bg-emerald-400/30 shadow-[0_0_10px_rgba(52,211,153,0.4)]' 
                : 'bg-cyan-400/30 shadow-[0_0_10px_rgba(34,211,238,0.4)]'
            }`}
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
  const { hero, services, whyUs, team, work, process, testimonials, contact } = portfolioData;
  const [activeShowcase, setActiveShowcase] = useState('marketing'); // 'marketing' or 'development'
  const [activeProfile, setActiveProfile] = useState(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-[#ededed] overflow-x-hidden font-sans relative selection:bg-emerald-500/30 selection:text-white">
      
      {/* Background Glows & Floating Particles */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-15%] w-[45vw] h-[45vw] rounded-full bg-emerald-500/5 blur-[160px] animate-pulse-glow" />
        <div className="absolute bottom-[-10%] right-[-15%] w-[45vw] h-[45vw] rounded-full bg-cyan-500/5 blur-[160px] animate-pulse-glow" style={{ animationDelay: '4s' }} />
      </div>
      <ParticleBackground />

      {/* Premium Floating Glassmorphism Navigation */}
      <div className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 pointer-events-none">
        <motion.nav 
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={springTransition}
          className={`max-w-5xl mx-auto rounded-full border shadow-2xl px-5 sm:px-7 py-3 transition-all duration-500 pointer-events-auto relative ${
            scrolled 
              ? 'bg-[#050505]/75 backdrop-blur-2xl border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.8)] py-2.5' 
              : 'bg-[#050505]/20 backdrop-blur-xl border-white/5 shadow-[0_0_20px_rgba(0,0,0,0.3)] py-3'
          } ${
            mobileMenuOpen ? 'rounded-2xl bg-[#050505]/95 border-white/10' : ''
          }`}
        >
          <div className="flex justify-between items-center w-full relative">
            
            <div 
              className="flex flex-col cursor-pointer pointer-events-auto shrink-0"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <div className="text-base sm:text-lg font-extrabold tracking-tighter flex items-center gap-0.5 leading-tight">
                <span className="text-emerald-400">Chandrabud</span>
                <span className="text-cyan-400 font-medium">Studio</span>
                <span className="w-1 h-1 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400"></span>
              </div>
              <span className="text-[7px] sm:text-[8px] text-zinc-500 uppercase tracking-widest leading-none mt-0.5 font-bold">Marketing + Technology</span>
            </div>
            
            {/* Desktop Nav Items */}
            <div className="hidden md:flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-zinc-400 relative">
              {[
                { id: 'about', label: 'Profiles', color: 'hover:text-emerald-400' },
                { id: 'skills', label: 'Skills', color: 'hover:text-teal-400' },
                { id: 'work', label: 'Showcase', color: 'hover:text-cyan-400' },
                { id: 'process', label: 'Blueprint', color: 'hover:text-emerald-400' }
              ].map(item => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onMouseEnter={() => setHoveredLink(item.id)}
                  onMouseLeave={() => setHoveredLink(null)}
                  className={`relative px-4 py-2 rounded-full transition-colors duration-300 ${item.color} z-10`}
                >
                  {hoveredLink === item.id && (
                    <motion.span
                      layoutId="navbarHoverPill"
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                      className="absolute inset-0 bg-white/[0.04] border border-white/5 rounded-full -z-10"
                    />
                  )}
                  {item.label}
                </a>
              ))}
            </div>

            {/* Nav CTAs & Phone Trigger */}
            <div className="flex items-center gap-2 sm:gap-3.5">
              <a 
                href={`tel:${contact.whatsapp}`} 
                className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-[10px] sm:text-xs text-zinc-300 hover:text-emerald-400 hover:border-emerald-500/25 hover:shadow-[0_0_15px_rgba(16,185,129,0.15)] flex items-center gap-2 font-extrabold uppercase transition-all duration-300 shadow-md animate-glow"
                title="Call Us Directly"
              >
                <PhoneCall size={12} className="text-emerald-400 animate-pulse sm:w-[13px] sm:h-[13px]" />
                <span className="hidden min-[400px]:inline">Call Now</span>
              </a>
              
              <a 
                href="#contact" 
                className="hidden sm:inline-flex px-5 py-2.5 rounded-full text-xs font-extrabold tracking-wider uppercase bg-white text-black hover:bg-zinc-200 hover:scale-105 transition-all duration-300 items-center gap-1.5"
              >
                Let's Scale <ArrowUpRight size={13} />
              </a>

              {/* Mobile Menu Toggle Button */}
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2.5 rounded-full bg-white/5 border border-white/10 hover:border-emerald-500/20 text-zinc-300 hover:text-white transition-colors"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X size={15} /> : <Menu size={15} />}
              </button>
            </div>

            {/* Mobile Full Dropdown Menu Panel */}
            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute top-full left-0 right-0 z-40 bg-[#050505]/95 backdrop-blur-2xl border border-white/5 rounded-2xl py-6 px-6 mt-3.5 space-y-5 flex flex-col items-center text-center shadow-2xl md:hidden"
                >
                  <a 
                    href="#about" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-xs font-bold uppercase tracking-widest text-zinc-300 hover:text-emerald-400 transition-colors py-1 w-full"
                  >
                    Profiles
                  </a>
                  <a 
                    href="#skills" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-xs font-bold uppercase tracking-widest text-zinc-300 hover:text-teal-400 transition-colors py-1 w-full"
                  >
                    Skills
                  </a>
                  <a 
                    href="#work" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-xs font-bold uppercase tracking-widest text-zinc-300 hover:text-cyan-400 transition-colors py-1 w-full"
                  >
                    Showcase
                  </a>
                  <a 
                    href="#process" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-xs font-bold uppercase tracking-widest text-zinc-300 hover:text-emerald-400 transition-colors py-1 w-full"
                  >
                    Synergy Blueprint
                  </a>
                  
                  <div className="w-full h-px bg-white/5 my-1" />
                  
                  <div className="flex gap-4 items-center justify-center w-full">
                    <a 
                      href={`tel:${contact.whatsapp}`} 
                      className="p-3 rounded-full bg-white/5 border border-white/10 hover:border-emerald-500/35 hover:bg-emerald-500/10 text-zinc-300 hover:text-emerald-400 transition-all duration-300 flex items-center justify-center"
                    >
                      <PhoneCall size={16} />
                    </a>
                    <a 
                      href="#contact" 
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex-1 py-3.5 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-black font-black text-center text-[10px] tracking-wider uppercase shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                    >
                      Let's Scale
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </motion.nav>
      </div>

      {/* Main Container */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-24 sm:pt-32 pb-24 space-y-24 sm:space-y-36 lg:space-y-40">
        
        {/* Section 1: Hero Section */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative min-h-[80vh] flex flex-col justify-center items-center text-center max-w-5xl mx-auto pt-8 sm:pt-12"
        >
          {/* Overhead high-tech badge */}
          <motion.div 
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-[10px] font-semibold uppercase tracking-widest text-zinc-400 mb-6"
          >
            <Sparkles size={11} className="text-emerald-400 animate-pulse" />
            <span>Integrated Growth & Scalable Code</span>
          </motion.div>

          {/* Epic responsive main Headline */}
          <motion.h1 
            variants={fadeUp}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter leading-[1.1] sm:leading-[1.05] mb-6 sm:mb-8"
          >
            Your business deserves <br className="hidden md:block"/>
            <span className="gradient-text-emerald">visibility</span>, trust, and a <br />
            <span className="gradient-text-cyan">digital experience</span> that converts.
          </motion.h1>

          {/* Subheadline with high readable contrast */}
          <motion.p 
            variants={fadeUp}
            className="text-sm sm:text-base md:text-lg lg:text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed mb-10 sm:mb-12 font-light px-2"
          >
            {hero.subheadline}
          </motion.p>

          {/* Responsive CTAs */}
          <motion.div 
            variants={fadeUp} 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-12 sm:mb-16 px-4 sm:px-0"
          >
            <a 
              href={hero.ctaLink} 
              className="w-full sm:w-auto px-8 sm:px-10 py-4.5 sm:py-5 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-black font-semibold transition-all duration-300 shadow-[0_0_30px_rgba(16,185,129,0.2)] hover:shadow-[0_0_40px_rgba(6,182,212,0.3)] flex items-center justify-center gap-2 text-sm"
            >
              {hero.ctaText} <ArrowRight size={16} />
            </a>
            <a 
              href="#about" 
              className="w-full sm:w-auto px-8 sm:px-10 py-4.5 sm:py-5 rounded-full glass-panel hover:bg-white/[0.08] hover:border-white/15 transition-all text-xs font-semibold tracking-wider uppercase"
            >
              Meet the Duo
            </a>
          </motion.div>

          {/* Interactive Responsive Orbit Graphic */}
          <motion.div 
            variants={fadeUp}
            className="relative w-full max-w-xl aspect-video rounded-3xl border border-white/5 bg-gradient-to-b from-white/[0.01] to-transparent backdrop-blur-md p-6 sm:p-10 flex items-center justify-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-radial-gradient from-white/[0.02] to-transparent pointer-events-none" />
            
            {/* Blending central Core Sphere */}
            <div className="absolute w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-tr from-emerald-500/20 via-teal-500/10 to-cyan-500/20 blur-xl animate-pulse-glow" />
            
            {/* Spinning Orbit 1: Marketing (Rudra) */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
              className="absolute w-44 h-44 sm:w-64 sm:h-64 rounded-full border border-emerald-500/10 border-dashed flex items-center justify-center"
            >
              <div className="absolute -top-3 w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                <LineChart size={13} className="sm:w-[14px]" />
              </div>
              <div className="absolute -bottom-3 w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                <Search size={13} className="sm:w-[14px]" />
              </div>
            </motion.div>

            {/* Spinning Orbit 2: Engineering (Narayan) */}
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 14, ease: "linear" }}
              className="absolute w-28 h-28 sm:w-44 sm:h-44 rounded-full border border-cyan-500/10 flex items-center justify-center"
            >
              <div className="absolute -left-3 w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-cyan-950 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                <Code2 size={13} className="sm:w-[14px]" />
              </div>
              <div className="absolute -right-3 w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-cyan-950 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                <Cpu size={13} className="sm:w-[14px]" />
              </div>
            </motion.div>

            {/* Central Badge label */}
            <div className="relative text-center z-10 select-none">
              <div className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center justify-center gap-1.5">
                <Zap size={18} className="text-teal-400 sm:w-[20px]" />
                <span>Synergy</span>
              </div>
              <div className="text-[9px] text-zinc-500 uppercase tracking-widest mt-1">Growth & Products in Sync</div>
            </div>
          </motion.div>
        </motion.section>


        {/* Section 2: Profiles "Who We Are" */}
        <section id="about" className="space-y-12 sm:space-y-16 scroll-mt-24">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="text-center space-y-4 max-w-3xl mx-auto px-2"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-teal-400">The Power of Two</span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tighter">Meet the Specialists</h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-light">Two experts representing the dual pillars of modern business: Rudra building visibility & content management, and Narayan building scalable, modern web products.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
            {team.map((member, idx) => {
              const isEmerald = member.signature === 'emerald';
              const active = activeProfile === idx;
              
              return (
                <motion.div 
                  key={idx}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  onMouseEnter={() => setActiveProfile(idx)}
                  onMouseLeave={() => setActiveProfile(null)}
                  className={`glass-card p-6 sm:p-8 rounded-[2rem] relative flex flex-col justify-between overflow-hidden cursor-pointer ${
                    isEmerald ? 'border-glow-emerald hover:-translate-y-2' : 'border-glow-cyan hover:-translate-y-2'
                  } ${active ? 'scale-[1.01]' : ''} transition-all duration-500`}
                >
                  <div className={`absolute top-0 right-0 w-64 h-64 rounded-full filter blur-[80px] pointer-events-none opacity-0 transition-opacity duration-700 ${
                    active ? 'opacity-25' : ''
                  } ${isEmerald ? 'bg-emerald-500/20' : 'bg-cyan-500/20'}`} />

                  <div>
                    {/* Responsive Profile details */}
                    <div className="flex flex-col sm:flex-row gap-5 sm:gap-6 items-start mb-6 sm:mb-8">
                      <div className="relative shrink-0">
                        <img 
                          src={member.avatar} 
                          alt={member.name} 
                          className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border border-white/10" 
                        />
                        <div className={`absolute -bottom-1 -right-1 px-2.5 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider ${
                          isEmerald ? 'bg-emerald-500 text-black' : 'bg-cyan-500 text-black'
                        }`}>
                          {member.name}
                        </div>
                      </div>
                      
                      <div className="space-y-0.5 sm:space-y-1">
                        <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-widest ${
                          isEmerald ? 'text-emerald-400' : 'text-cyan-400'
                        }`}>
                          {member.role}
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">{member.name}</h3>
                        <div className="text-zinc-500 text-xs sm:text-sm font-medium">{member.title}</div>
                      </div>
                    </div>

                    <p className="text-zinc-400 text-sm sm:text-base leading-relaxed font-light mb-6 sm:mb-8">
                      "{member.intro}"
                    </p>

                    {/* Key Strengths Grid */}
                    <div className="space-y-3 sm:space-y-4">
                      <h4 className="text-[10px] sm:text-xs uppercase tracking-widest text-zinc-500 font-bold">Key Strengths</h4>
                      <ul className="grid sm:grid-cols-2 gap-3">
                        {member.strengths.map((strength, sIdx) => (
                          <li key={sIdx} className="flex items-start gap-2 text-xs sm:text-sm text-zinc-300">
                            <span className={`shrink-0 mt-1 w-2 h-2 rounded-full border flex items-center justify-center ${
                              isEmerald ? 'border-emerald-500 bg-emerald-500/10' : 'border-cyan-500 bg-cyan-500/10'
                            }`}>
                              <span className={`w-0.5 h-0.5 rounded-full ${
                                isEmerald ? 'bg-emerald-400' : 'bg-cyan-400'
                              }`} />
                            </span>
                            <span>{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Profile interactive footer tag */}
                  <div className="mt-8 sm:mt-10 pt-4 sm:pt-6 border-t border-white/5 flex justify-between items-center">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Focus Area</span>
                    <span className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      isEmerald ? 'badge-emerald' : 'badge-cyan'
                    }`}>
                      {member.expertise}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>


        {/* Section 3: Interactive Skills Showcase */}
        <section id="skills" className="space-y-12 sm:space-y-16 scroll-mt-24">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center space-y-4 max-w-3xl mx-auto px-2"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Our Capabilities</span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tighter">Dual Skill Systems</h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-light">Hover over any capability to see the underlying toolkit we leverage to deliver exceptional organic traffic and pixel-perfect applications.</p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
            
            {/* Marketing Grid */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="glass-card p-6 sm:p-8 rounded-3xl border border-white/5 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-emerald-500/5 filter blur-[60px] pointer-events-none" />
              
              <div className="flex items-center gap-3.5 mb-6 sm:mb-8">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                  <BarChart2 size={20} className="sm:w-[22px] sm:h-[22px]" />
                </div>
                <div>
                  <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-emerald-400">Marketing & Content</span>
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight">{services.marketing.title}</h3>
                </div>
              </div>

              <div className="space-y-3.5 sm:space-y-4">
                {services.marketing.items.map((skill, idx) => {
                  const id = `m-${idx}`;
                  const isHovered = hoveredSkill === id;
                  
                  return (
                    <div
                      key={idx}
                      onMouseEnter={() => setHoveredSkill(id)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      className={`p-4 sm:p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                        isHovered 
                          ? 'bg-emerald-500/5 border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.05)]' 
                          : 'bg-white/[0.01] border-white/5'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2.5 sm:gap-3">
                          <CheckCircle2 className="text-emerald-400 shrink-0" size={16} className="sm:w-[18px] sm:h-[18px]" />
                          <span className="text-zinc-200 font-medium text-xs sm:text-sm md:text-base">{skill}</span>
                        </div>
                        <ChevronRight size={14} className={`text-zinc-600 transition-transform duration-300 sm:w-[16px] ${
                          isHovered ? 'translate-x-1.5 text-emerald-400' : ''
                        }`} />
                      </div>
                      
                      <AnimatePresence>
                        {isHovered && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25 }}
                            className="mt-3 pt-3 border-t border-emerald-500/15 overflow-hidden"
                          >
                            <p className="text-[11px] sm:text-xs text-zinc-400 leading-relaxed font-light">
                              Highly specialized implementation covering key performance parameters to guarantee direct lead generation and brand scale.
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Development Grid */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="glass-card p-6 sm:p-8 rounded-3xl border border-white/5 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-cyan-500/5 filter blur-[60px] pointer-events-none" />
              
              <div className="flex items-center gap-3.5 mb-6 sm:mb-8">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                  <Code2 size={20} className="sm:w-[22px] sm:h-[22px]" />
                </div>
                <div>
                  <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-cyan-400">Full Stack Engineering</span>
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight">{services.development.title}</h3>
                </div>
              </div>

              <div className="space-y-3.5 sm:space-y-4">
                {services.development.items.map((skill, idx) => {
                  const id = `d-${idx}`;
                  const isHovered = hoveredSkill === id;
                  
                  return (
                    <div
                      key={idx}
                      onMouseEnter={() => setHoveredSkill(id)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      className={`p-4 sm:p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                        isHovered 
                          ? 'bg-cyan-500/5 border-cyan-500/20 shadow-[0_0_20px_rgba(6,182,212,0.05)]' 
                          : 'bg-white/[0.01] border-white/5'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2.5 sm:gap-3">
                          <CheckCircle2 className="text-cyan-400 shrink-0" size={16} className="sm:w-[18px] sm:h-[18px]" />
                          <span className="text-zinc-200 font-medium text-xs sm:text-sm md:text-base">{skill}</span>
                        </div>
                        <ChevronRight size={14} className={`text-zinc-600 transition-transform duration-300 sm:w-[16px] ${
                          isHovered ? 'translate-x-1.5 text-cyan-400' : ''
                        }`} />
                      </div>
                      
                      <AnimatePresence>
                        {isHovered && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25 }}
                            className="mt-3 pt-3 border-t border-cyan-500/15 overflow-hidden"
                          >
                            <p className="text-[11px] sm:text-xs text-zinc-400 leading-relaxed font-light">
                              Built from scratch utilizing state-of-the-art modular structure patterns, optimized assets, and rapid sub-second interaction models.
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.div>

          </div>
        </section>


        {/* Section 4: Premium Showcase Section */}
        <section id="work" className="space-y-12 sm:space-y-16 scroll-mt-24">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center space-y-4 max-w-3xl mx-auto px-2"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-teal-400">Creative & Code Portfolio</span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tighter">Selected Showcase</h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-light">Explore concrete examples of the content campaigns Rudra leads and the scalable digital products Narayan builds.</p>
          </motion.div>

          {/* Filter Toggles */}
          <div className="flex justify-center px-2">
            <div className="inline-flex flex-col sm:flex-row rounded-2xl sm:rounded-full bg-white/[0.02] border border-white/5 p-1.5 backdrop-blur-xl w-full sm:w-auto gap-1">
              <button
                onClick={() => setActiveShowcase('marketing')}
                className={`px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl sm:rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-500 ${
                  activeShowcase === 'marketing' 
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.2)]' 
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Rudra's Campaigns & Content
              </button>
              <button
                onClick={() => setActiveShowcase('development')}
                className={`px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl sm:rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-500 ${
                  activeShowcase === 'development' 
                    ? 'bg-gradient-to-r from-cyan-500 to-sky-500 text-black shadow-[0_0_20px_rgba(6,182,212,0.2)]' 
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Narayan's Modern Products
              </button>
            </div>
          </div>

          {/* Cards Display Grid */}
          <div className="grid gap-10 px-2 sm:px-0">
            <AnimatePresence mode="wait">
              {activeShowcase === 'marketing' ? (
                // RUDRA SHOWCASE CARDS (MARKETING)
                <motion.div
                  key="marketing-grid"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={springTransition}
                  className="grid gap-8 sm:gap-10"
                >
                  {work.marketing.map((project, idx) => (
                    <motion.div
                      key={project.title}
                      whileHover={{ y: -6, scale: 1.005 }}
                      transition={{ type: "spring", stiffness: 200, damping: 18 }}
                      className="glass-card p-6 sm:p-10 md:p-12 rounded-[2rem] sm:rounded-[2.5rem] border border-white/5 relative overflow-hidden flex flex-col lg:flex-row gap-8 sm:gap-12 items-stretch border-glow-emerald"
                    >
                      {/* Left: Campaign Specs */}
                      <div className="flex-1 flex flex-col justify-between space-y-6 sm:space-y-8 relative z-10">
                        <div className="space-y-4">
                          <div>
                            <span className="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider badge-emerald">
                              {project.type}
                            </span>
                          </div>
                          <h3 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tight">{project.title}</h3>
                          <p className="text-zinc-400 font-light leading-relaxed text-sm sm:text-base md:text-lg">
                            {project.description}
                          </p>
                        </div>

                        <div className="space-y-3">
                          <h4 className="text-[10px] sm:text-xs uppercase tracking-widest text-zinc-500 font-bold">Scope & Execution</h4>
                          <div className="grid sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                            {project.deliverables.map((deliv, dIdx) => (
                              <div key={dIdx} className="flex items-center gap-2.5 text-zinc-300">
                                <Check size={13} className="text-emerald-400 shrink-0" />
                                <span>{deliv}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="pt-4 sm:pt-6 border-t border-white/5 flex items-center justify-between text-xs">
                          <span className="text-zinc-500 tracking-wider">Audited traffic strategy</span>
                          <a href="#contact" className="font-bold tracking-wider uppercase text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 transition-colors">
                            Inquire Blueprint <ArrowUpRight size={14} className="shrink-0" />
                          </a>
                        </div>
                      </div>

                      {/* Right: Dynamic High-Fidelity Marketing CSS Mockups */}
                      <div className="flex-1 min-h-[260px] bg-black/45 rounded-2xl sm:rounded-3xl border border-white/5 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
                        <div className="absolute inset-0 bg-radial-gradient from-emerald-500/5 to-transparent pointer-events-none" />
                        
                        <div className="text-[10px] sm:text-xs uppercase tracking-widest text-zinc-500 font-bold relative z-10 flex justify-between">
                          <span>Live Campaign Analytics</span>
                          <span className="text-emerald-400 font-bold">{project.metric}</span>
                        </div>

                        <div className="my-5 sm:my-6 relative z-10">
                          {idx === 0 && (
                            /* Funnels mockup for Campaign 1 */
                            <div className="flex flex-col items-center justify-center gap-2 my-auto py-3">
                              <div className="w-full max-w-[200px] h-8 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-between px-3.5 text-[9px] sm:text-[10px] text-emerald-400 font-bold transition-all hover:bg-emerald-500/15">
                                <span>Ad Impressions</span>
                                <span>142k</span>
                              </div>
                              <div className="w-full max-w-[170px] h-8 bg-emerald-500/20 border border-emerald-500/30 rounded-xl flex items-center justify-between px-3.5 text-[9px] sm:text-[10px] text-emerald-400 font-bold transition-all hover:bg-emerald-500/25">
                                <span>Organic Clicks</span>
                                <span>24.8k</span>
                              </div>
                              <div className="w-full max-w-[140px] h-8 bg-emerald-500/40 border border-emerald-500/50 rounded-xl flex items-center justify-between px-3.5 text-[9px] sm:text-[10px] text-black font-black shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                                <span>Sales Leads</span>
                                <span>1,420</span>
                              </div>
                            </div>
                          )}

                          {idx === 1 && (
                            /* Video Player Mockup for Campaign 2 */
                            <div className="relative w-full h-28 rounded-xl border border-white/5 overflow-hidden flex flex-col justify-between p-3.5 group cursor-pointer bg-slate-900/30">
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                              <div className="absolute inset-0 bg-cover bg-center opacity-40 transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80)' }} />
                              <div className="flex justify-between items-center text-[8px] sm:text-[9px] text-white/50 uppercase tracking-widest font-bold relative z-20">
                                <span>Corporate Promo Short</span>
                                <span className="px-2 py-0.5 rounded bg-emerald-500 text-black font-extrabold text-[8px] tracking-normal animate-pulse shadow-md">RENDERED</span>
                              </div>
                              <div className="flex items-center justify-center gap-3 relative z-20 my-auto">
                                <div className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                                  <span className="border-y-[5px] border-y-transparent border-l-[8px] border-l-black ml-0.5" />
                                </div>
                                <div className="flex gap-1 items-center h-6">
                                  <span className="w-0.5 h-2 bg-emerald-400 rounded-full animate-pulse" />
                                  <span className="w-0.5 h-5 bg-teal-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                                  <span className="w-0.5 h-3 bg-emerald-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                                  <span className="w-0.5 h-6 bg-emerald-400 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }} />
                                  <span className="w-0.5 h-2 bg-teal-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                                </div>
                              </div>
                              <div className="w-full bg-white/10 rounded-full h-1 relative z-20 overflow-hidden">
                                <div className="bg-emerald-400 h-full w-[65%]" />
                              </div>
                            </div>
                          )}

                          {idx === 2 && (
                            /* Blog SEO Editor Mockup for Campaign 3 */
                            <div className="w-full h-28 rounded-xl border border-white/5 bg-[#0b0b0b] p-3.5 flex flex-col justify-between">
                              <div className="flex items-center gap-1.5 border-b border-white/5 pb-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                <span className="text-[8px] sm:text-[9px] text-zinc-500 uppercase tracking-widest font-bold">SEO Audit CMS Optimizer</span>
                              </div>
                              <div className="space-y-2.5 my-auto">
                                <div className="h-3 bg-white/10 rounded w-[85%] border border-white/5" />
                                <div className="h-2 bg-white/5 rounded w-[95%]" />
                                <div className="flex gap-2 pt-1">
                                  <span className="text-[8px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-bold">#Google-Indexed</span>
                                  <span className="text-[8px] bg-teal-500/10 border border-teal-500/20 text-teal-400 px-2 py-0.5 rounded-full font-bold">#Visibily-Top3</span>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Secondary metrics row */}
                        <div className="flex justify-between items-center pt-3 border-t border-white/5 text-[9px] sm:text-[10px] text-zinc-400 uppercase tracking-wider relative z-10">
                          <span>Sub-KPI: {project.subkpi}</span>
                          <span>Audit Verified</span>
                        </div>
                      </div>

                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                // NARAYAN SHOWCASE CARDS (DEVELOPMENT)
                <motion.div
                  key="development-grid"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={springTransition}
                  className="grid gap-8 sm:gap-10"
                >
                  {work.development.map((project, idx) => (
                    <motion.div
                      key={project.title}
                      whileHover={{ y: -6, scale: 1.005 }}
                      transition={{ type: "spring", stiffness: 200, damping: 18 }}
                      className="glass-card p-6 sm:p-10 md:p-12 rounded-[2rem] sm:rounded-[2.5rem] border border-white/5 relative overflow-hidden flex flex-col lg:flex-row gap-8 sm:gap-12 items-stretch border-glow-cyan"
                    >
                      {/* Left: Product Specs */}
                      <div className="flex-1 flex flex-col justify-between space-y-6 sm:space-y-8 relative z-10">
                        <div className="space-y-4">
                          <div>
                            <span className="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider badge-cyan">
                              {project.type}
                            </span>
                          </div>
                          <h3 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tight">{project.title}</h3>
                          <p className="text-zinc-400 font-light leading-relaxed text-sm sm:text-base md:text-lg">
                            {project.description}
                          </p>
                        </div>

                        <div className="space-y-3">
                          <h4 className="text-[10px] sm:text-xs uppercase tracking-widest text-zinc-500 font-bold">Milestones & Architecture</h4>
                          <div className="grid sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                            {project.deliverables.map((deliv, dIdx) => (
                              <div key={dIdx} className="flex items-center gap-2.5 text-zinc-300">
                                <Check size={13} className="text-cyan-400 shrink-0" />
                                <span>{deliv}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="pt-4 sm:pt-6 border-t border-white/5 flex items-center justify-between text-xs">
                          <span className="text-zinc-500 tracking-wider">Scalable Node / React application</span>
                          <a href="#contact" className="font-bold tracking-wider uppercase text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 transition-colors">
                            Inspect Code <ArrowUpRight size={14} className="shrink-0" />
                          </a>
                        </div>
                      </div>

                      {/* Right: Dynamic High-Fidelity Development Browser/Device Mockups */}
                      <div className="flex-1 min-h-[260px] bg-black/45 rounded-2xl sm:rounded-3xl border border-white/5 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
                        <div className="absolute inset-0 bg-radial-gradient from-cyan-500/5 to-transparent pointer-events-none" />
                        
                        {/* Browser Window Bar */}
                        <div className="flex items-center gap-1.5 pb-2 border-b border-white/5 relative z-10">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500/40" />
                          <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/40" />
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500/40" />
                          <span className="text-[8px] text-zinc-600 bg-white/5 rounded px-4 py-0.5 ml-2 font-semibold w-full max-w-[140px] truncate">
                            {idx === 0 ? 'https://app.dashboard.io' : idx === 1 ? 'https://growthdev.agency/storefront' : 'https://api.v1.webhooks'}
                          </span>
                        </div>

                        {/* Custom visual mockup */}
                        <div className="my-5 sm:my-6 relative z-10 flex-1 flex flex-col justify-center">
                          {idx === 0 && (
                            /* SaaS Analytics Dashboard Mockup for Project 1 */
                            <div className="grid grid-cols-3 gap-2 sm:gap-3 w-full">
                              <div className="bg-[#0b0b0b] border border-white/5 p-2.5 rounded-xl text-center space-y-1 hover:border-cyan-500/20 transition-colors cursor-pointer">
                                <div className="text-[7px] sm:text-[8px] text-zinc-500 uppercase tracking-wider font-bold">API Loads</div>
                                <div className="text-sm sm:text-base font-black text-white">14.8k</div>
                              </div>
                              <div className="bg-[#0b0b0b] border border-white/5 p-2.5 rounded-xl text-center space-y-1 hover:border-cyan-500/20 transition-colors cursor-pointer">
                                <div className="text-[7px] sm:text-[8px] text-zinc-500 uppercase tracking-wider font-bold">Uptime</div>
                                <div className="text-sm sm:text-base font-black text-cyan-400">99.9%</div>
                              </div>
                              <div className="bg-[#0b0b0b] border border-white/5 p-2.5 rounded-xl text-center space-y-1 hover:border-cyan-500/20 transition-colors cursor-pointer">
                                <div className="text-[7px] sm:text-[8px] text-zinc-500 uppercase tracking-wider font-bold">Latency</div>
                                <div className="text-sm sm:text-base font-black text-emerald-400">180ms</div>
                              </div>
                              
                              {/* Glowing progress logs mock */}
                              <div className="col-span-3 flex gap-1 items-end h-8 w-full opacity-60 px-1 pt-1.5">
                                <div className="w-full bg-cyan-500/20 rounded-t-sm h-[35%]" />
                                <div className="w-full bg-cyan-500/20 rounded-t-sm h-[55%]" />
                                <div className="w-full bg-cyan-500/40 rounded-t-sm h-[75%]" />
                                <div className="w-full bg-cyan-500/80 rounded-t-sm h-[95%] shadow-[0_0_10px_rgba(6,182,212,0.3)] animate-pulse" />
                              </div>
                            </div>
                          )}

                          {idx === 1 && (
                            /* Device viewport storefront landing mockup for Project 2 */
                            <div className="flex gap-3 sm:gap-4 items-center w-full bg-[#0b0b0b] p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-white/5 cursor-pointer hover:border-cyan-500/20 transition-colors">
                              {/* Product Preview Image Block */}
                              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-tr from-cyan-500/10 via-teal-500/5 to-cyan-500/15 border border-white/10 flex items-center justify-center text-cyan-400 shrink-0">
                                <Monitor size={18} className="sm:w-[22px] sm:h-[22px] animate-float" />
                              </div>
                              
                              <div className="space-y-1.5 flex-1 min-w-0">
                                <div className="h-3 bg-white/10 rounded w-[80%] border border-white/5" />
                                <div className="h-2 bg-white/5 rounded w-[95%]" />
                                <div className="flex gap-1.5 pt-0.5">
                                  <span className="w-8 h-3 rounded-full bg-cyan-500/10 border border-cyan-500/20" />
                                  <span className="w-12 h-3 rounded-full bg-emerald-500/10 border border-emerald-500/20" />
                                </div>
                              </div>
                            </div>
                          )}

                          {idx === 2 && (
                            /* API Webhook router interactive terminal mockup for Project 3 */
                            <div className="w-full bg-[#0b0b0b] rounded-xl border border-white/5 p-3.5 font-mono text-[8px] sm:text-[9px] text-cyan-400 flex flex-col gap-1.5 select-none hover:border-cyan-500/20 transition-colors">
                              <div className="flex items-center justify-between text-[7px] text-zinc-500 uppercase tracking-widest font-sans font-bold">
                                <span>Router Console Log</span>
                                <span className="text-cyan-400 animate-pulse font-bold flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-cyan-400" /> Active</span>
                              </div>
                              <div className="space-y-1 pt-1">
                                <div className="flex items-center gap-1.5">
                                  <span className="text-zinc-600">&gt;</span>
                                  <span className="text-white">GET /v1/webhooks/status</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <span className="text-emerald-400">200 OK</span>
                                  <span className="text-zinc-500">MongoDB schema linked successfully</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <span className="text-emerald-400">200 OK</span>
                                  <span className="text-zinc-500">Auth0 credential token verified</span>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Secondary stats row */}
                        <div className="flex justify-between items-center pt-3 border-t border-white/5 text-[9px] sm:text-[10px] text-zinc-400 uppercase tracking-wider relative z-10">
                          <span>{project.metric}</span>
                          <span className="text-cyan-400 font-bold">{project.subkpi}</span>
                        </div>
                      </div>

                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>


        {/* Section 5: "How We Work Together" (The Blueprint Timeline) */}
        <section id="process" className="space-y-12 sm:space-y-16 scroll-mt-24">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center space-y-4 max-w-3xl mx-auto px-2"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">The Collaboration Engine</span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tighter">Unified Delivery Blueprint</h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-light">Click on the stages below to see exactly how Rudra and Narayan run in alignment to support and scale your product.</p>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 items-start px-2 sm:px-0">
            
            {/* Left Blueprint timeline list buttons */}
            <div className="lg:col-span-5 space-y-3.5 sm:space-y-4">
              {process.map((step, idx) => {
                const active = activeStep === idx;
                
                return (
                  <div
                    key={idx}
                    onClick={() => setActiveStep(idx)}
                    className={`p-5 sm:p-6 rounded-2xl border transition-all duration-500 cursor-pointer flex gap-4 sm:gap-5 items-center relative overflow-hidden ${
                      active 
                        ? 'bg-gradient-to-r from-emerald-500/5 to-cyan-500/5 border-teal-500/20 shadow-[0_0_35px_rgba(20,184,166,0.03)]' 
                        : 'bg-white/[0.01] border-white/5 hover:border-white/10'
                    }`}
                  >
                    {active && (
                      <motion.div 
                        layoutId="activeTimelineGlow" 
                        className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-400 to-cyan-400" 
                      />
                    )}

                    <div className={`text-lg sm:text-xl font-black ${
                      active ? 'gradient-text-combined' : 'text-zinc-600'
                    }`}>
                      {step.step}
                    </div>
                    
                    <div className="text-left space-y-0.5">
                      <h4 className={`font-bold text-sm sm:text-base md:text-lg transition-colors duration-300 ${
                        active ? 'text-white' : 'text-zinc-400'
                      }`}>
                        {step.title}
                      </h4>
                      <p className="text-[10px] sm:text-xs text-zinc-500">Collaborative process stage</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Blueprint visual detail cards */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, x: 20, filter: 'blur(5px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, x: -20, filter: 'blur(5px)' }}
                  transition={springTransition}
                  className="glass-card p-6 sm:p-8 md:p-10 rounded-[2rem] border border-white/5 relative overflow-hidden space-y-6 sm:space-y-8"
                >
                  <div className="absolute top-0 right-0 w-56 h-56 rounded-full bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 filter blur-[80px] pointer-events-none" />
                  
                  {/* Step overview */}
                  <div className="space-y-2.5 sm:space-y-3 relative z-10">
                    <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-zinc-500">Active Blueprint Phase {process[activeStep].step}</span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                      {process[activeStep].title}
                    </h3>
                    <p className="text-zinc-400 leading-relaxed font-light text-sm sm:text-base">
                      {process[activeStep].description}
                    </p>
                  </div>

                  {/* Split Collaborative Roles Cards */}
                  <div className="grid sm:grid-cols-2 gap-5 sm:gap-6 relative z-10">
                    
                    {/* Rudra Role */}
                    <div className="p-5 sm:p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/10 space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="w-6.5 h-6.5 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 text-[10px] sm:text-xs font-bold font-sans">
                          R
                        </div>
                        <div>
                          <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-widest text-emerald-400">Rudra's Focus</span>
                          <div className="text-[10px] sm:text-xs font-bold text-white leading-tight">Audits & Content</div>
                        </div>
                      </div>
                      <p className="text-xs text-zinc-400 leading-relaxed font-light">
                        {process[activeStep].alexRole}
                      </p>
                    </div>

                    {/* Narayan Role */}
                    <div className="p-5 sm:p-6 rounded-2xl bg-cyan-950/20 border border-cyan-500/10 space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="w-6.5 h-6.5 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 text-[10px] sm:text-xs font-bold font-sans">
                          N
                        </div>
                        <div>
                          <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-widest text-cyan-400">Narayan's Focus</span>
                          <div className="text-[10px] sm:text-xs font-bold text-white leading-tight">Full Stack Logic</div>
                        </div>
                      </div>
                      <p className="text-xs text-zinc-400 leading-relaxed font-light">
                        {process[activeStep].jordanRole}
                      </p>
                    </div>

                  </div>

                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </section>


        {/* Section 6: Testimonials */}
        <section className="relative py-12 sm:py-16 scroll-mt-24 px-2 sm:px-0">
          <div className="absolute inset-0 bg-radial-gradient from-teal-500/5 to-transparent pointer-events-none filter blur-[80px]" />
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="glass-card p-8 sm:p-10 md:p-14 rounded-[2rem] sm:rounded-[2.5rem] border border-white/5 max-w-4xl mx-auto text-center space-y-6 sm:space-y-8 relative overflow-hidden"
          >
            <div className="absolute top-2 right-6 sm:right-10 text-7xl sm:text-9xl font-black text-white/[0.02] select-none pointer-events-none font-sans">“</div>
            <Zap size={30} className="mx-auto text-teal-400 opacity-80 sm:w-[36px] sm:h-[36px]" />
            
            <blockquote className="text-base sm:text-xl md:text-2xl font-light text-zinc-200 leading-relaxed italic">
              "{testimonials[0].quote}"
            </blockquote>
            
            <div className="space-y-0.5 sm:space-y-1">
              <cite className="not-italic font-bold text-sm sm:text-base text-white">{testimonials[0].author}</cite>
              <div className="text-[10px] sm:text-xs text-teal-400 uppercase tracking-widest font-semibold">{testimonials[0].company}</div>
            </div>
          </motion.div>
        </section>


        {/* Section 7: Immersive CTA & Ending */}
        <section id="contact" className="relative py-20 sm:py-28 rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden border border-white/5 scroll-mt-24 bg-[#0a0a0a]/60 backdrop-blur-xl px-4 sm:px-6">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/15 via-black to-cyan-950/15 pointer-events-none z-0" />
          <div className="absolute inset-0 bg-radial-gradient from-teal-500/10 to-transparent pointer-events-none z-0 filter blur-[90px]" />
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="relative z-10 text-center max-w-4xl mx-auto space-y-8 sm:space-y-10"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-teal-400">Launch Your Scale Engine</span>
            
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-extrabold tracking-tighter leading-[1.15] sm:leading-[1.1] px-1">
              Ready to grow your business or <br className="hidden md:block"/>
              build your next <span className="gradient-text-combined">digital product</span>?
            </h2>
            
            <p className="text-sm sm:text-base md:text-lg text-zinc-400 leading-relaxed font-light max-w-2xl mx-auto px-2">
              Skip the agency bloat. Work directly with a senior digital marketing partner and a senior full-stack developer.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 pt-3.5 max-w-md mx-auto sm:max-w-none">
              <a 
                href={`mailto:${contact.email}`} 
                className="px-8 py-4.5 sm:px-10 sm:py-5 rounded-full bg-white text-black font-semibold hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(255,255,255,0.15)] text-sm"
              >
                <Mail size={16} /> Email Us
              </a>
              
              <a 
                href={`https://wa.me/${contact.whatsapp}`} 
                target="_blank" 
                rel="noreferrer" 
                className="px-8 py-4.5 sm:px-10 sm:py-5 rounded-full bg-white/[0.04] border border-white/10 hover:border-[#25D366]/40 hover:bg-[#25D366]/10 text-white font-semibold transition-all flex items-center justify-center gap-2 text-sm"
              >
                <MessageCircle size={16} className="text-[#25D366]" /> WhatsApp
              </a>
            </div>

            <div className="pt-8 sm:pt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-[10px] sm:text-xs text-zinc-500 font-medium px-2">
              <span className="flex items-center gap-1.5">
                <Shield size={13} className="text-emerald-400 shrink-0" /> Direct communication
              </span>
              <span className="flex items-center gap-1.5">
                <Cpu size={13} className="text-cyan-400 shrink-0" /> Custom full-stack code
              </span>
              <span className="flex items-center gap-1.5">
                <Award size={13} className="text-teal-400 shrink-0" /> Audited visibility blueprints
              </span>
            </div>

          </motion.div>
        </section>

      </main>

      {/* Modern minimal glass footer */}
      <footer className="border-t border-white/5 py-10 sm:py-12 text-center text-[10px] sm:text-xs text-zinc-600 relative z-10 bg-[#050505]/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
          <p>&copy; {new Date().getFullYear()} Chandrabud Studio. Built for premium digital scaling.</p>
          <div className="flex gap-4 sm:gap-6 text-zinc-500 font-semibold uppercase tracking-widest text-[9px] sm:text-[10px]">
            <span>Direct Partner Engagement</span>
            <span>Zero Agency Markup</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;
