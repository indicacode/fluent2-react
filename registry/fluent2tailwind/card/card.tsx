import {
  Children,
  cloneElement,
  ComponentProps,
  isValidElement,
  ReactNode,
  useEffect,
  useState,
} from "react"
import { VariantProps } from "tailwind-variants"

import { cardSlots, cardStyles } from "./card.styles"

const {
  card,
  cardSpacing,
  cardHeader,
  cardHeaderImage,
  cardTitle,
  cardDescription,
  cardContent,
  cardFooter,
} = cardStyles

type CardProps = ComponentProps<"div"> &
  VariantProps<typeof cardSlots> & {
    onSelectionChange?: (selected: boolean) => void
    /** False is the default value */
    cardPreview?: string | false
    image?: string
    size?: "sm" | "md" | "lg"
    appearance?: "filled" | "filled-alt" | "outline" | "subtle"
    defaultSelected?: boolean
    selected?: boolean
    disabled?: boolean
    focusMode?: "tab" | "none"
  }

function Card({
  onSelectionChange = () => {},
  orientation = "vertical",
  defaultChecked = false,
  defaultSelected,
  selected,
  disabled = false,
  focusMode = "none",
  selectable = false,
  cardPreview = false,
  size,
  className,
  children,
  variant,
  appearance,
  image,
  ...props
}: CardProps) {
  const [pressed, setPressed] = useState<boolean>(false)
  const isControlled = selected !== undefined
  const [checked, setChecked] = useState<boolean>(
    defaultSelected ?? defaultChecked
  )

  useEffect(() => {
    if (isControlled) {
      setChecked(selected ?? false)
    }
  }, [isControlled, selected])

  useEffect(() => {
    onSelectionChange(checked)
  }, [checked])

  const childrenWithProps = Children.map(children, (child) => {
    if (isValidElement(child)) {
      if (child.type === CardHeader) {
        return cloneElement(child, { orientation, image } as {
          orientation: "horizontal" | "vertical"
          image?: string
        })
      }
      return cloneElement(child, { orientation } as {
        orientation: "horizontal" | "vertical"
      })
    }
    return child
  })

  return (
    <div
      data-slot="card"
      onMouseUp={() => variant === "outline" && setPressed(false)}
      onMouseDown={() => variant === "outline" && setPressed(true)}
      onClick={() => {
        if (!selectable || disabled) return
        if (isControlled) {
          onSelectionChange(!(selected ?? false))
          return
        }
        setChecked((prevState) => !prevState)
      }}
      className={card({
        variant: variant ?? appearance,
        orientation,
        pressed: pressed && selectable,
        selectable,
        checked,
        className,
      })}
      tabIndex={focusMode === "tab" && selectable ? 0 : undefined}
      aria-disabled={disabled ? true : undefined}
      data-disabled={disabled ? "true" : "false"}
      {...props}
    >
      {cardPreview && <img alt="card preview" src={cardPreview} />}
      <div className={cardSpacing({ orientation, size })}>
        {childrenWithProps}
      </div>
    </div>
  )
}

function FloatingAction({ children }: { children: ReactNode }) {
  return (
    <div className="absolute top-2 right-3 max-h-fit max-w-fit cursor-pointer">
      {children}
    </div>
  )
}

type OrientationOnlyCardProps = ComponentProps<"div"> &
  Pick<VariantProps<typeof cardSlots>, "orientation"> & {
    image?: string
  }

function CardHeader({
  className,
  orientation,
  children,
  image,
  ...props
}: OrientationOnlyCardProps) {
  const childrenWithProps = Children.map(children, (child) => {
    if (isValidElement(child)) {
      return cloneElement(child, { orientation } as {
        orientation: "horizontal" | "vertical"
      })
    }
    return child
  })
  return (
    <div
      data-slot="card-header"
      className={cardHeader({ className, orientation })}
      {...props}
    >
      {image && (
        <div className="h-16 w-16">
          <img
            src={image}
            alt="card image"
            className={cardHeaderImage({ orientation, className })}
          />
        </div>
      )}
      <div>{childrenWithProps}</div>
    </div>
  )
}

type CardTitleProps = ComponentProps<"h3"> &
  Pick<VariantProps<typeof cardSlots>, "orientation"> & {}

function CardTitle({ className, orientation, ...props }: CardTitleProps) {
  return (
    <h3
      data-slot="card-title"
      className={cardTitle({
        orientation,
        className,
      })}
      {...props}
    />
  )
}

type CardDescriptionProps = ComponentProps<"p"> &
  Pick<VariantProps<typeof cardSlots>, "orientation"> & {}

function CardDescription({
  className,
  orientation,
  ...props
}: CardDescriptionProps) {
  return (
    <p
      data-slot="card-description"
      className={cardDescription({
        className,
        orientation,
      })}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end"
      }
      {...props}
    />
  )
}

function CardContent({
  className,
  orientation,
  ...props
}: OrientationOnlyCardProps) {
  if (orientation === "horizontal") {
    return null
  }
  return (
    <div
      data-slot="card-content"
      className={cardContent({
        className,
        orientation,
      })}
      {...props}
    />
  )
}

function CardFooter({
  className,
  orientation,
  ...props
}: OrientationOnlyCardProps) {
  if (orientation === "horizontal") {
    return null
  }
  return (
    <div
      data-slot="card-footer"
      className={cardFooter({
        className,
        orientation,
      })}
      {...props}
    />
  )
}

export {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  FloatingAction,
}
