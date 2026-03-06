type Edge = {
  x1: number
  y1: number
  x2: number
  y2: number
  type?: "line" | "curve"
}

export default function EdgeLayer({ edges }: { edges: Edge[] }) {
  return (
    <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {edges.map((e,i)=>{
        return (
          <line
            key={i}
            x1={e.x1}
            y1={e.y1}
            x2={e.x2}
            y2={e.y2}
            stroke="#38bdf8"
            strokeWidth="2.5"
            filter="url(#glow)"
            opacity="0.9"
          />
        )

      })}
    </svg>
  )
}