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

type Edge = {
  d: string
  skipGap?: number
}

const nodes: NodeData[] = [
  {
    id: "root",
    title: "Trevor McLean",
    description: "Software developer interested in systems, performance, and reliability",
    level: "root"
  },
  {
    id: "p1",
    title: "PowerCool Hub",
    description: "Handles logistics for PowerCool, an HVAC company",
    tags: ["Java", "JavaScript", "Spring Boot"],
    level: "project"
  },
  {
    id: "p2",
    title: "Automated Compile-time Feature Tester",
    description: "Differential testing for C++ compile-time features",
    tags: ["C++", "Clang AST", "Python"],
    level: "project"
  },
  {
    id: "p3",
    title: "Deductive Verifier",
    description: "Program verification tool for a simple imperative language",
    tags: ["Python", "Z3"],
    level: "project"
  },
  {
    id: "p4",
    title: "Yet Another Storage Engine (YASE)",
    description: "A custom storage engine",
    tags: ["C++", "Concurrency"],
    level: "project"
  },
  {
    id: "p5",
    title: "Personal Portfolio",
    description: "This website displaying my project experience",
    tags: ["TypeScript", "React", "Next.js"],
    level: "project"
  }
  
]

export default function GraphLayout() {

  const containerRef = useRef<HTMLDivElement>(null)
  const nodeRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const detailRef = useRef<HTMLDivElement>(null)
  const [edges, setEdges] = useState<Edge[]>([])

  function computeEdges() {
    const container = containerRef.current
    const root = nodeRefs.current["root"]
    const detail = detailRef.current
    if (!container || !root || !detail) return

    const cRect = container.getBoundingClientRect()
    const toLocal = (rect: DOMRect) => ({
      centerX: rect.left - cRect.left + rect.width / 2,
      top:     rect.top  - cRect.top,
      bottom:  rect.bottom - cRect.top,
    })

    const rootLocal = toLocal(root.getBoundingClientRect())
    const detailLocal = toLocal(detail.getBoundingClientRect())

    const projectPoints = nodes
      .filter(n => n.level === "project")
      .flatMap(n => {
        const el = nodeRefs.current[n.id]
        if (!el) return []
        return [{ id: n.id, ...toLocal(el.getBoundingClientRect()) }]
      })

    if (projectPoints.length === 0) return

    const sCurve = (sx: number, sy: number, ex: number, ey: number) => {
      const dy = ey - sy
      const strn = 0.9
      return `M ${sx} ${sy} C ${sx} ${sy + dy * strn} ${ex} ${ey - dy * strn} ${ex} ${ey}`
    }

    const newEdges: Edge[] = [
      // root → project nodes
      ...projectPoints.map(p => ({
        d: sCurve(rootLocal.centerX, rootLocal.bottom, p.centerX, p.top)
      })),
      // project nodes → detail panel
      ...projectPoints.map(p => ({
          d: sCurve(p.centerX, p.bottom, detailLocal.centerX, detailLocal.top)
        }))
    ]

    setEdges(newEdges)
  }

  useEffect(() => {
    computeEdges()

    window.addEventListener("resize", computeEdges)

    return () => window.removeEventListener("resize", computeEdges)

  }, [])

  const rootNode = nodes.find(n => n.level === "root")
  const projectNodes = nodes.filter(n => n.level === "project")

  return (

    <div
      ref={containerRef}
      className="relative w-full flex flex-col items-center pt-5 gap-8"
    >

      <EdgeLayer edges={edges} />

      {rootNode && (
        <NodeCard
          ref={(el) => { nodeRefs.current[rootNode.id] = el }}
          title={rootNode.title}
          description={rootNode.description}
          tags={rootNode.tags}
        />
      )}

      <div className="flex gap-12">
        {projectNodes.map(node => (

          <NodeCard
            key={node.id}
            ref={(el) => { nodeRefs.current[node.id] = el }}
            title={node.title}
            description={node.description}
            tags={node.tags}
          />

        ))}
      </div>

      <DetailPanel ref={detailRef} />

    </div>

  )
}