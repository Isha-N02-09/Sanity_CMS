import type { ReactNode } from 'react'

type SectionLabelProps = {
  children: ReactNode
  size?: 'sm' | 'md' | 'lg'
}

export function SectionLabel({ children, size = 'md' }: SectionLabelProps) {
  const sizeClass = size === 'sm' ? 'text-[11px]' : size === 'lg' ? 'text-[13px]' : 'text-[12px]'

  return (
    <div className={`flex items-center gap-3 uppercase tracking-[0.22em] text-[#f45e2b] ${sizeClass} font-black`}>
      <span className="h-px w-7 bg-[#f45e2b]" aria-hidden="true" />
      <span>{children}</span>
    </div>
  )
}
