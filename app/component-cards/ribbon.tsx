import { MicrosoftRibbon } from "@/components/ribbon"
import { Switch } from "@/components/switch"
import { useState } from "react"

export const ribbon_card = {
  header: "Ribbon",
  subText:
    "Microsoft Ribbon inspired command surface built only with Base UI primitives (Tabs, Menu, Select, Toggle Group and Toolbar wrappers).",
  cards: [
    {
      cardHeader: "Interactive Demo",
      cardSubtext:
        "Enable Picture Tools to show a contextual tab, similar to the Windows Ribbon pattern.",
      cardComponent: <RibbonShowcase />,
    },
  ],
}

function RibbonShowcase() {
  const [showPictureTools, setShowPictureTools] = useState(false)

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center gap-2">
        <Switch
          checked={showPictureTools}
          onCheckedChange={(checked) => setShowPictureTools(Boolean(checked))}
        />
        <span className="text-sm text-muted-foreground">Show contextual tab: Picture Tools</span>
      </div>
      <MicrosoftRibbon showPictureTools={showPictureTools} />
    </div>
  )
}
