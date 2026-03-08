import { forwardRef } from "react"
import { useEffect, useState } from "react"
import { projectDetails } from "./ProjectDetails"

type Props = {
  selectedProjectId?: string
}

const DetailPanel = forwardRef<HTMLDivElement, Props>(
({ selectedProjectId }, ref) => {

  const [visible, setVisible] = useState(true)
  const [displayedProjectId, setDisplayedProjectId] = useState(selectedProjectId)

  const project = displayedProjectId
    ? projectDetails[displayedProjectId]
    : null

  useEffect(() => {
    if (selectedProjectId === displayedProjectId) return

    setVisible(false)

    const t = setTimeout(() => {
      setDisplayedProjectId(selectedProjectId)
      setVisible(true)
    }, 150)

    return () => clearTimeout(t)
  }, [selectedProjectId, displayedProjectId])

  return (
    <div
      ref={ref}
      className="
        relative
        w-full
        max-w-5xl
        min-h-80
        p-3
        rounded-xl
        border
        border-cyan-400/30
        bg-slate-900
        shadow-[0_0_10px_rgba(56,189,248,0.15)]
        flex
        flex-col
        gap-2
      "
    >
    
      <div
        className={`
          transition-all duration-150 ease-out
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"}
        `}
      >
        {!project && (
          <>
            <p className="text-slate-400 text-sm text-center">
              Click a project to see details.
            </p>
          </>
        )}

        {project && (
          <>
            <h2 className="text-center text-xl font-semibold text-slate-200 mb-2">
              {project.title}
            </h2>

            <div className="border-t border-cyan-400/20 mb-3"></div>

            <div className="grid grid-cols-4 gap-6 px-4 text-sm text-slate-300">

              <Section title="Overview">
                <p>{project.overview}</p>
              </Section>

              <Section title="My Role">
                <ul className="list-disc ml-4 space-y-1">
                  {project.role.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </Section>

              <Section title="Challenges">
                <ul className="list-disc ml-4 space-y-1">
                  {project.challenges.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </Section>

              <Section title="What I Learned">
                <ul className="list-disc ml-4 space-y-1">
                  {project.learned.map((l, i) => (
                    <li key={i}>{l}</li>
                  ))}
                </ul>
              </Section>

            </div>
          </>
        )}
      </div>

    </div>
  )
})

DetailPanel.displayName = "DetailPanel"
export default DetailPanel


function Section({ title, children }:{
  title:string
  children:React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-2 border-cyan-400/20 pl-4">
      <h3 className="text-cyan-300 font-medium text-sm tracking-wide">
        {title}
      </h3>
      {children}
    </div>
  )
}