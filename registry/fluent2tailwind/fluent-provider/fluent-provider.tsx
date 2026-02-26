"use client"

import * as React from "react"

export type FluentProviderProps = React.ComponentPropsWithoutRef<"div"> & {
  theme?: Record<string, string | number>
  applyStylesToPortals?: boolean
  targetDocument?: Document
  dir?: "ltr" | "rtl"
  as?: keyof JSX.IntrinsicElements
}

function toCssVar(key: string) {
  if (key.startsWith("--")) return key
  return `--${key}`
}

export function FluentProvider({
  theme,
  applyStylesToPortals = false,
  targetDocument,
  dir = "ltr",
  as,
  style,
  children,
  ...props
}: FluentProviderProps) {
  const Comp = (as ?? "div") as keyof JSX.IntrinsicElements

  const inlineStyle = React.useMemo(() => {
    if (!theme) return style
    const cssVars: Record<string, string | number> = {}
    for (const [key, value] of Object.entries(theme)) {
      cssVars[toCssVar(key)] = value
    }
    return { ...cssVars, ...style }
  }, [theme, style])

  React.useEffect(() => {
    if (!applyStylesToPortals || !theme) return
    const doc = targetDocument ?? (typeof document !== "undefined" ? document : null)
    if (!doc) return
    const root = doc.documentElement
    const previous: Record<string, string> = {}

    for (const [key, value] of Object.entries(theme)) {
      const cssKey = toCssVar(key)
      previous[cssKey] = root.style.getPropertyValue(cssKey)
      root.style.setProperty(cssKey, String(value))
    }

    return () => {
      for (const [key, value] of Object.entries(previous)) {
        if (value) {
          root.style.setProperty(key, value)
        } else {
          root.style.removeProperty(key)
        }
      }
    }
  }, [applyStylesToPortals, targetDocument, theme])

  return (
    <Comp
      data-slot="fluent-provider"
      dir={dir}
      style={inlineStyle}
      {...props}
    >
      {children}
    </Comp>
  )
}
