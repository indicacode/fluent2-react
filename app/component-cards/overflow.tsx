import { Tag, TagGroup } from "@/components/tag"
import Button from "@/components/button"

export const overflow_card = {
  header: "Overflow",
  subText:
    "The Overflow and OverflowItem components, are low level utilities that enable users to create overflow experiences with any component. The components will detect and hide overflowing elements in DOM and manage the overflow state.",
  cards: [
    {
      cardComponent: (
        <div className="w-56 overflow-hidden rounded-md border border-border p-2">
          <TagGroup>
            <Tag>Alpha</Tag>
            <Tag>Beta</Tag>
            <Tag>Gamma</Tag>
            <Tag>Delta</Tag>
          </TagGroup>
        </div>
      ),
    },
    {
      cardHeader: "Guidelines",
      cardSubtext: "Overflow design patterns.",
      cardComponent: (
        <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground dark:text-slate-300">
          <li>Use overflow only when space is limited.</li>
          <li>Keep pinned items visible for context.</li>
          <li>Provide a way to access hidden items.</li>
        </ul>
      ),
    },
    {
      cardHeader: "Reverse Dom Order",
      cardSubtext: "Overflow can happen in reverse DOM order.",
      cardComponent: (
        <div className="w-56 overflow-hidden rounded-md border border-border p-2">
          <div className="flex flex-row-reverse gap-2">
            <Tag>One</Tag>
            <Tag>Two</Tag>
            <Tag>Three</Tag>
            <Tag>Four</Tag>
          </div>
        </div>
      ),
    },
    {
      cardHeader: "Minimum Visible",
      cardSubtext:
        "The Overflow component will stop overflowing past a certain number of minimum visible overflow items.",
      cardComponent: (
        <div className="w-56 overflow-hidden rounded-md border border-border p-2">
          <TagGroup>
            <Tag>Keep</Tag>
            <Tag>Visible</Tag>
            <Tag>Maybe</Tag>
            <Tag>Hidden</Tag>
          </TagGroup>
        </div>
      ),
    },
    {
      cardHeader: "Vertical",
      cardSubtext:
        "Use the overflowAxis property to switch different orientations.",
      cardComponent: (
        <div className="h-24 w-40 overflow-hidden rounded-md border border-border p-2">
          <div className="flex flex-col gap-2">
            <Tag>Row 1</Tag>
            <Tag>Row 2</Tag>
            <Tag>Row 3</Tag>
            <Tag>Row 4</Tag>
          </div>
        </div>
      ),
    },
    {
      cardHeader: "Overflow By Priority",
      cardSubtext:
        "By assigning each OverflowItem a numerical priority, the items can overflow in user configured order that does not follow DOM order.",
      cardComponent: (
        <div className="w-56 overflow-hidden rounded-md border border-border p-2">
          <TagGroup>
            <Tag>High</Tag>
            <Tag>Medium</Tag>
            <Tag>Low</Tag>
            <Tag>Lowest</Tag>
          </TagGroup>
        </div>
      ),
    },
    {
      cardHeader: "Wrapped",
      cardSubtext: "Overflow containers can be wrapped by other DOM elements.",
      cardComponent: (
        <div className="rounded-md border border-border p-2">
          <div className="w-48 overflow-hidden rounded-md border border-border p-2">
            <TagGroup>
              <Tag>Alpha</Tag>
              <Tag>Beta</Tag>
              <Tag>Gamma</Tag>
              <Tag>Delta</Tag>
            </TagGroup>
          </div>
        </div>
      ),
    },
    {
      cardHeader: "Pinned",
      cardSubtext:
        "An item can be pinned (always visible) by setting it to be a higher priority that all other overflow items. This can be useful when implementing selection scenarios where the selected item must always be visible.",
      cardComponent: (
        <div className="w-56 overflow-hidden rounded-md border border-border p-2">
          <TagGroup>
            <Tag appearance="brand">Pinned</Tag>
            <Tag>Alpha</Tag>
            <Tag>Beta</Tag>
            <Tag>Gamma</Tag>
          </TagGroup>
        </div>
      ),
    },
    {
      cardHeader: "Dividers",
      cardSubtext:
        "Dividers can be handled by assigning groups to overflow items. The visibility of the divider can be configured to depend on the overflow item group.",
      cardComponent: (
        <div className="w-56 overflow-hidden rounded-md border border-border p-2">
          <div className="flex items-center gap-2">
            <Tag>Left</Tag>
            <span className="h-4 w-px bg-secondary" />
            <Tag>Right</Tag>
            <Tag>More</Tag>
          </div>
        </div>
      ),
    },
    {
      cardHeader: "Larger Dividers",
      cardSubtext:
        "For smaller dividers the padding prop can be set to take into account the unmeasured space that the divider takes up. When a larger divider is used its width is not calculated. This causes items to overflow later than needed.",
      cardComponent: (
        <div className="w-56 overflow-hidden rounded-md border border-border p-2">
          <div className="flex items-center gap-2">
            <Tag>Left</Tag>
            <span className="h-5 w-2 bg-secondary" />
            <Tag>Right</Tag>
            <Tag>More</Tag>
          </div>
        </div>
      ),
    },
    {
      cardHeader: "Priority With Dividers",
      cardSubtext:
        "Overflow groups will respect the priority of overflow items.",
      cardComponent: (
        <div className="w-56 overflow-hidden rounded-md border border-border p-2">
          <div className="flex items-center gap-2">
            <Tag appearance="brand">Pinned</Tag>
            <span className="h-4 w-px bg-secondary" />
            <Tag>Alpha</Tag>
            <Tag>Beta</Tag>
          </div>
        </div>
      ),
    },
    {
      cardHeader: "Custom Component",
      cardSubtext:
        "It is possible to wrap the OverflowItem children with a custom component instead of rendering them directly.",
      cardComponent: (
        <div className="w-56 overflow-hidden rounded-md border border-border p-2">
          <Button size="sm">Custom</Button>
        </div>
      ),
    },
    {
      cardHeader: "Listen To Changes",
      cardSubtext:
        "You can listen to changes with the onOnverflowChange prop which will return the overflow state. This can be useful when you have other UI features that need to be triggered on changes to item visibility.",
      cardComponent: (
        <div className="w-56 overflow-hidden rounded-md border border-border p-2 text-xs text-muted-foreground">
          Resize to trigger overflow changes (manual demo).
        </div>
      ),
    },
  ],
}
