"use client"

import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react"
import * as React from "react"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"
import { carouselStyles } from "./carousel.styles"

import Button from "@/registry/fluent2tailwind/button/button"

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

type CarouselProps = {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: "horizontal" | "vertical"
  setApi?: (api: CarouselApi) => void
  activeIndex?: number
  defaultActiveIndex?: number
  onActiveIndexChange?: (activeIndex: number) => void
  align?: CarouselOptions["align"]
  draggable?: boolean
  groupSize?: number
  circular?: boolean
  autoplayInterval?: number
  motion?: "default" | "none"
  appearance?: "default" | "subtle"
  whitespace?: "none" | "sm" | "md" | "lg"
  announcement?: string
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
  appearance?: "default" | "subtle"
  whitespace?: "none" | "sm" | "md" | "lg"
} & CarouselProps

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

const { root, content, contentInner, item, previous, next } = carouselStyles

function useCarousel() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }

  return context
}

function Carousel({
  orientation = "horizontal",
  opts,
  setApi,
  plugins,
  activeIndex,
  defaultActiveIndex,
  onActiveIndexChange,
  align,
  draggable = true,
  groupSize,
  circular = false,
  autoplayInterval,
  motion = "default",
  appearance = "default",
  whitespace = "md",
  announcement,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & CarouselProps) {
  const allowedAlign = new Set(["start", "center", "end"])
  const resolvedAlign =
    typeof align === "function"
      ? align
      : typeof align === "string" && allowedAlign.has(align)
        ? align
        : typeof opts?.align === "function"
          ? opts.align
          : typeof opts?.align === "string" && allowedAlign.has(opts.align)
            ? opts.align
            : undefined

  const carouselOptions: CarouselOptions = {
    ...opts,
    axis: orientation === "horizontal" ? "x" : "y",
    draggable: draggable ?? opts?.draggable,
    slidesToScroll: groupSize ?? opts?.slidesToScroll,
    loop: circular ?? opts?.loop,
  }

  if (resolvedAlign !== undefined) {
    carouselOptions.align = resolvedAlign
  } else if ("align" in carouselOptions) {
    delete carouselOptions.align
  }

  const [carouselRef, api] = useEmblaCarousel(carouselOptions, plugins)
  const [canScrollPrev, setCanScrollPrev] = React.useState(false)
  const [canScrollNext, setCanScrollNext] = React.useState(false)

  function scrollPrev() {
    if (!api) return
    api?.scrollPrev()
  }

  function scrollNext() {
    api?.scrollNext()
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowLeft") {
      event.preventDefault()
      scrollPrev()
    } else if (event.key === "ArrowRight") {
      event.preventDefault()
      scrollNext()
    }
  }

  React.useEffect(() => {
    if (!api || !setApi) return
    setApi(api)
  }, [api, setApi])

  React.useEffect(() => {
    if (!api) return
    function handleSelect(currentApi: CarouselApi) {
      if (!currentApi) return
      setCanScrollPrev(currentApi.canScrollPrev())
      setCanScrollNext(currentApi.canScrollNext())
      onActiveIndexChange?.(currentApi.selectedScrollSnap())
    }

    handleSelect(api)
    api.on("reInit", handleSelect)
    api.on("select", handleSelect)

    return () => {
      api?.off("select", handleSelect)
    }
  }, [api, onActiveIndexChange])

  React.useEffect(() => {
    if (!api) return
    if (activeIndex === undefined) return
    api.scrollTo(activeIndex)
  }, [api, activeIndex])

  React.useEffect(() => {
    if (!api) return
    if (defaultActiveIndex === undefined) return
    api.scrollTo(defaultActiveIndex, true)
  }, [api, defaultActiveIndex])

  React.useEffect(() => {
    if (!api || !autoplayInterval || autoplayInterval <= 0) return
    const id = window.setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext()
      } else if (circular) {
        api.scrollTo(0)
      }
    }, autoplayInterval)
    return () => window.clearInterval(id)
  }, [api, autoplayInterval, circular])

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api: api,
        opts,
        orientation:
          orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
        appearance,
        whitespace,
      }}
    >
      <div
        onKeyDownCapture={handleKeyDown}
        className={root({ className })}
        role="region"
        aria-roledescription="carousel"
        data-slot="carousel"
        data-appearance={appearance}
        data-motion={motion}
        {...props}
      >
        {announcement && (
          <span className="sr-only" aria-live="polite">
            {announcement}
          </span>
        )}
        {children}
      </div>
    </CarouselContext.Provider>
  )
}

function CarouselContent({ className, ...props }: React.ComponentProps<"div">) {
  const { carouselRef, orientation, whitespace } = useCarousel()

  return (
    <div
      ref={carouselRef}
      className={content()}
      data-slot="carousel-content"
    >
      <div
        className={contentInner({ orientation, whitespace, className })}
        {...props}
      />
    </div>
  )
}

function CarouselItem({ className, ...props }: React.ComponentProps<"div">) {
  const { orientation, whitespace } = useCarousel()

  return (
    <div
      role="group"
      aria-roledescription="slide"
      data-slot="carousel-item"
      className={item({ orientation, whitespace, className })}
      {...props}
    />
  )
}

function CarouselPrevious({
  className,
  variant = "outline",
  size = "icon",
  ...props
}: React.ComponentProps<typeof Button>) {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel()

  return (
    <Button
      data-slot="carousel-previous"
      variant={variant}
      size={size}
      className={previous({ orientation, className })}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <p>
        <FaArrowLeft className="text-xs"/>
      </p>
      <span className="sr-only">Previous slide</span>
    </Button>
  )
}

function CarouselNext({
  className,
  variant = "outline",
  size = "icon",
  ...props
}: React.ComponentProps<typeof Button>) {
  const { orientation, scrollNext, canScrollNext } = useCarousel()

  return (
    <Button
      data-slot="carousel-next"
      variant={variant}
      size={size}
      className={next({ orientation, className })}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <p>
        <FaArrowRight className="text-xs"/>
      </p>
      <span className="sr-only">Next slide</span>
    </Button>
  )
}

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi
}
