import { CaretDownIcon, CaretRightIcon, ListIcon } from "@phosphor-icons/react"
import { usePathname, useSearchParams } from "next/navigation"
import { useState } from "react"

export function NavHeader({ href, logo: Logo, children }) {
  return (
    <a
      href={href}
      className="mb-4 flex items-center gap-3 rounded-md transition-colors hover:bg-muted"
    >
      <Logo
        size={32}
        weight="regular"
        className="text-foreground"
      />
      <span className="font-semibold text-foreground">{children}</span>
    </a>
  )
}

export function NavCategory({ icon: Icon, title, children }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center gap-3 rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted"
      >
        <Icon size={20} weight="regular" />
        <span className="flex-1 text-left text-sm font-medium">{title}</span>
        {isExpanded ? (
          <CaretDownIcon size={16} />
        ) : (
          <CaretRightIcon size={16} />
        )}
      </button>
      {isExpanded && <div className="mt-2 flex flex-col gap-1">{children}</div>}
    </div>
  )
}

export function NavSubItem({ children, href, onClick }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const isActive = searchParams.get("section") === children

  return (
    <a
      href={href}
      onClick={onClick}
      className={`block rounded-md px-9 py-2 text-sm transition-colors ${
        isActive
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:bg-muted"
      }`}
    >
      {children}
    </a>
  )
}

export function NavSection({ title, children }) {
  return (
    <div className="pt-4">
      {title && (
        <h2 className="mb-2 px-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
          {title}
        </h2>
      )}
      <div className="flex flex-col gap-1">{children}</div>
    </div>
  )
}

export function Nav({ isOpen, onToggle, children }) {
  return (
    <div
      className={`fixed top-0 left-0 z-40 flex h-screen flex-col overflow-hidden border-r border-border bg-background p-4 transition-all duration-300 ${isOpen ? "w-64" : "w-0"} `}
    >
      <div className="">
        <button
          onClick={onToggle}
          className="rounded-md transition-colors hover:bg-muted"
          title="Close Navigation"
        >
          <ListIcon
            size={24}
            weight="regular"
            className="text-foreground"
          />
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  )
}
