import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ─── SVG ANIMATION 1: Rotating orbital helix motif ───────────────────
function HelixAnim() {
  return (
    <svg
      viewBox="0 0 240 240"
      className="w-full h-full"
      style={{ animation: 'slowRotate 28s linear infinite' }}
    >
      {[80, 62, 46, 30, 16].map((rx, i) => (
        <ellipse
          key={i}
          cx="120"
          cy="120"
          rx={rx}
          ry={rx * 0.32}
          fill="none"
          stroke="#CC5833"
          strokeWidth={1.8 - i * 0.2}
          opacity={0.75 - i * 0.08}
          transform={`rotate(${i * 36}, 120, 120)`}
        />
      ))}
      <circle cx="120" cy="120" r="5" fill="#CC5833" opacity="0.9" />
      {[0, 72, 144, 216, 288].map((angle, i) => {
        const rad = (angle * Math.PI) / 180
        const x = 120 + 80 * Math.cos(rad)
        const y = 120 + 26 * Math.sin(rad)
        return <circle key={i} cx={x} cy={y} r="3.5" fill="#F2F0E9" opacity="0.45" />
      })}
      {/* Static outer ring */}
      <circle
        cx="120"
        cy="120"
        r="108"
        fill="none"
        stroke="#F2F0E9"
        strokeWidth="0.5"
        opacity="0.08"
        strokeDasharray="4 8"
      />
    </svg>
  )
}

// ─── SVG ANIMATION 2: Scanning laser line over dot grid ──────────────
function LaserGridAnim() {
  const [col, setCol] = useState(0)
  const ROWS = 7
  const COLS = 9

  useEffect(() => {
    const interval = setInterval(() => setCol((c) => (c + 1) % COLS), 260)
    return () => clearInterval(interval)
  }, [])

  return (
    <svg viewBox="0 0 240 220" className="w-full h-full">
      {Array.from({ length: ROWS }).map((_, r) =>
        Array.from({ length: COLS }).map((_, c) => (
          <rect
            key={`${r}-${c}`}
            x={c * 26 + 3}
            y={r * 28 + 6}
            width="18"
            height="18"
            rx="4"
            fill={c === col ? '#CC5833' : '#2E4036'}
            opacity={c === col ? 0.95 : 0.2}
            style={{ transition: 'fill 0.22s ease, opacity 0.22s ease' }}
          />
        ))
      )}
      {/* Laser line */}
      <line
        x1={col * 26 + 12}
        y1="0"
        x2={col * 26 + 12}
        y2="220"
        stroke="#CC5833"
        strokeWidth="1.5"
        opacity="0.3"
        style={{ transition: 'x1 0.26s ease, x2 0.26s ease' }}
      />
    </svg>
  )
}

// ─── SVG ANIMATION 3: Pulsing EKG waveform ───────────────────────────
function WaveformAnim() {
  const pathRef = useRef(null)

  useEffect(() => {
    if (!pathRef.current) return
    const length = pathRef.current.getTotalLength?.() ?? 480
    gsap.set(pathRef.current, { strokeDasharray: length, strokeDashoffset: length })
    gsap.to(pathRef.current, {
      strokeDashoffset: 0,
      duration: 2.4,
      ease: 'power2.inOut',
      repeat: -1,
      yoyo: true,
    })
  }, [])

  return (
    <svg viewBox="0 0 240 220" className="w-full h-full">
      {/* Grid lines */}
      {[55, 110, 165].map((y) => (
        <line key={y} x1="0" y1={y} x2="240" y2={y} stroke="#F2F0E9" strokeWidth="0.4" opacity="0.07" />
      ))}
      {[60, 120, 180].map((x) => (
        <line key={x} x1={x} y1="0" x2={x} y2="220" stroke="#F2F0E9" strokeWidth="0.4" opacity="0.07" />
      ))}
      {/* EKG path */}
      <path
        ref={pathRef}
        d="M 0 110 L 18 110 L 28 110 L 38 88 L 48 132 L 56 50 L 66 168 L 76 78 L 86 132 L 96 110 L 116 110 L 126 94 L 136 126 L 142 54 L 150 158 L 160 110 L 180 110 L 240 110"
        fill="none"
        stroke="#CC5833"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Baseline */}
      <line x1="0" y1="110" x2="240" y2="110" stroke="#F2F0E9" strokeWidth="0.6" opacity="0.12" />
    </svg>
  )
}

// ─── STEP DATA ────────────────────────────────────────────────────────
const STEPS = [
  {
    num: '01',
    label: 'INGEST',
    title: 'Ingest',
    desc: 'Capture spatial and sensor data from every environment — LiDAR, vision, telemetry, and proprioceptive streams unified under one open protocol.',
    bg: '#2E4036',
    Anim: HelixAnim,
  },
  {
    num: '02',
    label: 'SYNTHESIZE',
    title: 'Synthesize',
    desc: "Fuse real-world context into AI-ready intelligence. SpatialCore normalizes, timestamps, and packages physical data for immediate model consumption.",
    bg: '#1A1A1A',
    Anim: LaserGridAnim,
  },
  {
    num: '03',
    label: 'DEPLOY',
    title: 'Deploy',
    desc: 'Deliver physical awareness at infrastructure scale. Sub-10ms latency. Edge-native. Every autonomous system, now context-aware.',
    bg: '#212B24',
    Anim: WaveformAnim,
  },
]

// ─── PROTOCOL SECTION ─────────────────────────────────────────────────
export default function Protocol() {
  const cardsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scale-back effect as next card covers current card
      cardsRef.current.forEach((card, i) => {
        if (!card || i === cardsRef.current.length - 1) return
        const nextCard = cardsRef.current[i + 1]
        if (!nextCard) return

        ScrollTrigger.create({
          trigger: nextCard,
          start: 'top bottom',
          end: 'top top',
          scrub: 0.6,
          onUpdate: (self) => {
            gsap.set(card, {
              scale: 1 - self.progress * 0.07,
              filter: `blur(${self.progress * 18}px)`,
              opacity: 1 - self.progress * 0.48,
            })
          },
        })
      })

      // Entrance animation for each card's content
      cardsRef.current.forEach((card) => {
        if (!card) return
        gsap.from(card.querySelectorAll('.step-content > *'), {
          y: 45,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: { trigger: card, start: 'top 72%' },
        })
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section>
      {/* Section header */}
      <div className="bg-[#F2F0E9] py-20 px-6 md:px-16 text-center">
        <span className="font-mono text-xs text-[#CC5833] uppercase tracking-widest">
          How it works
        </span>
        <h2 className="font-sans font-extrabold text-[#1A1A1A] text-4xl md:text-5xl mt-3">
          The SpatialCore Protocol
        </h2>
      </div>

      {STEPS.map((step, i) => (
        <div
          key={step.num}
          ref={(el) => (cardsRef.current[i] = el)}
          className="protocol-card sticky top-0 min-h-screen flex items-center px-6 md:px-16 lg:px-24"
          style={{ background: step.bg, zIndex: i + 1 }}
        >
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center py-24">
            {/* Text */}
            <div className="step-content">
              <div className="flex items-center gap-4 mb-10">
                <span className="font-mono text-[#CC5833]/70 text-sm">{step.num}</span>
                <span className="font-mono text-[#F2F0E9]/18 text-[10px] uppercase tracking-[0.3em]">
                  {step.label}
                </span>
              </div>
              <h3
                className="font-serif italic font-light text-[#F2F0E9] mb-8 leading-none"
                style={{ fontSize: 'clamp(3.5rem, 7.5vw, 7.5rem)' }}
              >
                {step.title}
              </h3>
              <p className="font-sans text-[#F2F0E9]/50 text-base md:text-lg leading-relaxed max-w-md">
                {step.desc}
              </p>
            </div>

            {/* Animation */}
            <div className="w-full max-w-xs md:max-w-sm mx-auto aspect-square" style={{ opacity: 0.82 }}>
              <step.Anim />
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}
