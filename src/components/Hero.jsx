import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ArrowRight } from 'lucide-react'
import { IMAGES } from '../tokens'

export default function Hero() {
  const heroRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 })
      tl.from('.h-eyebrow', { y: 24, opacity: 0, duration: 1, ease: 'power3.out' })
        .from('.h-word-1', { y: 60, opacity: 0, duration: 1.3, ease: 'power3.out' }, '-=0.7')
        .from('.h-word-2', { y: 60, opacity: 0, duration: 1.3, ease: 'power3.out' }, '-=0.95')
        .from('.h-sub', { y: 24, opacity: 0, duration: 0.9, ease: 'power3.out' }, '-=0.7')
        .from('.h-cta', { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
        .from('.h-scroll', { opacity: 0, duration: 0.6, ease: 'power2.out' }, '-=0.2')
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative w-full min-h-[100dvh] flex items-end pb-20 md:pb-28 px-6 md:px-16 lg:px-24"
      style={{
        backgroundImage: `url(${IMAGES.hero})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center 35%',
      }}
    >
      {/* Layered gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, #1A1A1A 0%, rgba(46,64,54,0.92) 30%, rgba(46,64,54,0.45) 60%, rgba(46,64,54,0.1) 100%)',
        }}
      />

      {/* Vignette edges */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 50%, rgba(26,26,26,0.5) 100%)',
        }}
      />

      {/* Content — bottom-left third */}
      <div className="relative z-10 max-w-5xl">
        <p className="h-eyebrow font-sans font-semibold text-[#F2F0E9]/45 text-xs md:text-sm uppercase tracking-[0.25em] mb-5">
          Infrastructure is the
        </p>

        <h1 className="leading-none mb-10 overflow-hidden">
          <span
            className="h-word-1 block font-sans font-extrabold text-[#F2F0E9] tracking-tight"
            style={{ fontSize: 'clamp(3.8rem, 10vw, 9.5rem)', lineHeight: 0.95 }}
          >
            Physical
          </span>
          <span
            className="h-word-2 block font-serif italic font-light"
            style={{
              fontSize: 'clamp(4.5rem, 12vw, 11.5rem)',
              lineHeight: 0.9,
              color: '#CC5833',
            }}
          >
            Layer.
          </span>
        </h1>

        <p className="h-sub font-sans text-[#F2F0E9]/55 text-sm md:text-base max-w-md md:max-w-lg mb-10 leading-relaxed">
          SpatialCore is the infrastructure layer powering the world's transition into physical AI&nbsp;—
          interoperability, awareness, and real-world context at scale.
        </p>

        <button
          className="h-cta inline-flex items-center gap-3 bg-[#CC5833] text-[#F2F0E9] font-sans font-semibold px-8 py-4 rounded-full overflow-hidden relative group text-sm md:text-base"
          style={{ transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <span className="absolute inset-0 bg-[#1A1A1A] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300 ease-out" />
          <span className="relative">Find out more</span>
          <ArrowRight size={16} className="relative" />
        </button>
      </div>

      {/* Scroll cue */}
      <div className="h-scroll absolute bottom-8 right-8 md:right-16 flex flex-col items-center gap-2 opacity-30">
        <div
          className="w-px h-12 bg-[#F2F0E9]"
          style={{ animation: 'laserSweep 2s ease-in-out infinite' }}
        />
        <span className="font-mono text-[9px] text-[#F2F0E9] uppercase tracking-widest rotate-90 origin-center mt-2">
          Scroll
        </span>
      </div>
    </section>
  )
}
