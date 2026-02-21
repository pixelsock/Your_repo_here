import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Globe, Activity, Wifi } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

// ─── CARD 1: Diagnostic Shuffler ─────────────────────────────────────
function ShufflerCard() {
  const initialItems = [
    { label: 'Drone Networks', value: '4,291 nodes synced', glyph: '◎' },
    { label: 'Robotic Fleets', value: '812 units online', glyph: '◈' },
    { label: 'Sensor Meshes', value: '19.2M signals/sec', glyph: '◇' },
  ]
  const [stack, setStack] = useState(initialItems)

  useEffect(() => {
    const interval = setInterval(() => {
      setStack((prev) => {
        const next = [...prev]
        next.unshift(next.pop())
        return next
      })
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-[#F2F0E9] rounded-[2rem] p-6 border border-[#2E4036]/10 shadow-sm h-full flex flex-col">
      <div className="flex items-center gap-2 mb-3">
        <Globe size={13} className="text-[#CC5833]" />
        <span className="font-mono text-[10px] text-[#1A1A1A]/40 uppercase tracking-widest">
          System Interop
        </span>
      </div>
      <h3 className="font-sans font-bold text-[#1A1A1A] text-xl mb-2">Universal Connectivity</h3>
      <p className="font-sans text-[#1A1A1A]/50 text-sm mb-8 leading-relaxed">
        Interoperability across all autonomous systems — unified under a single infrastructure
        layer.
      </p>

      {/* Stacking cards */}
      <div className="relative flex-1" style={{ minHeight: '176px' }}>
        {stack.map((item, i) => (
          <div
            key={item.label}
            className="absolute left-0 right-0 bg-white rounded-2xl px-4 py-3.5 border border-[#2E4036]/10 flex items-center justify-between"
            style={{
              top: `${i * 54}px`,
              zIndex: stack.length - i,
              transform: `scale(${1 - i * 0.025})`,
              opacity: 1 - i * 0.28,
              transition: 'all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            <div className="flex items-center gap-3">
              <span className="font-mono text-[#CC5833] text-xs">{item.glyph}</span>
              <span className="font-sans font-semibold text-sm text-[#1A1A1A]">{item.label}</span>
            </div>
            <span className="font-mono text-[10px] text-[#2E4036] bg-[#2E4036]/10 px-2.5 py-1 rounded-full">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── CARD 2: Telemetry Typewriter ─────────────────────────────────────
function TypewriterCard() {
  const MESSAGES = [
    'Spatial context: initialized',
    'LiDAR stream: 2.4M pts/frame ↑',
    'Camera array: 8 feeds active',
    'Object classification: 99.7%',
    'Environment map: updating...',
    'Depth fusion: synchronized',
    'Physical layer: online ✓',
    'Context packaged for AI ↗',
  ]
  const [displayed, setDisplayed] = useState('')
  const [msgIdx, setMsgIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = MESSAGES[msgIdx]
    let timeout

    if (!deleting) {
      if (charIdx < current.length) {
        timeout = setTimeout(() => {
          setCharIdx((c) => c + 1)
          setDisplayed(current.slice(0, charIdx + 1))
        }, 38)
      } else {
        timeout = setTimeout(() => setDeleting(true), 2000)
      }
    } else {
      if (charIdx > 0) {
        timeout = setTimeout(() => {
          setCharIdx((c) => c - 1)
          setDisplayed(current.slice(0, charIdx - 1))
        }, 18)
      } else {
        setDeleting(false)
        setMsgIdx((i) => (i + 1) % MESSAGES.length)
      }
    }

    return () => clearTimeout(timeout)
  }, [charIdx, deleting, msgIdx])

  return (
    <div className="bg-[#F2F0E9] rounded-[2rem] p-6 border border-[#2E4036]/10 shadow-sm h-full flex flex-col">
      <div className="flex items-center gap-2 mb-3">
        <span
          className="w-2 h-2 rounded-full bg-[#CC5833]"
          style={{ animation: 'pulseDot 1.8s ease-in-out infinite' }}
        />
        <span className="font-mono text-[10px] text-[#1A1A1A]/40 uppercase tracking-widest">
          Live Feed
        </span>
      </div>
      <h3 className="font-sans font-bold text-[#1A1A1A] text-xl mb-2">Physical Awareness</h3>
      <p className="font-sans text-[#1A1A1A]/50 text-sm mb-6 leading-relaxed">
        Full physical awareness for AI — every sensor, signal, and spatial dimension unified in
        real time.
      </p>

      {/* Terminal */}
      <div className="flex-1 bg-[#1A1A1A] rounded-2xl p-5 font-mono text-sm min-h-[168px] flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span
              className="w-1.5 h-1.5 rounded-full bg-[#CC5833]"
              style={{ animation: 'pulseDot 1.5s ease-in-out infinite' }}
            />
            <span className="text-[#F2F0E9]/25 text-[10px] uppercase tracking-widest">
              spatialcore.stream
            </span>
          </div>
          <div className="text-[#F2F0E9]/80 leading-relaxed min-h-[2rem]">
            <span>{displayed}</span>
            <span
              className="inline-block w-[2px] h-[1.1em] bg-[#CC5833] ml-0.5 align-middle"
              style={{ animation: 'blink 1s step-end infinite' }}
            />
          </div>
        </div>

        {/* Sensor count badges */}
        <div className="grid grid-cols-3 gap-2 mt-5">
          {[
            ['Vision', '8'],
            ['LiDAR', '1'],
            ['IMU', '24'],
          ].map(([label, val]) => (
            <div key={label} className="bg-white/5 rounded-xl px-2 py-2 text-center">
              <div className="font-mono text-[#CC5833] text-base font-medium">{val}</div>
              <div className="font-mono text-[#F2F0E9]/25 text-[9px] uppercase tracking-wider mt-0.5">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── CARD 3: Cursor Protocol Scheduler ───────────────────────────────
function SchedulerCard() {
  const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
  const [activeDay, setActiveDay] = useState(null)
  const [cursorDay, setCursorDay] = useState(null)
  const [phase, setPhase] = useState('idle') // idle | moving | clicking | syncing
  const [synced, setSynced] = useState(false)

  useEffect(() => {
    let mounted = true

    const run = () => {
      if (!mounted) return
      const target = Math.floor(Math.random() * 5) + 1 // Mon-Fri

      setPhase('moving')
      setCursorDay(target)

      setTimeout(() => {
        if (!mounted) return
        setPhase('clicking')
        setActiveDay(target)

        setTimeout(() => {
          if (!mounted) return
          setPhase('syncing')
          setSynced(true)

          setTimeout(() => {
            if (!mounted) return
            setSynced(false)
            setActiveDay(null)
            setCursorDay(null)
            setPhase('idle')
            setTimeout(() => mounted && run(), 900)
          }, 1600)
        }, 500)
      }, 1300)
    }

    const init = setTimeout(run, 900)
    return () => {
      mounted = false
      clearTimeout(init)
    }
  }, [])

  const phaseLabel = {
    idle: '— Standby',
    moving: '◌ Scanning',
    clicking: '⬤ Activating',
    syncing: '▲ Syncing',
  }[phase]

  return (
    <div className="bg-[#F2F0E9] rounded-[2rem] p-6 border border-[#2E4036]/10 shadow-sm h-full flex flex-col">
      <div className="flex items-center gap-2 mb-3">
        <Activity size={13} className="text-[#CC5833]" />
        <span className="font-mono text-[10px] text-[#1A1A1A]/40 uppercase tracking-widest">
          Context Engine
        </span>
      </div>
      <h3 className="font-sans font-bold text-[#1A1A1A] text-xl mb-2">Real-World Context</h3>
      <p className="font-sans text-[#1A1A1A]/50 text-sm mb-6 leading-relaxed">
        The real world is now context for AI — temporal, spatial, and environmental data, always
        in sync.
      </p>

      <div className="flex-1 flex flex-col gap-3">
        {/* Day grid */}
        <div className="flex gap-1.5">
          {DAYS.map((d, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
              <span className="font-mono text-[9px] text-[#1A1A1A]/30 uppercase">{d}</span>
              <div
                className="w-full rounded-xl border flex items-center justify-center transition-all duration-200"
                style={{
                  height: '36px',
                  background: activeDay === i ? '#CC5833' : 'white',
                  borderColor:
                    cursorDay === i && phase === 'moving'
                      ? 'rgba(204,88,51,0.45)'
                      : activeDay === i
                      ? '#CC5833'
                      : 'rgba(46,64,54,0.12)',
                  transform:
                    phase === 'clicking' && activeDay === i ? 'scale(0.91)' : 'scale(1)',
                  boxShadow:
                    cursorDay === i && phase === 'moving'
                      ? '0 0 0 3px rgba(204,88,51,0.18)'
                      : 'none',
                }}
              >
                {activeDay === i && (
                  <div className="w-1.5 h-1.5 rounded-full bg-[#F2F0E9]" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Status row */}
        <div className="bg-white rounded-xl px-3.5 py-2.5 flex items-center justify-between border border-[#2E4036]/10">
          <span className="font-sans text-xs text-[#1A1A1A]/45">Context window</span>
          <span className="font-mono text-[10px] text-[#CC5833]">
            {activeDay !== null ? `Day ${activeDay} active` : 'Scanning...'}
          </span>
        </div>

        {/* Sync button */}
        <button
          className="w-full py-3 rounded-xl font-sans text-xs font-semibold border transition-all duration-300"
          style={{
            background: synced ? '#2E4036' : 'white',
            color: synced ? '#F2F0E9' : 'rgba(26,26,26,0.4)',
            borderColor: synced ? '#2E4036' : 'rgba(46,64,54,0.12)',
            transform: synced ? 'scale(0.98)' : 'scale(1)',
          }}
        >
          {synced ? 'Context synced ✓' : 'Sync to AI context'}
        </button>

        {/* Phase indicator */}
        <div className="font-mono text-[9px] text-[#1A1A1A]/25 text-center uppercase tracking-widest">
          {phaseLabel}
        </div>
      </div>
    </div>
  )
}

// ─── FEATURES SECTION ─────────────────────────────────────────────────
export default function Features() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.feat-header', {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      })
      gsap.from('.feat-card', {
        y: 70,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: { trigger: '.feat-grid', start: 'top 72%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="bg-[#F2F0E9] py-28 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="feat-header mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="font-mono text-xs text-[#CC5833] uppercase tracking-widest">
              Platform
            </span>
            <h2 className="font-sans font-extrabold text-[#1A1A1A] text-4xl md:text-5xl mt-3 leading-tight max-w-sm">
              Built for the physical edge.
            </h2>
          </div>
          <p className="font-sans text-[#1A1A1A]/45 text-sm max-w-xs leading-relaxed">
            Three core pillars. One unified infrastructure for the autonomous world.
          </p>
        </div>

        <div className="feat-grid grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
          <div className="feat-card">
            <ShufflerCard />
          </div>
          <div className="feat-card">
            <TypewriterCard />
          </div>
          <div className="feat-card">
            <SchedulerCard />
          </div>
        </div>
      </div>
    </section>
  )
}
