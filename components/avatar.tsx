"use client"
import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar"
import { CiUser } from "@react-icons/all-files/ci/CiUser"
import {
  Children,
  cloneElement,
  ComponentProps,
  isValidElement,
} from "react"
import { tv, VariantProps } from "tailwind-variants"
import { StatusBadge } from "./status-badge"

const Root = AvatarPrimitive.Root
const Image = AvatarPrimitive.Image
const Fallback = AvatarPrimitive.Fallback

// Avatar styles using Tailwind Variants
const avatarSlots = tv({
  slots: {
    avatar:
      "relative box-border flex shrink-0 rounded-full bg-muted object-cover",
    avatarFallback:
      "bg-muted flex h-full w-full items-center justify-center rounded-full text-foreground",
    avatarActiveRing:
      "border-opacity-0 h-fit max-h-fit w-fit max-w-fit rounded-full border-2 border-primary p-0.5",
  },
  variants: {
    variant: {
      default: { avatar: "rounded-full" },
      group: { avatar: "rounded-[5px]" },
    },
    shape: {
      circular: { avatar: "rounded-full" },
      square: { avatar: "rounded-[5px]" },
    },
    size: {
      sm: { avatar: "h-8 w-8" },
      md: { avatar: "h-12 w-12" },
      lg: { avatar: "h-[72px] w-[72px]" },
    },
    active: {
      true: { avatarActiveRing: "border-opacity-100" },
    },
    activeAppearance: {
      ring: { avatarActiveRing: "border-opacity-100" },
      shadow: { avatarActiveRing: "shadow-md" },
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
    activeAppearance: "ring",
  },
})

const { avatar, avatarFallback, avatarActiveRing } = avatarSlots()

type AvatarProps = React.ComponentProps<typeof Root> &
  VariantProps<typeof avatarSlots> & {
    status?: "online" | "offline" | "away" | "busy" | "do-not-disturb"
    active?: boolean
    size?: "sm" | "md" | "lg"
    className?: string
    ref?: React.Ref<HTMLSpanElement>
    name?: string
    color?: string
    idForColor?: string
  }

function Avatar({
  className,
  variant,
  shape,
  active = false,
  activeAppearance,
  size = "md",
  status = "offline",
  name,
  color,
  idForColor,
  children,
  ...props
}: AvatarProps) {
  const childrenWithProps = Children.map(children, (child) => {
    if (isValidElement(child)) {
      return cloneElement(child, {
        variant,
        shape,
        size,
        status,
        name,
        color,
        idForColor,
      })
    }
    return child
  })

  return (
    <div className={avatarActiveRing({ active, activeAppearance })}>
      <Root
        data-slot="avatar"
        data-color={color}
        data-id-for-color={idForColor}
        className={avatar({ variant, shape, size, className })}
        style={color ? { backgroundColor: color } : undefined}
        {...props}
      >
        {childrenWithProps}
        <StatusBadge size={size} status={status} />
      </Root>
    </div>
  )
}

type AvatarImageProps = ComponentProps<typeof Image> &
  VariantProps<typeof avatarSlots> & { color?: string; idForColor?: string }

function AvatarImage({
  className,
  variant,
  shape,
  size,
  src,
  color,
  idForColor,
  ...props
}: AvatarImageProps) {
  return (
    <Image
      data-slot="avatar-image"
      src={src}
      className={avatar({ variant, shape, size, className })}
      style={color ? { backgroundColor: color } : undefined}
      {...props}
    />
  )
}

type AvatarFallbackProps = ComponentProps<typeof Fallback> & {
  children?: string
  className?: string
  size?: "sm" | "md" | "lg"
  name?: string
  color?: string
  idForColor?: string
}

function AvatarFallback({
  className,
  children,
  size = "md",
  name,
  color,
  idForColor,
  ...props
}: AvatarFallbackProps) {
  const iconSize = size === "sm" ? 20 : size === "lg" ? 50 : 30

  const displayName = children || name

  return (
    <Fallback
      data-slot="avatar-fallback"
      className={avatarFallback({ size, className })}
      style={color ? { backgroundColor: color } : undefined}
      {...props}
    >
      {displayName ? (
        displayName
          .split(" ")
          .map((name) => name.charAt(0).toUpperCase())
          .join("")
      ) : (
        <CiUser
          size={iconSize}
          data-size={iconSize}
          data-testid="fallback-icon"
          className="text-2xl"
        />
      )}
    </Fallback>
  )
}

export { Avatar, AvatarFallback, AvatarImage }
