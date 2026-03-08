// NodeCard.tsx — remove hover classes, add selected prop
import { forwardRef } from "react"

type NodeCardProps = {
  title: string
  description: string
  tags?: string[]
  onClick?: () => void
  selected?: boolean
}

const NodeCard = forwardRef<HTMLDivElement, NodeCardProps>(
({ title, description, tags = [], onClick, selected }, ref) => {
  return (
    <div
      ref={ref}
      onClick={onClick}
      className={`
        relative w-64 px-4 pt-2 pb-4 rounded-xl border bg-slate-900 select-none
        transition-all duration-200 ease-out cursor-pointer
        ${selected
          ? "border-cyan-400 shadow-[0_0_18px_rgba(56,189,248,0.35)]"
          : "border-cyan-400/30 shadow-[0_0_10px_rgba(56,189,248,0.15)]"
        }
      `}
    >
      <h3 className="text-lg font-semibold text-slate-100 mb-2">{title}</h3>
      <p className="text-sm text-slate-400 mb-3">{description}</p>
      <div className="flex flex-wrap gap-1">
        {tags.map(tag => (
          <span key={tag} className="text-xs px-2 py-1 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-400/20">
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
})
NodeCard.displayName = "NodeCard"
export default NodeCard