import { Rating } from "@/components/rating"
import { Star16Filled, Star16Regular } from "@fluentui/react-icons"
import { useState } from "react"

export const rating_card = {
  header: "Rating",
  subText:
    "A Rating component allows users to provide a rating for a particular item.",
  cards: [
    {
      cardComponent: <Rating defaultValue={3} />,
    },
    {
      cardHeader: "Guidelines",
      cardSubtext: "Usage and accessibility notes.",
      cardComponent: (
        <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground dark:text-slate-300">
          <li>Allow half steps only if it improves precision.</li>
          <li>Provide clear labels for screen readers.</li>
          <li>Consider read-only display for summaries.</li>
        </ul>
      ),
    },
    {
      cardHeader: "Controlled Value",
      cardSubtext:
        "The selected rating value can be controlled using the value and onChange props.",
      cardComponent: <ControlledRating />,
    },
    {
      cardHeader: "Step",
      cardSubtext: "You can specify half values in the Rating with step={0.5}.",
      cardComponent: <Rating defaultValue={2.5} step={0.5} />,
    },
    {
      cardHeader: "Max",
      cardSubtext:
        "You can specify the number of elements in the Rating with the max prop.",
      cardComponent: <Rating defaultValue={4} max={10} />,
    },
    {
      cardHeader: "Size",
      cardSubtext:
        "A Rating's size can be small, medium, large, or extra-large.",
      cardComponent: (
        <div className="flex flex-col gap-2">
          <Rating defaultValue={3} size="small" />
          <Rating defaultValue={3} size="medium" />
          <Rating defaultValue={3} size="large" />
          <Rating defaultValue={3} size="extra-large" />
        </div>
      ),
    },
    {
      cardHeader: "Color",
      cardSubtext:
        "A Rating's color can be neutral (default), brand, or marigold.",
      cardComponent: (
        <div className="flex flex-col gap-2">
          <Rating defaultValue={4} color="neutral" />
          <Rating defaultValue={4} color="brand" />
          <Rating defaultValue={4} color="marigold" />
        </div>
      ),
    },
    {
      cardHeader: "Shape",
      cardSubtext:
        "You can pass in custom icons to the Rating component. You can specify the icons with the iconFilled and iconOutline props.",
      cardComponent: (
        <Rating
          defaultValue={3.5}
          step={0.5}
          iconFilled={<Star16Filled />}
          iconOutline={<Star16Regular />}
        />
      ),
    },
  ],
}

function ControlledRating() {
  const [value, setValue] = useState(2)
  return <Rating value={value} onChange={(nextValue) => setValue(nextValue)} />
}
