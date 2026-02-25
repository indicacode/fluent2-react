import Button from "@/components/button"
import {
  TeachingPopover,
  TeachingPopoverBody,
  TeachingPopoverFooter,
  TeachingPopoverSurface,
  TeachingPopoverTitle,
  TeachingPopoverTrigger,
} from "@/components/teaching-popover"

export const teachingpopover_card = {
  header: "TeachingPopover",
  subText:
    "TeachingPopover helps guide users through new features and UI changes.",
  cards: [
    {
      cardComponent: (
        <TeachingPopover>
          <TeachingPopoverTrigger asChild>
            <Button variant="outline">Open</Button>
          </TeachingPopoverTrigger>
          <TeachingPopoverSurface>
            <TeachingPopoverTitle>Welcome</TeachingPopoverTitle>
            <TeachingPopoverBody>
              Learn about new features in this release.
            </TeachingPopoverBody>
            <TeachingPopoverFooter>
              <Button size="sm" variant="outline">
                Dismiss
              </Button>
              <Button size="sm">Next</Button>
            </TeachingPopoverFooter>
          </TeachingPopoverSurface>
        </TeachingPopover>
      ),
    },
    {
      cardHeader: "Guidelines",
      cardSubtext: "Teaching content usage.",
      cardComponent: (
        <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground dark:text-slate-300">
          <li>Keep steps short and focused on one action.</li>
          <li>Use a clear next/close action.</li>
          <li>Avoid covering critical UI controls.</li>
        </ul>
      ),
    },
  ],
}
