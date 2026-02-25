import { RatingDisplay } from "@/components/rating-display"
import { Star16Filled, Star16Regular } from "@fluentui/react-icons"

export const ratingdisplay_card = {
  header: "RatingDisplay",
  subText:
    "RatingDisplay is used to communicate user sentiment. By default, it shows rating as filled stars out of 5, as well as a text displaying the average value and the aggregate number of ratings.",
  cards: [
    {
      cardComponent: <RatingDisplay value={4.2} count={128} />,
    },
    {
      cardHeader: "Guidelines",
      cardSubtext: "Display-only rating best practices.",
      cardComponent: (
        <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground dark:text-slate-300">
          <li>Show the average value and count together.</li>
          <li>Use compact mode in tight UI areas.</li>
          <li>Keep max consistent across lists.</li>
        </ul>
      ),
    },
    {
      cardHeader: "Value",
      cardSubtext:
        "The value controls the number of filled stars, and is written out next to the RatingDisplay. The number of filled stars is rounded to the nearest half-star.",
      cardComponent: <RatingDisplay value={3.5} />,
    },
    {
      cardHeader: "Count",
      cardSubtext:
        "You can specify the total number of ratings being displayed with the count.",
      cardComponent: <RatingDisplay value={4.2} count={320} />,
    },
    {
      cardHeader: "Compact",
      cardSubtext: "You can specify a compact RatingDisplay with compact.",
      cardComponent: <RatingDisplay value={4.2} count={128} compact />,
    },
    {
      cardHeader: "Max",
      cardSubtext:
        "You can specify the number of elements in the RatingDisplay with the max prop.",
      cardComponent: <RatingDisplay value={7.5} max={10} count={42} />,
    },
    {
      cardHeader: "Size",
      cardSubtext:
        "A RatingDisplay's size can be small, medium, large, or extra-large.",
      cardComponent: (
        <div className="flex flex-col gap-2">
          <RatingDisplay value={4.2} size="small" />
          <RatingDisplay value={4.2} size="medium" />
          <RatingDisplay value={4.2} size="large" />
          <RatingDisplay value={4.2} size="extra-large" />
        </div>
      ),
    },
    {
      cardHeader: "Color",
      cardSubtext:
        "A RatingDisplay's color can be neutral (default), brand, or marigold.",
      cardComponent: (
        <div className="flex flex-col gap-2">
          <RatingDisplay value={4.2} color="neutral" />
          <RatingDisplay value={4.2} color="brand" />
          <RatingDisplay value={4.2} color="marigold" />
        </div>
      ),
    },
    {
      cardHeader: "Shape",
      cardSubtext:
        "You can pass in custom icons to the Rating component. You can specify the icons with the iconFilled and iconOutline props.",
      cardComponent: (
        <RatingDisplay
          value={3.5}
          iconFilled={<Star16Filled />}
          iconOutline={<Star16Regular />}
        />
      ),
    },
  ],
}
