import Button from "@/components/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/popover"
import Tooltip from "@/components/tooltip"
import {
  Toolbar,
  ToolbarButton,
  ToolbarDivider,
  ToolbarGroup,
  ToolbarRadioButton,
  ToolbarRadioGroup,
  ToolbarToogleButton,
} from "@/components/toolbar"
export const toolbar_card = {
  header: "Toolbar",
  subText:
    "A toolbar is a container for grouping a set of controls, such as buttons, menu buttons, or checkboxes.",
  cards: [
    {
      cardComponent: (
        <Toolbar>
          <ToolbarButton>Bold</ToolbarButton>
          <ToolbarButton>Italic</ToolbarButton>
          <ToolbarDivider />
          <ToolbarButton>Link</ToolbarButton>
        </Toolbar>
      ),
    },
    {
      cardHeader: "Small",
      cardSubtext:
        "The size determines the spacing around the toolbar controls. A small sized toolbar has no vertical padding and uses 4px for horizontal padding.",
      cardComponent: (
        <Toolbar size="small">
          <ToolbarButton>Cut</ToolbarButton>
          <ToolbarButton>Copy</ToolbarButton>
          <ToolbarButton>Paste</ToolbarButton>
        </Toolbar>
      ),
    },
    {
      cardHeader: "Medium",
      cardSubtext:
        "The size determines the spacing around the toolbar controls. A medium sized toolbar uses 4px for vertical padding and 8px for horizontal padding.",
      cardComponent: (
        <Toolbar size="medium">
          <ToolbarButton>Undo</ToolbarButton>
          <ToolbarButton>Redo</ToolbarButton>
          <ToolbarDivider />
          <ToolbarButton>Save</ToolbarButton>
        </Toolbar>
      ),
    },
    {
      cardHeader: "Large",
      cardSubtext:
        "The size determines the spacing around the toolbar controls. A large sized toolbar uses 4px for vertical padding and 20px for horizontal padding.",
      cardComponent: (
        <Toolbar size="large">
          <ToolbarButton>Share</ToolbarButton>
          <ToolbarButton>Download</ToolbarButton>
        </Toolbar>
      ),
    },
    {
      cardHeader: "Overflow Items",
      cardSubtext:
        "This example uses the Overflow component and utilities, Please refer to the documentation to achieve more complex scenarios.",
      cardComponent: (
        <div className="w-56 overflow-hidden">
          <Toolbar>
            <ToolbarButton>Item 1</ToolbarButton>
            <ToolbarButton>Item 2</ToolbarButton>
            <ToolbarButton>Item 3</ToolbarButton>
            <ToolbarButton>Item 4</ToolbarButton>
          </Toolbar>
        </div>
      ),
    },
    {
      cardHeader: "With Tooltip",
      cardComponent: (
        <Toolbar>
          <Tooltip content="Bold" relationship="label">
            <ToolbarButton>B</ToolbarButton>
          </Tooltip>
          <Tooltip content="Italic" relationship="label">
            <ToolbarButton>I</ToolbarButton>
          </Tooltip>
        </Toolbar>
      ),
    },
    {
      cardHeader: "With Popover",
      cardComponent: (
        <Toolbar>
          <Popover>
            <PopoverTrigger asChild>
              <ToolbarButton>Settings</ToolbarButton>
            </PopoverTrigger>
            <PopoverContent className="w-48">
              <div className="text-sm text-muted-foreground">Popover content</div>
            </PopoverContent>
          </Popover>
        </Toolbar>
      ),
    },
    {
      cardHeader: "Guidelines",
      cardSubtext: "Grouping and density.",
      cardComponent: (
        <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground dark:text-slate-300">
          <li>Group related actions with dividers.</li>
          <li>Use tooltips for icon-only buttons.</li>
          <li>Keep the most important actions leftmost.</li>
        </ul>
      ),
    },
    {
      cardHeader: "Subtle",
      cardComponent: (
        <Toolbar>
          <ToolbarButton className="text-muted-foreground">Preview</ToolbarButton>
          <ToolbarButton className="text-muted-foreground">Share</ToolbarButton>
        </Toolbar>
      ),
    },
    {
      cardHeader: "Controlled Toggle Button",
      cardComponent: (
        <Toolbar>
          <ToolbarGroup defaultValue={["bold"]}>
            <ToolbarToogleButton value="bold">B</ToolbarToogleButton>
            <ToolbarToogleButton value="italic">I</ToolbarToogleButton>
          </ToolbarGroup>
        </Toolbar>
      ),
    },
    {
      cardHeader: "Vertical",
      cardComponent: (
        <Toolbar vertical>
          <ToolbarButton>Up</ToolbarButton>
          <ToolbarButton>Down</ToolbarButton>
        </Toolbar>
      ),
    },
    {
      cardHeader: "Vertical Button",
      cardComponent: (
        <Toolbar vertical>
          <ToolbarButton>Left</ToolbarButton>
          <ToolbarButton>Right</ToolbarButton>
        </Toolbar>
      ),
    },
    {
      cardHeader: "Far Group",
      cardComponent: (
        <Toolbar className="justify-between">
          <div className="flex items-center gap-2">
            <ToolbarButton>Cut</ToolbarButton>
            <ToolbarButton>Copy</ToolbarButton>
          </div>
          <Button size="sm">Done</Button>
        </Toolbar>
      ),
    },
  ],
}
