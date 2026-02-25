import { Tag, TagGroup } from "@/components/tag"
import { Avatar, AvatarFallback } from "@/components/avatar"
import { Check } from "@phosphor-icons/react"

export const tag_card = {
  header: "Tag",
  subText:
    "A Tag provides a visual representation of an attribute, person, or asset.",
  cards: [
    {
      cardComponent: (
        <TagGroup>
          <Tag>Default</Tag>
          <Tag appearance="outline">Outline</Tag>
          <Tag appearance="brand">Brand</Tag>
        </TagGroup>
      ),
    },
    {
      cardHeader: "Guidelines",
      cardSubtext: "Tag density and semantics.",
      cardComponent: (
        <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground dark:text-slate-300">
          <li>Use tags for short descriptors or filters.</li>
          <li>Keep secondary text brief and optional.</li>
          <li>Provide dismiss actions only when needed.</li>
        </ul>
      ),
    },
    {
      cardHeader: "Icon",
      cardSubtext: "A Tag can render a custom icon if provided.",
      cardComponent: <Tag icon={<Check size={16} />}>Approved</Tag>,
    },
    {
      cardHeader: "Media",
      cardSubtext: "A tag can render a media, for example an Avatar.",
      cardComponent: (
        <Tag
          media={
            <Avatar size="sm">
              <AvatarFallback>AR</AvatarFallback>
            </Avatar>
          }
        >
          Alex
        </Tag>
      ),
    },
    {
      cardHeader: "SecondaryText",
      cardSubtext: "A Tag can have a secondary text.",
      cardComponent: <Tag secondaryText="Secondary">Primary</Tag>,
    },
    {
      cardHeader: "Dismiss",
      cardSubtext:
        "A tag can have a dismiss icon and become focusable. TagGroup can handle dismiss for a collection of tags.",
      cardComponent: <Tag dismissible>Dismiss me</Tag>,
    },
    {
      cardHeader: "Shape",
      cardSubtext: "A tag can be rounded or circular.",
      cardComponent: (
        <TagGroup>
          <Tag shape="rounded">Rounded</Tag>
          <Tag shape="circular">Circular</Tag>
        </TagGroup>
      ),
    },
    {
      cardHeader: "Size",
      cardSubtext:
        "A tag supports medium, small and extra-small size. Default size is medium.",
      cardComponent: (
        <TagGroup>
          <Tag size="extra-small">XS</Tag>
          <Tag size="small">Small</Tag>
          <Tag size="medium">Medium</Tag>
        </TagGroup>
      ),
    },
    {
      cardHeader: "Appearance",
      cardSubtext:
        "A tag can have a filled, outline or brand appearance. The default is filled.",
      cardComponent: (
        <TagGroup>
          <Tag appearance="filled">Filled</Tag>
          <Tag appearance="outline">Outline</Tag>
          <Tag appearance="brand">Brand</Tag>
        </TagGroup>
      ),
    },
    {
      cardHeader: "Disabled",
      cardComponent: <Tag disabled>Disabled</Tag>,
    },
    {
      cardHeader: "Selected",
      cardComponent: <Tag selected>Selected</Tag>,
    },
  ],
}
