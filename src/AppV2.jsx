import React, { useEffect, useRef, useState } from 'react';
import {
  ChevronRight,
  Menu,
  X,
  Activity,
  Cpu,
  Globe,
  ArrowRight,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// ─── NOISE OVERLAY ────────────────────────────────────────────────────
const GlobalNoise = () => (
  <div className="pointer-events-none fixed inset-0 z-[100] h-full w-full opacity-[0.05] mix-blend-overlay">
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
      <filter id="noiseFilter">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noiseFilter)" />
    </svg>
  </div>
);

// ─── FEATURE CARD 1: Diagnostic Shuffler ─────────────────────────────
const DiagnosticShuffler = () => {
  const [items, setItems] = useState([
    'Hardware Abstraction Layer',
    'Real-time Fleet Telemetry',
    'Heterogeneous Node Sync',
    'Latency Optimized Pathing',
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setItems((prev) => {
        const next = [...prev];
        const last = next.pop();
        next.unshift(last);
        return next;
      });
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-48 w-full bg-[#F2F0E9] rounded-[2rem] border border-[#2E4036]/10 overflow-hidden flex items-center justify-center">
      <div className="relative w-full px-8">
        {items.map((item, i) => (
          <div
            key={item}
            className="absolute left-1/2 w-[85%] p-3 bg-white border border-[#2E4036]/5 shadow-sm rounded-xl text-center font-mono text-[10px] uppercase tracking-wider"
            style={{
              transform: `translate(-50%, ${(i - 1) * 35}px) scale(${1 - Math.abs(i - 1) * 0.1})`,
              opacity: i === 1 ? 1 : i === 0 || i === 2 ? 0.4 : 0,
              zIndex: 10 - i,
              transition: 'all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── FEATURE CARD 2: Telemetry Typewriter ────────────────────────────
const TelemetryTypewriter = () => {
  const fullText =
    'Scanning physical environment... Object detected: Autonomous Unit 07. Protocol engaged: Spatial Awareness Sync. Infrastructure latency: 2ms. World context verified.';
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setText((prev) => prev + fullText[index]);
        setIndex(index + 1);
      }, 30);
      return () => clearTimeout(timeout);
    } else {
      const reset = setTimeout(() => {
        setText('');
        setIndex(0);
      }, 3000);
      return () => clearTimeout(reset);
    }
  }, [index]);

  return (
    <div className="bg-[#1A1A1A] text-[#F2F0E9] p-5 rounded-[2.5rem] h-48 font-mono text-[11px] leading-relaxed flex flex-col justify-between border border-white/5">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-2 h-2 rounded-full bg-[#CC5833] animate-pulse" />
        <span className="text-[#CC5833] font-bold uppercase tracking-tighter">Live Physical Feed</span>
      </div>
      <div className="flex-1 opacity-80 overflow-hidden">
        {text}
        <span className="inline-block w-1.5 h-3 bg-[#CC5833] ml-1 animate-pulse" />
      </div>
    </div>
  );
};

// ─── FEATURE CARD 3: Protocol Scheduler ──────────────────────────────
const ProtocolScheduler = () => {
  return (
    <div className="bg-[#F2F0E9]/50 rounded-[2.5rem] h-48 border border-[#2E4036]/10 relative p-6 overflow-hidden group">
      <div className="grid grid-cols-7 gap-2 h-full">
        {Array(21)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className={`rounded-lg border border-[#2E4036]/5 transition-colors duration-500 ${
                i === 11 ? 'bg-[#2E4036]/20' : 'bg-white'
              }`}
            >
              {i === 11 && (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#CC5833]" />
                </div>
              )}
            </div>
          ))}
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-[2000ms] group-hover:scale-150">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className="text-[#CC5833] drop-shadow-md animate-bounce"
        >
          <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" fill="currentColor" />
        </svg>
      </div>
    </div>
  );
};

// ─── APP V2 ───────────────────────────────────────────────────────────
export default function AppV2() {
  const [scrolled, setScrolled] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });

    const ctx = gsap.context(() => {
      // Hero entrance
      gsap.timeline().from('.v2-hero-stagger', {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: 'power3.out',
      });

      // Feature cards
      gsap.from('.v2-feature-card', {
        scrollTrigger: { trigger: '.v2-features-grid', start: 'top 80%' },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
      });

      // Philosophy text
      gsap.from('.v2-phil-reveal', {
        scrollTrigger: { trigger: '.v2-philosophy-section', start: 'top 70%' },
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
      });

      // Protocol sticky stacking
      const cards = gsap.utils.toArray('.v2-protocol-step');
      cards.forEach((card, i) => {
        ScrollTrigger.create({
          trigger: card,
          start: 'top top',
          pin: true,
          pinSpacing: false,
          end: 'max',
        });

        if (i < cards.length - 1) {
          gsap.to(card, {
            scale: 0.9,
            filter: 'blur(10px)',
            opacity: 0.4,
            scrollTrigger: {
              trigger: cards[i + 1],
              start: 'top bottom',
              end: 'top top',
              scrub: true,
            },
          });
        }
      });
    }, containerRef);

    return () => {
      ctx.revert();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const protocolSteps = [
    {
      step: '01',
      title: 'Perceive',
      desc: 'Universal sensor abstraction maps the physical world into a structured data grid.',
      image:
        'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop',
    },
    {
      step: '02',
      title: 'Process',
      desc: 'Low-latency edge infrastructure computes spatial relationships in real-time.',
      image:
        'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop',
    },
    {
      step: '03',
      title: 'Propagate',
      desc: 'Validated world context is broadcasted to the entire fleet of autonomous agents.',
      image:
        'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop',
    },
  ];

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen bg-[#F2F0E9] text-[#1A1A1A] overflow-x-hidden"
      style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
    >
      <GlobalNoise />

      {/* NAVBAR */}
      <nav
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-[90] flex items-center justify-between px-6 py-3 rounded-full transition-all duration-500 ${
          scrolled
            ? 'w-[90%] md:w-[600px] bg-[#F2F0E9]/80 backdrop-blur-xl border border-[#2E4036]/10 shadow-lg text-[#2E4036]'
            : 'w-[95%] md:w-[1200px] bg-transparent text-white border border-transparent'
        }`}
      >
        <div className="font-bold text-xl tracking-tighter flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full animate-pulse ${scrolled ? 'bg-[#2E4036]' : 'bg-white'}`}
          />
          SpatialCore
        </div>

        <div className="hidden md:flex gap-8 text-sm font-medium">
          <a href="#features" className="hover:opacity-60 transition-opacity">
            Infrastructure
          </a>
          <a href="#protocol" className="hover:opacity-60 transition-opacity">
            Protocol
          </a>
          <a href="#about" className="hover:opacity-60 transition-opacity">
            Manifesto
          </a>
        </div>

        <button className="bg-[#CC5833] text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:scale-[1.03] active:scale-[0.98] transition-all overflow-hidden relative group">
          <span className="relative z-10">Find out more</span>
          <div className="absolute inset-0 bg-[#2E4036] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
        </button>
      </nav>

      {/* HERO */}
      <section className="relative h-[100dvh] w-full flex items-end p-8 md:p-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1542644265-5b03bc894565?q=80&w=3000&auto=format&fit=crop"
            alt="Forest canopy"
            className="h-full w-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/40 to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-5xl text-white">
          <h2
            className="v2-hero-stagger font-bold text-2xl md:text-4xl tracking-tight mb-2 opacity-80"
            style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
          >
            Integration is the
          </h2>
          <h1
            className="v2-hero-stagger italic text-7xl md:text-[11rem] leading-[0.85] mb-10 text-[#F2F0E9]"
            style={{ fontFamily: '"Cormorant Garamond", serif' }}
          >
            Foundation.
          </h1>
          <div className="v2-hero-stagger flex flex-col md:flex-row items-start md:items-center gap-8">
            <p className="max-w-md text-lg md:text-xl font-light leading-relaxed opacity-70">
              The infrastructure layer powering the world's transition into physical AI. Every
              autonomous system, connected.
            </p>
            <button
              className="bg-[#CC5833] text-white p-6 rounded-full hover:scale-110 transition-transform duration-500 group shadow-2xl"
              style={{ transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
            >
              <ChevronRight size={32} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-32 px-8 md:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 space-y-4">
            <span
              className="text-[10px] uppercase tracking-[0.3em] text-[#CC5833] font-bold"
              style={{ fontFamily: '"IBM Plex Mono", monospace' }}
            >
              System Capabilities
            </span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-[#2E4036] max-w-2xl">
              Powering perception across the physical frontier.
            </h2>
          </div>

          <div className="v2-features-grid grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Interoperability',
                desc: 'Seamless abstraction across all autonomous systems, regardless of hardware manufacturer or stack.',
                Card: DiagnosticShuffler,
              },
              {
                title: 'Physical Awareness',
                desc: 'Real-time telemetry and spatial mapping provides AI agents with full environmental consciousness.',
                Card: TelemetryTypewriter,
              },
              {
                title: 'World Context',
                desc: 'The real world becomes a dynamic dataset. SpatialCore turns raw physics into actionable machine context.',
                Card: ProtocolScheduler,
              },
            ].map(({ title, desc, Card }) => (
              <div
                key={title}
                className="v2-feature-card bg-white p-10 rounded-[3rem] shadow-sm border border-[#2E4036]/5 flex flex-col justify-between h-[500px] hover:shadow-xl transition-shadow duration-500"
              >
                <div>
                  <h3 className="text-2xl font-bold mb-4">{title}</h3>
                  <p className="opacity-60 text-sm leading-relaxed mb-8">{desc}</p>
                </div>
                <Card />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section
        id="about"
        className="v2-philosophy-section py-40 bg-[#1A1A1A] text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 z-0 opacity-20 scale-110">
          <img
            src="https://images.unsplash.com/photo-1618042164219-62c820f10723?q=80&w=3000&auto=format&fit=crop"
            alt="Organic texture"
            className="w-full h-full object-cover grayscale"
          />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-8 text-center">
          <p className="v2-phil-reveal text-lg md:text-2xl opacity-50 mb-12">
            Most infrastructure focuses on:{' '}
            <span className="text-white opacity-100">the digital representation of data.</span>
          </p>
          <h2
            className="v2-phil-reveal italic text-5xl md:text-8xl leading-none"
            style={{ fontFamily: '"Cormorant Garamond", serif' }}
          >
            We focus on:{' '}
            <span className="text-[#CC5833]">Physical Intelligence.</span>
          </h2>
          <div className="v2-phil-reveal mt-16 flex justify-center">
            <div className="h-px w-24 bg-white/20" />
          </div>
        </div>
      </section>

      {/* PROTOCOL */}
      <section id="protocol">
        {protocolSteps.map((item, idx) => (
          <div
            key={idx}
            className="v2-protocol-step h-[100dvh] w-full flex items-center justify-center bg-[#F2F0E9] px-8"
          >
            <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
              <div className="order-2 md:order-1">
                <span
                  className="text-[#CC5833] font-bold text-lg mb-4 block"
                  style={{ fontFamily: '"IBM Plex Mono", monospace' }}
                >
                  STEP {item.step}
                </span>
                <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 text-[#2E4036]">
                  {item.title}
                </h2>
                <p className="text-xl md:text-2xl opacity-60 leading-relaxed font-light">
                  {item.desc}
                </p>
              </div>

              <div className="order-1 md:order-2 aspect-square rounded-[3rem] overflow-hidden shadow-2xl border border-[#2E4036]/10 relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-[#2E4036]/20 mix-blend-multiply" />

                {idx === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-48 h-48 border-2 border-white/50 rounded-full animate-[spin_10s_linear_infinite]" />
                    <div className="absolute w-32 h-32 border-2 border-[#CC5833]/50 rounded-full animate-[spin_6s_linear_infinite_reverse]" />
                  </div>
                )}
                {idx === 1 && (
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="w-full h-[2px] bg-[#CC5833]/60 absolute animate-[v2scan_3s_linear_infinite]" />
                  </div>
                )}
                {idx === 2 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-[#CC5833] rounded-full animate-ping opacity-50" />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1A1A1A] text-white rounded-t-[4rem] px-8 pt-24 pb-12 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
            <div className="md:col-span-2">
              <h3 className="text-4xl font-bold tracking-tighter mb-6">SpatialCore</h3>
              <p className="opacity-40 max-w-sm mb-12">
                The world is now context for AI. We build the wires that make it so.
              </p>
              <div className="flex items-center gap-4 bg-white/5 w-fit px-6 py-3 rounded-full border border-white/10">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span
                  className="text-xs uppercase tracking-widest opacity-60"
                  style={{ fontFamily: '"IBM Plex Mono", monospace' }}
                >
                  System Operational // Nodes: 12,402
                </span>
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="font-bold text-sm uppercase tracking-widest text-[#CC5833]">
                Infrastructure
              </h4>
              <ul className="space-y-4 text-sm opacity-50">
                {['Core Nodes', 'Peripheral Sync', 'Latency Grid'].map((l) => (
                  <li key={l}>
                    <a href="#" className="hover:text-white hover:opacity-100 transition-colors">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="font-bold text-sm uppercase tracking-widest text-[#CC5833]">
                Company
              </h4>
              <ul className="space-y-4 text-sm opacity-50">
                {['Documentation', 'Changelog', 'Open Positions'].map((l) => (
                  <li key={l}>
                    <a href="#" className="hover:text-white hover:opacity-100 transition-colors">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/10 text-[10px] uppercase tracking-widest opacity-30">
            <span>© 2026 SpatialCore Technologies Inc.</span>
            <div className="flex gap-8 mt-4 md:mt-0">
              <a href="#">Privacy Protocol</a>
              <a href="#">Security Archive</a>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes v2scan {
          0%   { top: 0%;   opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
}
