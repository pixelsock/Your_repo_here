import { useState } from 'react'
import AppV1 from './AppV1'
import AppV2 from './AppV2'

export default function App() {
  const [version, setVersion] = useState(1)

  return (
    <>
      {version === 1 ? <AppV1 /> : <AppV2 />}

      {/* Floating version toggle — always on top */}
      <div className="fixed bottom-6 right-6 z-[99999] flex items-center gap-1 bg-[#1A1A1A]/90 backdrop-blur-xl border border-white/10 rounded-full px-3 py-2 shadow-2xl">
        <span
          className="text-white/35 mr-1"
          style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '9px', letterSpacing: '0.2em' }}
        >
          VERSION
        </span>
        {[1, 2].map((v) => (
          <button
            key={v}
            onClick={() => setVersion(v)}
            className="rounded-full px-3 py-1 transition-all duration-200"
            style={{
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: '11px',
              fontWeight: 600,
              background: version === v ? '#CC5833' : 'transparent',
              color: version === v ? '#F2F0E9' : 'rgba(242,240,233,0.35)',
            }}
          >
            V{v}
          </button>
        ))}
      </div>
    </>
  )
}
