import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ArrowRight, Menu, X } from 'lucide-react'

const LINKS = ['Platform', 'Use Cases', 'Developers', 'Company']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        y: -30,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.6,
      })
    })
    return () => ctx.revert()
  }, [])

  const btnStyle = {
    transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  }

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-5 left-1/2 z-50 -translate-x-1/2 flex items-center gap-6 md:gap-8 px-5 md:px-6 py-3 rounded-full transition-all duration-500 ${
          scrolled
            ? 'bg-[#F2F0E9]/75 backdrop-blur-xl border border-[#2E4036]/15 shadow-xl shadow-black/10'
            : 'border border-white/10'
        }`}
      >
        {/* Logo */}
        <span
          className={`font-sans font-bold text-sm tracking-tight transition-colors duration-500 ${
            scrolled ? 'text-[#1A1A1A]' : 'text-[#F2F0E9]'
          }`}
        >
          SpatialCore
        </span>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-5">
          {LINKS.map((l) => (
            <a
              key={l}
              href="#"
              className={`font-sans text-sm transition-all duration-200 hover:-translate-y-px ${
                scrolled
                  ? 'text-[#1A1A1A]/55 hover:text-[#1A1A1A]'
                  : 'text-[#F2F0E9]/55 hover:text-[#F2F0E9]'
              }`}
            >
              {l}
            </a>
          ))}
        </div>

        {/* CTA */}
        <button
          className="hidden md:inline-flex items-center gap-2 bg-[#CC5833] text-[#F2F0E9] text-xs font-sans font-semibold px-5 py-2.5 rounded-full overflow-hidden relative group"
          style={btnStyle}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <span className="absolute inset-0 bg-[#1A1A1A] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300 ease-out rounded-full" />
          <span className="relative">Find out more</span>
          <ArrowRight size={12} className="relative" />
        </button>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className={`md:hidden transition-colors ${
            scrolled ? 'text-[#1A1A1A]' : 'text-[#F2F0E9]'
          }`}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {/* Mobile overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#1A1A1A]/96 backdrop-blur-xl flex flex-col items-center justify-center gap-10">
          {LINKS.map((l) => (
            <a
              key={l}
              href="#"
              onClick={() => setMenuOpen(false)}
              className="font-sans font-bold text-[#F2F0E9] text-3xl hover:text-[#CC5833] transition-colors"
            >
              {l}
            </a>
          ))}
          <button className="mt-4 bg-[#CC5833] text-[#F2F0E9] font-sans font-semibold px-10 py-4 rounded-full text-base">
            Find out more
          </button>
        </div>
      )}
    </>
  )
}
