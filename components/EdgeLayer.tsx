type Wire = {
  nodeId: string
  topPath: string
  bottomPath: string
}

type EdgeLayerProps = {
  wires: Wire[]
  selectedNodeId?: string
}

// EdgeLayer.tsx
export default function EdgeLayer({ wires, selectedNodeId }: EdgeLayerProps) {
  return (
    <svg
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
      style={{ overflow: "visible" }}
    >
      {wires.map((wire) => {
        const sel = wire.nodeId === selectedNodeId
        return (
          <g key={wire.nodeId}>
            {[wire.topPath, wire.bottomPath].map((path, pi) => (
              <g key={pi}>
                <path
                  d={path} fill="none" strokeLinecap="butt" strokeLinejoin="round"
                  strokeWidth="8"
                  style={{
                    stroke: sel ? "#38bdf8" : "#0e7490",
                    opacity: sel ? 0.05 : 0,
                    transition: "opacity 200ms ease-out, stroke 200ms ease-out"
                  }}
                />
                <path
                  d={path} fill="none" strokeLinecap="butt" strokeLinejoin="round"
                  strokeWidth="4"
                  style={{
                    stroke: sel ? "#38bdf8" : "#0e7490",
                    opacity: sel ? 0.2 : 0,
                    transition: "opacity 200ms ease-out, stroke 200ms ease-out"
                  }}
                />
                <path
                  d={path} fill="none" strokeLinecap="round" strokeLinejoin="round"
                  strokeWidth="1.3"
                  style={{
                    stroke: sel ? "#38bdf8" : "#155e75",
                    opacity: sel ? 0.9 : 0.9,
                    transition: "opacity 200ms ease-out, stroke 200ms ease-out"
                  }}
                />
              </g>
            ))}
          </g>
        )
      })}
    </svg>
  )
}