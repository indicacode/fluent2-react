import { Avatar, AvatarFallback, AvatarImage } from "@/components/avatar"
import { StatusBadge } from "@/components/status-badge"
import { tv } from "tailwind-variants"

type PersonaProps = Omit<typeof Avatar, "children"> & {
  avatar: {
    src: string
    name: string
    status?: "online" | "offline" | "away"
    size: "sm" | "md" | "lg"
  }
  presenceOnly?: boolean
  textPosition?: "before" | "after" | "below"
  quaternaryText?: string
  secondaryText?: string
  tertiaryText?: string
  name: string
  textAlignment?: "start" | "center" | "end"
}

const personaSlots = tv({
  slots: {
    root: "flex items-center gap-2",
    presenceDot: "relative aspect-square rounded-full bg-muted",
    statusBadge: "right-0 bottom-0",
    textStack: "flex flex-col",
  },
  variants: {
    textPosition: {
      before: { root: "flex-row-reverse" },
      after: { root: "flex-row" },
      below: { root: "flex-col" },
    },
    textAlignment: {
      start: { textStack: "text-left" },
      center: { textStack: "text-center" },
      end: { textStack: "text-right" },
    },
    presenceSize: {
      sm: { presenceDot: "h-2 w-2" },
      md: { presenceDot: "h-3 w-3" },
      lg: { presenceDot: "bottom-0.5 right-0.5 h-4 w-4" },
    },
  },
  defaultVariants: {
    textPosition: "after",
    presenceSize: "sm",
    textAlignment: "start",
  },
})

const { root, presenceDot, statusBadge, textStack } = personaSlots()

export default function Persona({
  avatar,
  name,
  secondaryText,
  tertiaryText,
  quaternaryText,
  presenceOnly = false,
  textPosition = "after",
  textAlignment = "start",
  ...props
}: PersonaProps) {
  const presenceSize = avatar?.size || "sm"
  return (
    <div className={root({ textPosition })}>
      {presenceOnly ? (
        <span className={presenceDot({ presenceSize })}>
          <StatusBadge
            className={statusBadge()}
            size={avatar?.size}
            status={avatar?.status}
          />
        </span>
      ) : (
        <Avatar status={avatar?.status} size={avatar?.size} {...props}>
          <AvatarImage src={avatar?.src} />
          <AvatarFallback>{avatar?.name}</AvatarFallback>
        </Avatar>
      )}
      <div className={textStack({ textAlignment })}>
        {name && <h2>{name}</h2>}
        {secondaryText && <h2>{secondaryText}</h2>}
        {tertiaryText && <h2>{tertiaryText}</h2>}
        {quaternaryText && <h2>{quaternaryText}</h2>}
      </div>
    </div>
  )
}
