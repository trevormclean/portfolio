type Edge = { d: string }

export default function EdgeLayer({ edges }: { edges: Edge[] }) {
  return (
    <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ overflow: 'visible' }}>
      {edges.map((e, i) => (
        <g key={i}>
          <path d={e.d} stroke="#38bdf8" strokeWidth="10" fill="none" opacity="0.05" strokeLinecap="butt" strokeLinejoin="round" />
          <path d={e.d} stroke="#38bdf8" strokeWidth="6"  fill="none" opacity="0.2"  strokeLinecap="butt" strokeLinejoin="round" />
          <path d={e.d} stroke="#38bdf8" strokeWidth="1.5" fill="none" opacity="0.9" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      ))}
    </svg>
  )
}