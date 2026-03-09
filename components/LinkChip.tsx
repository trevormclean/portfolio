type LinkChipProps = {
  label: string
  href: string
}
export default function LinkChip({ label, href }: LinkChipProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-xs px-2 py-1 rounded bg-violet-500/10 text-violet-300 border border-violet-400/20 hover:bg-violet-500/20 transition-colors duration-150"
    >
      {label}
    </a>
  )
}