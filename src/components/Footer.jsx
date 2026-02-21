const COLS = [
  { title: 'Platform', links: ['Overview', 'Integrations', 'Edge Nodes', 'Changelog'] },
  { title: 'Developers', links: ['Documentation', 'API Reference', 'SDKs', 'Status'] },
  { title: 'Company', links: ['About', 'Careers', 'Press', 'Contact'] },
]

export default function Footer() {
  return (
    <footer
      className="rounded-t-[4rem] px-6 md:px-16 pt-16 pb-10"
      style={{ background: '#1A1A1A' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Top grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-14 mb-16">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <div className="font-sans font-bold text-[#F2F0E9] text-xl mb-4">SpatialCore</div>
            <p className="font-sans text-[#F2F0E9]/32 text-sm leading-relaxed max-w-xs">
              The infrastructure layer powering the world's transition into physical AI.
            </p>

            {/* System status */}
            <div className="flex items-center gap-2.5 mt-10">
              <span
                className="w-2 h-2 rounded-full bg-emerald-400"
                style={{ animation: 'pulseDot 2.2s ease-in-out infinite' }}
              />
              <span className="font-mono text-[10px] text-[#F2F0E9]/28 uppercase tracking-widest">
                System Operational
              </span>
            </div>
          </div>

          {/* Nav columns */}
          {COLS.map((col) => (
            <div key={col.title}>
              <div className="font-mono text-[10px] text-[#F2F0E9]/22 uppercase tracking-widest mb-5">
                {col.title}
              </div>
              <ul className="space-y-3.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="font-sans text-sm text-[#F2F0E9]/42 hover:text-[#F2F0E9] hover:-translate-y-px transition-all inline-block duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderColor: 'rgba(242,240,233,0.08)' }}
        >
          <p className="font-sans text-xs text-[#F2F0E9]/20">
            © 2026 SpatialCore, Inc. All rights reserved.
          </p>
          <div className="flex gap-5 md:gap-7">
            {['Privacy Policy', 'Terms of Service', 'Security'].map((l) => (
              <a
                key={l}
                href="#"
                className="font-sans text-xs text-[#F2F0E9]/24 hover:text-[#F2F0E9]/55 transition-colors"
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
