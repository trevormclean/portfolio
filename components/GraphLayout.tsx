// GraphLayout.tsx  (replace the Edge type, computeEdges, edges state, and EdgeLayer usage)
"use client"

import { useEffect, useRef, useState } from "react"
import NodeCard from "./NodeCard"
import EdgeLayer from "./EdgeLayer"
import DetailPanel from "./DetailPanel"

type NodeData = {
  id: string
  title: string
  description: string
  tags?: string[]
  level: "root" | "project"
}

const nodes: NodeData[] = [
  {
    id: "root",
    title: "Trevor McLean",
    description: "Software developer interested in systems and performance",
    level: "root",
  },
  {
    id: "powercool",
    title: "PowerCool Hub",
    description: "Handles logistics for PowerCool, an HVAC company",
    tags: ["Java", "JavaScript", "Spring Boot"],
    level: "project",
  },
  {
    id: "compile-time-tester",
    title: "Automated Compile-time Feature Tester",
    description: "Differential testing for C++ compile-time features",
    tags: ["C++", "Clang AST", "Python"],
    level: "project",
  },
  {
    id: "deductive-verifier",
    title: "Deductive Verifier",
    description: "Program verification tool for a simple imperative language",
    tags: ["Python", "Z3"],
    level: "project",
  },
  {
    id: "yase",
    title: "Yet Another Storage Engine (YASE)",
    description: "A custom storage engine",
    tags: ["C++", "Concurrency"],
    level: "project",
  },
  {
    id: "portfolio",
    title: "Personal Portfolio",
    description: "This website displaying my project experience",
    tags: ["TypeScript", "React", "Next.js"],
    level: "project",
  }
]

type Wire = {
  nodeId: string
  topPath: string
  bottomPath: string
}


/**
 * Builds an SVG path that:
 *  1. Drops straight down from (startX, startY)
 *  2. Turns 90° (rounded) toward endX at depth `turnDepth`
 *  3. Travels horizontally to endX
 *  4. Turns 90° (rounded) downward and arrives at (endX, endY)
 *
 * If startX ≈ endX the path is a simple vertical line.
 */
function makeWirePath(
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  turnDepth: number
): string {
  const dx = endX - startX
  const CORNER_R = 6
  if (Math.abs(dx) <= CORNER_R * 2) {
    // Close enough — draw straight down
    return `M ${startX} ${startY} L ${endX} ${endY}`
  }
  const sign = dx > 0 ? 1 : -1
  const ty = startY + turnDepth // y where horizontal run lives
  return [
    `M ${startX} ${startY}`,
    `L ${startX} ${ty - CORNER_R}`,
    `Q ${startX} ${ty} ${startX + sign * CORNER_R} ${ty}`,
    `L ${endX - sign * CORNER_R} ${ty}`,
    `Q ${endX} ${ty} ${endX} ${ty + CORNER_R}`,
    `L ${endX} ${endY}`,
  ].join(" ")
}

export default function GraphLayout() {
  const containerRef = useRef<HTMLDivElement>(null)
  const nodeRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const detailRef = useRef<HTMLDivElement>(null)
  const [wires, setWires] = useState<Wire[]>([])
  const [selectedProjectId, setSelectedProjectId] = useState<string>()

  function computeWires() {
    const container = containerRef.current
    const rootEl = nodeRefs.current["root"]
    const detailEl = detailRef.current
    if (!container || !rootEl || !detailEl) return

    const cRect = container.getBoundingClientRect()
    const toLocal = (rect: DOMRect) => ({
      centerX: rect.left - cRect.left + rect.width / 2,
      top: rect.top - cRect.top,
      bottom: rect.bottom - cRect.top,
    })

    const rootLocal = toLocal(rootEl.getBoundingClientRect())
    const detailLocal = toLocal(detailEl.getBoundingClientRect())

    const projectLocals = nodes
      .filter((n) => n.level === "project")
      .flatMap((n) => {
        const el = nodeRefs.current[n.id]
        if (!el) return []
        return [{ id: n.id, ...toLocal(el.getBoundingClientRect()) }]
      })

    if (projectLocals.length === 0) return

    const N = projectLocals.length

    // Vertical gaps
    const yGapTop = projectLocals[0].top - rootLocal.bottom
    const yGapBottom = detailLocal.top - projectLocals[0].bottom
    
    const W_GAP = 6 // px between wires in bundle

    const newWires: Wire[] = projectLocals.map((p, i) => {
      // Distance from the nearer edge — determines how deep this wire turns
      const distFromEdge = Math.min(i, N - 1 - i)

      // --- TOP SECTION: root bundle → pNode center ---
      // Bundle x at root bottom (centered, wires spaced W_GAP apart)
      const rootBundleX = rootLocal.centerX + (i - (N - 1) / 2) * W_GAP
      const maxDistTop = Math.floor((N-1) / 2)
      const turnDepthTop = 3 * yGapTop / 4 - (maxDistTop - distFromEdge) * W_GAP

      const topPath = makeWirePath(
        rootBundleX, rootLocal.bottom,
        p.centerX,   p.top,
        turnDepthTop
      )

      // --- BOTTOM SECTION: pNode center → detail bundle ---
      // Bundle x at detail top (same centred layout)
      const detailBundleX = detailLocal.centerX + (i - (N - 1) / 2) * W_GAP
      const maxDistBottom = Math.floor((N-1) / 2)
      const turnDepthBottom = yGapBottom / 4 + (maxDistBottom - distFromEdge) * W_GAP

      const bottomPath = makeWirePath(
        p.centerX,    p.bottom,
        detailBundleX, detailLocal.top,
        turnDepthBottom
      )

      return { nodeId: p.id, topPath, bottomPath }
    })

    setWires(newWires)
  }

  useEffect(() => {
    computeWires()
    window.addEventListener("resize", computeWires)
    return () => window.removeEventListener("resize", computeWires)
  }, [])

  const rootNode = nodes.find((n) => n.level === "root")
  const projectNodes = nodes.filter((n) => n.level === "project")

  return (
    <div
      ref={containerRef}
      className="relative w-full flex flex-col items-center pt-5 gap-12"
    >
      <EdgeLayer wires={wires} selectedNodeId={selectedProjectId} />

      {rootNode && (
        <NodeCard
          ref={(el) => { nodeRefs.current[rootNode.id] = el }}
          title={rootNode.title}
          description={rootNode.description}
          tags={rootNode.tags}
        />
      )}

      <div className="flex gap-12">
        {projectNodes.map((node) => (
          <NodeCard
            key={node.id}
            ref={(el) => { nodeRefs.current[node.id] = el }}
            title={node.title}
            description={node.description}
            tags={node.tags}
            selected={node.id === selectedProjectId}
            onClick={() => setSelectedProjectId(prev => prev === node.id ? undefined : node.id)}
          />
        ))}
      </div>

      <DetailPanel
        ref={detailRef}
        selectedProjectId={selectedProjectId}
      />
    </div>
  )
}