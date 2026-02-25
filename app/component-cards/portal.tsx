import Button from "@/components/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/popover"

export const portal_card = {
  header: "Portal",
  subText:
    "A portal renders content outside of a DOM tree, at the end of the document. This allows content to escape traditional boundaries caused by overflow: hidden CSS rules and keeps it on the top without using z-index rules.",
  cards: [
    {
      cardComponent: (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Open portal content</Button>
          </PopoverTrigger>
          <PopoverContent className="max-w-[240px]">
            This content renders in a portal, outside the normal DOM flow.
          </PopoverContent>
        </Popover>
      ),
    },
    {
      cardHeader: "Guidelines",
      cardSubtext: "When to use portals.",
      cardComponent: (
        <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground dark:text-slate-300">
          <li>Use portals for overlays, popovers, and menus.</li>
          <li>Avoid portals for simple inline content.</li>
          <li>Ensure focus is trapped when appropriate.</li>
        </ul>
      ),
    },
  ],
}
