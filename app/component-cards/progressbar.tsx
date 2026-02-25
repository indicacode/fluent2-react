import { Progress } from "@/components/progress"
export const progressbar_card = {
  header: "ProgressBar",
  subText:
    "A ProgressBar provides a visual representation of content being loaded or processed.",
  cards: [
    {
      cardComponent: <Progress value={40} />,
    },
    {
      cardHeader: "Guidelines",
      cardSubtext: "Progress feedback.",
      cardComponent: (
        <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground dark:text-slate-300">
          <li>Use determinate when you can measure progress.</li>
          <li>Use indeterminate for unknown durations.</li>
          <li>Keep thickness consistent within a page.</li>
        </ul>
      ),
    },
    {
      cardHeader: "Color",
      cardSubtext:
        "The color prop can be used to indicate a brand state (default), error state (red), warning state (orange), or success state (green).",
      cardComponent: (
        <div className="flex flex-col gap-2">
          <Progress value={40} indicatorClassName="bg-blue-600" />
          <Progress value={40} indicatorClassName="bg-red-500" />
          <Progress value={40} indicatorClassName="bg-yellow-500" />
          <Progress value={40} indicatorClassName="bg-green-500" />
        </div>
      ),
    },
    {
      cardHeader: "Indeterminate",
      cardSubtext:
        "ProgressBar is indeterminate when 'value' is undefined. Indeterminate ProgressBar is best used to show that an operation is being executed.",
      cardComponent: <Progress />,
    },
    {
      cardHeader: "Max",
      cardSubtext:
        "You can specify the maximum value of the determinate ProgressBar. This is useful for instances where you want to show capacity, or how much of a total has been uploaded/downloaded.",
      cardComponent: <Progress value={70} max={200} />,
    },
    {
      cardHeader: "Shape",
      cardSubtext:
        "The shape prop affects the corners of the bar. It can be rounded (default) or square.",
      cardComponent: (
        <div className="flex flex-col gap-2">
          <Progress value={60} className="rounded-full" />
          <Progress value={60} className="rounded-none" />
        </div>
      ),
    },
    {
      cardHeader: "Thickness",
      cardSubtext:
        "The thickness prop affects the size of the bar. It can be medium (default) or large.",
      cardComponent: (
        <div className="flex flex-col gap-2">
          <Progress value={60} className="h-2" />
          <Progress value={60} className="h-4" />
        </div>
      ),
    },
  ],
}
