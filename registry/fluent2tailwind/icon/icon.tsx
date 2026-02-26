import * as React from "react"

export type IconProps = React.ComponentPropsWithoutRef<"span"> & {
  icon?: React.ReactElement
  size?: number
  color?: string
}

function Icon({ icon, children, size = 16, color, style, ...props }: IconProps) {
  const content = icon ?? children

  if (React.isValidElement(content)) {
    return React.cloneElement(content as React.ReactElement, {
      width: size,
      height: size,
      color,
      ...((content as React.ReactElement).props || {}),
    })
  }

  return (
    <span
      data-slot="icon"
      style={{ width: size, height: size, color, ...style }}
      {...props}
    >
      {content}
    </span>
  )
}

export { Icon }
