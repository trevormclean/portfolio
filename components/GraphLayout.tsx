"use client"

import { useEffect, useRef, useState } from "react"
import NodeCard from "./NodeCard"
import EdgeLayer from "./EdgeLayer"

type NodeData = {
  id: string
  title: string
  description: string
  tags?: string[]
  level: "root" | "project"
}

type Edge = {
  x1: number
  y1: number
  x2: number
  y2: number
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
    description: "A custom storage engine supporting storage, indexing, logging, and concurrency control",
    tags: ["C++"],
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
  const [edges, setEdges] = useState<Edge[]>([])

  function computeEdges() {
    const container = containerRef.current
    const root = nodeRefs.current["root"]

    if (!container || !root) return

    const containerRect = container.getBoundingClientRect()
    const rootRect = root.getBoundingClientRect()

    const projects = nodes.filter(n => n.level === "project")

    const projectRects = projects
      .map(p => ({
        id: p.id,
        rect: nodeRefs.current[p.id]?.getBoundingClientRect()
      }))
      .filter(p => p.rect)

    if (projectRects.length === 0) return

    const rootX = rootRect.left - containerRect.left + rootRect.width / 2

    const rootBottom = rootRect.bottom - containerRect.top

    const projectCenters = projectRects.map(p => {
      const rect = p.rect!

      return {
        id: p.id,
        x: rect.left - containerRect.left + rect.width / 2,
        top: rect.top - containerRect.top
      }
    })

    const firstProjectTop = Math.min(...projectCenters.map(p => p.top))

    const busY = rootBottom + (firstProjectTop - rootBottom) / 2

    const leftMost = Math.min(...projectCenters.map(p => p.x))
    const rightMost = Math.max(...projectCenters.map(p => p.x))

    const newEdges: Edge[] = []

    // trunk
    newEdges.push({
      x1: rootX,
      y1: rootBottom,
      x2: rootX,
      y2: busY
    })

    // horizontal bus
    newEdges.push({
      x1: leftMost,
      y1: busY,
      x2: rightMost,
      y2: busY,
    })

    // project branches
    projectCenters.forEach((p, i) => {
      newEdges.push({
        x1: p.x,
        y1: busY,
        x2: p.x,
        y2: p.top,
      })
    })

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
      className="relative w-full flex flex-col items-center pt-24 gap-20"
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

    </div>

  )
}