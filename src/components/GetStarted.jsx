import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, Check } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const TIERS = [
  {
    name: 'Essential',
    badge: '◇ Starter',
    tagline: 'For teams deploying their first autonomous systems.',
    price: 'Get in touch',
    features: [
      'Up to 500K sensor events / day',
      '5 system integrations',
      'Standard SpatialCore API',
      'Documentation + community',
      '99.5% uptime SLA',
    ],
    highlight: false,
  },
  {
    name: 'Performance',
    badge: '★ Recommended',
    tagline: 'For operations demanding real-time physical intelligence.',
    price: 'Get in touch',
    features: [
      'Unlimited event volume',
      'Unlimited integrations',
      'Priority API + edge nodes',
      'Dedicated solutions engineer',
      '99.95% uptime SLA',
    ],
    highlight: true,
  },
  {
    name: 'Enterprise',
    badge: '◈ Enterprise',
    tagline: 'For infrastructure-level deployments across global systems.',
    price: 'Custom',
    features: [
      'On-premise or hybrid cloud',
      'Custom SLA + uptime guarantees',
      'White-glove onboarding',
      'Sovereign data residency',
      'Dedicated engineering support',
    ],
    highlight: false,
  },
]

export default function GetStarted() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.gs-header', {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
      })
      gsap.from('.gs-card', {
        y: 65,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: { trigger: '.gs-grid', start: 'top 72%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="bg-[#F2F0E9] py-28 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="gs-header text-center mb-16">
          <span className="font-mono text-xs text-[#CC5833] uppercase tracking-widest">
            Access
          </span>
          <h2 className="font-sans font-extrabold text-[#1A1A1A] text-4xl md:text-5xl mt-3 mb-4">
            Infrastructure, at your scale.
          </h2>
          <p className="font-sans text-[#1A1A1A]/45 text-sm md:text-base max-w-sm mx-auto leading-relaxed">
            From early-stage deployments to global infrastructure. SpatialCore scales with you.
          </p>
        </div>

        {/* Tier grid */}
        <div className="gs-grid grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`gs-card rounded-[2rem] p-8 flex flex-col ${
                tier.highlight ? 'shadow-2xl shadow-[#2E4036]/25' : 'border border-[#2E4036]/10'
              }`}
              style={{
                background: tier.highlight ? '#2E4036' : 'white',
                transform: tier.highlight ? 'scale(1.02)' : 'scale(1)',
              }}
            >
              {/* Badge + name */}
              <div className="mb-6">
                <span className="font-mono text-[10px] text-[#CC5833] uppercase tracking-widest">
                  {tier.badge}
                </span>
                <h3
                  className={`font-sans font-extrabold text-2xl mt-2 mb-2 ${
                    tier.highlight ? 'text-[#F2F0E9]' : 'text-[#1A1A1A]'
                  }`}
                >
                  {tier.name}
                </h3>
                <p
                  className={`font-sans text-sm leading-relaxed ${
                    tier.highlight ? 'text-[#F2F0E9]/50' : 'text-[#1A1A1A]/45'
                  }`}
                >
                  {tier.tagline}
                </p>
              </div>

              {/* Price */}
              <div
                className={`font-mono text-xl font-medium mb-8 ${
                  tier.highlight ? 'text-[#F2F0E9]' : 'text-[#1A1A1A]'
                }`}
              >
                {tier.price}
              </div>

              {/* Features */}
              <ul className="flex-1 space-y-3.5 mb-8">
                {tier.features.map((f) => (
                  <li
                    key={f}
                    className={`flex items-start gap-3 text-sm font-sans ${
                      tier.highlight ? 'text-[#F2F0E9]/70' : 'text-[#1A1A1A]/60'
                    }`}
                  >
                    <Check
                      size={14}
                      className={`mt-0.5 flex-shrink-0 ${
                        tier.highlight ? 'text-[#CC5833]' : 'text-[#2E4036]'
                      }`}
                    />
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                className="w-full py-3.5 rounded-full font-sans font-semibold text-sm inline-flex items-center justify-center gap-2 overflow-hidden relative group"
                style={{
                  background: tier.highlight ? '#CC5833' : '#2E4036',
                  color: '#F2F0E9',
                  transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                <span className="absolute inset-0 bg-[#1A1A1A] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300 ease-out rounded-full" />
                <span className="relative">Find out more</span>
                <ArrowRight size={14} className="relative" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
