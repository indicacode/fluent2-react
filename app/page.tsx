"use client"

import {
  Nav,
  NavHeader,
  NavSection,
  NavSubItem,
} from "@/components/nav"
import {
  ArticleIcon,
  CaretDownIcon,
  CaretRightIcon,
  UserCircleIcon,
} from "@phosphor-icons/react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { MouseEvent, useCallback, useState } from "react"
import { components, sideBar } from "./page.inputs"

// trigger build
export default function Page() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [openFamilies, setOpenFamilies] = useState<Record<string, boolean>>({})
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentDocs = searchParams.get("section")

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
      return params.toString()
    },
    [searchParams]
  )

  const handleNavigate = useCallback(
    (paramName: string, value: string) => {
      router.push(`${pathname}?${createQueryString(paramName, value)}`)
    },
    [router, pathname, createQueryString]
  )

  const handleSidebarToggle = useCallback(() => {
    setIsCollapsed((prev) => !prev)
  }, [])

  const handleFamilyToggle = useCallback((family: string) => {
    setOpenFamilies((prev) => ({
      ...prev,
      [family]: !(prev[family] ?? true),
    }))
  }, [])

  return (
    <div
      className={`flex h-[100%] min-h-screen w-full flex-row bg-gradient-to-r from-white to-slate-200 transition-colors dark:from-slate-950 dark:to-zinc-950 ${isCollapsed ? "pl-0" : "pl-64"}`}
    >
      <Nav isOpen={!isCollapsed} onToggle={handleSidebarToggle}>
        <NavHeader href="#" logo={UserCircleIcon}>
          Fluent2
        </NavHeader>
        <NavSection>
          {sideBar.Components.items.map((item, itemIdx) =>
            typeof item === "string" ? (
              <NavSubItem
                key={itemIdx}
                href={`?section=${item}`}
                onClick={(e: MouseEvent<HTMLAnchorElement>) => {
                  e.preventDefault()
                  handleNavigate("section", item)
                }}
              >
                {item}
              </NavSubItem>
            ) : (
              <div key={itemIdx} className="flex flex-col gap-1">
                <button
                  type="button"
                  onClick={() => handleFamilyToggle(item.title)}
                  className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-xs font-semibold tracking-wide text-foreground/80 uppercase transition-colors hover:bg-muted"
                >
                  <span className="flex-1 text-left">{item.title}</span>
                  {(openFamilies[item.title] ?? true) ? (
                    <CaretDownIcon size={14} />
                  ) : (
                    <CaretRightIcon size={14} />
                  )}
                </button>
                {(openFamilies[item.title] ?? true) && (
                  <div className="mt-1 flex flex-col gap-1">
                    {item.items.map((groupedItem, groupedIdx) => (
                      <NavSubItem
                        key={`${item.title}-${groupedIdx}`}
                        href={`?section=${groupedItem}`}
                        onClick={(e: MouseEvent<HTMLAnchorElement>) => {
                          e.preventDefault()
                          handleNavigate("section", groupedItem)
                        }}
                      >
                        {groupedItem}
                      </NavSubItem>
                    ))}
                  </div>
                )}
              </div>
            )
          )}
        </NavSection>
      </Nav>

      <main className="flex min-h-full w-full items-start justify-center px-6 py-12">
        {isCollapsed && (
          <button
            onClick={handleSidebarToggle}
            className="fixed top-4 left-4 z-50 rounded-md border border-border bg-background p-2 shadow-md transition-colors hover:bg-muted"
            title="Open Navigation"
          >
            <ArticleIcon
              size={24}
              weight="regular"
              className="text-foreground dark:text-primary-foreground"
            />
          </button>
        )}

        {components.map(({ header, subText, cards }, idx: number) => {
          return (
            currentDocs === header && (
              <div
                key={idx}
                className="flex w-full max-w-4xl flex-col gap-12 text-foreground"
              >
                <header className="flex flex-col space-y-2">
                  <h1 className="text-3xl font-semibold text-foreground">
                    {header}
                  </h1>
                  <div className="text-muted-foreground">
                    {subText}
                  </div>
                </header>

                {cards.map(
                  (
                    { cardHeader, cardSubtext, cardComponent },
                    cardIdx: number
                  ) => (
                    <section key={cardIdx} className="space-y-4">
                      {cardHeader && (
                        <div className="space-y-2">
                          <h2 className="text-2xl font-semibold text-foreground">
                            {cardHeader}
                          </h2>
                          <div className="text-muted-foreground">
                            {cardSubtext}
                          </div>
                        </div>
                      )}
                      <div className="relative overflow-hidden rounded-lg border border-border bg-background p-6 shadow-sm">
                        {cardComponent}
                      </div>
                    </section>
                  )
                )}
              </div>
            )
          )
        })}
      </main>
    </div>
  )
}
