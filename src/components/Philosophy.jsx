import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { IMAGES } from '../tokens'

gsap.registerPlugin(ScrollTrigger)

export default function Philosophy() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.phil-neutral', {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
      })
      gsap.from('.phil-word', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: { trigger: '.phil-main', start: 'top 68%' },
      })
      gsap.from('.phil-footer', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.phil-main', start: 'top 50%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const mainWords = ['We', 'build', 'for', 'the']

  return (
    <section
      ref={sectionRef}
      className="relative py-36 px-6 md:px-16 overflow-hidden"
      style={{ background: '#1A1A1A' }}
    >
      {/* Parallax organic texture */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${IMAGES.philosophy})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.07,
        }}
      />

      {/* Subtle vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 30% 50%, transparent 40%, rgba(26,26,26,0.8) 100%)',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Contrast statement — neutral */}
        <p className="phil-neutral font-sans text-[#F2F0E9]/28 text-base md:text-lg mb-14 max-w-xl leading-relaxed">
          Most AI infrastructure focuses on:{' '}
          <span className="text-[#F2F0E9]/48">
            digital environments and synthetic data pipelines.
          </span>
        </p>

        {/* Bold statement */}
        <div className="phil-main">
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            {mainWords.map((w, i) => (
              <span
                key={i}
                className="phil-word font-sans font-extrabold text-[#F2F0E9] leading-tight"
                style={{ fontSize: 'clamp(2.6rem, 6.5vw, 5.5rem)' }}
              >
                {w}
              </span>
            ))}
            <span
              className="phil-word font-serif italic font-light leading-none"
              style={{
                fontSize: 'clamp(3.8rem, 9vw, 8.5rem)',
                color: '#CC5833',
              }}
            >
              real world.
            </span>
          </div>

          <p className="phil-footer font-sans text-[#F2F0E9]/30 text-sm mt-12 max-w-sm leading-relaxed">
            Physical intelligence requires physical infrastructure — sensors, space, time, and
            causality. Not just tokens and tensors.
          </p>
        </div>
      </div>
    </section>
  )
}
