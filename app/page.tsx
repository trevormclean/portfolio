import GraphLayout from "@/components/GraphLayout"

export default function Home() {
  return (
    <main
      className="min-h-screen flex justify-center"
      style={{
        backgroundColor: "#0b0f14",
        backgroundImage: `radial-gradient(rgba(56,189,248,0.08) 1px, transparent 1px)`,
        backgroundSize: "32px 32px",
        backgroundPosition: "0px 11px",
      }}
    >
      <GraphLayout />
    </main>
  )
}