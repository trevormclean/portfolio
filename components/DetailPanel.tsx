import { forwardRef } from "react"

const DetailPanel = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div
      ref={ref}
      className="
        relative
        w-full
        max-w-5xl
        min-h-80
        p-8
        rounded-xl
        border
        border-cyan-400/30
        bg-slate-900
        shadow-[0_0_10px_rgba(56,189,248,0.15)]
      "
    >
      <p className="text-slate-400 text-sm">Click a project to see details.</p>
    </div>
  )
})
DetailPanel.displayName = "DetailPanel"
export default DetailPanel