import { Spinner } from "@/components/spinner"

export const spinner_card = {
  header: "Spinner",
  subText:
    "A spinner alerts a user that content is being loaded or processed and they should wait for the activity to complete.",
  cards: [
    {
      cardComponent: <Spinner />,
    },
    {
      cardHeader: "Guidelines",
      cardSubtext: "Loading feedback patterns.",
      cardComponent: (
        <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground dark:text-slate-300">
          <li>Use a label for long-running tasks.</li>
          <li>Prefer small spinners in inline contexts.</li>
          <li>Keep animations subtle to reduce fatigue.</li>
        </ul>
      ),
    },
    {
      cardHeader: "Appearance",
      cardComponent: <Spinner />,
    },
    {
      cardHeader: "Labels",
      cardComponent: <Spinner label="Loading data" />,
    },
    {
      cardHeader: "Size",
      cardComponent: (
        <div className="flex items-center gap-3">
          <Spinner size="tiny" />
          <Spinner size="small" />
          <Spinner size="medium" />
          <Spinner size="large" />
          <Spinner size="extra-large" />
        </div>
      ),
    },
  ],
}
