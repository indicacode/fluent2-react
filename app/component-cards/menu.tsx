import Button from "@/components/button"
import {
  Menu,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuItemCheckbox,
  MenuItemRadio,
  MenuLabel,
  MenuList,
  MenuRadioGroup,
  MenuSub,
  MenuSubContent,
  MenuSubTrigger,
  MenuTrigger,
} from "@/components/menu"
import { Copy16Filled } from "@fluentui/react-icons"
import { ClipboardPasteIcon, ScissorsIcon } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const handleMenuAction = (action: string) => {
  void action
  // Demo-only click handler to keep the example side-effect free.
}

export const menu_card = {
  header: "Menu",
  subText: (
    <>
      A menu displays a list of actions. The Menu component handles the state
      management of the passed in list of actions.
    </>
  ),
  cards: [
    {
      cardHeader: "Default",
      cardSubtext: "Basic usage and default styling.",
      cardComponent: (
        <Menu>
          <MenuTrigger asChild>
            <Button variant="outline">Open menu</Button>
          </MenuTrigger>
          <MenuList>
            <MenuItem>New</MenuItem>
            <MenuItem>Open</MenuItem>
            <MenuDivider />
            <MenuItem>Save</MenuItem>
          </MenuList>
        </Menu>
      ),
    },
    {
      cardHeader: "Guidelines",
      cardSubtext: "Menu behavior and content structure.",
      cardComponent: (
        <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground dark:text-slate-300">
          <li>Keep menu items short and action-oriented.</li>
          <li>Use dividers to separate logical groups.</li>
          <li>Prefer icons only when they add clarity.</li>
        </ul>
      ),
    },
    {
      cardHeader: "Interaction",
      cardSubtext:
        "Each sub component of the Menu that renders DOM elements can be assigned HTML event listeners.",
      cardComponent: (
        <Menu>
          <MenuTrigger asChild>
            <Button variant="outline">Edit</Button>
          </MenuTrigger>
          <MenuList>
            <MenuItem onClick={() => handleMenuAction("cut")}>Cut</MenuItem>
            <MenuItem onClick={() => handleMenuAction("copy")}>Copy</MenuItem>
            <MenuItem onClick={() => handleMenuAction("paste")}>Paste</MenuItem>
          </MenuList>
        </Menu>
      ),
    },
    {
      cardHeader: "Menu Item Link Navigation",
      cardSubtext:
        "To implement a navigation menu, simply use the MenuItemLink component that provides the correct semantics for link based navigation.",
      cardComponent: (
        <Menu>
          <MenuTrigger asChild>
            <Button variant="outline">Navigate</Button>
          </MenuTrigger>
          <MenuList>
            <MenuItem>
              <Link href="/">Home Page</Link>
            </MenuItem>
            <MenuItem>
              <Link target="_blank" href="https://grbtec.com.br">
                Company Home
              </Link>
            </MenuItem>
          </MenuList>
        </Menu>
      ),
    },
    {
      cardHeader: "Menu Items With Icons",
      cardSubtext: "Basic usage and default styling.",
      cardComponent: (
        <Menu>
          <MenuTrigger asChild>
            <Button variant="outline">Edit</Button>
          </MenuTrigger>
          <MenuList hasIcons>
            <MenuItem>
              <ScissorsIcon size={18} /> Cut
            </MenuItem>
            <MenuItem>
              <Copy16Filled /> Copy
            </MenuItem>
            <MenuItem>
              <ClipboardPasteIcon size={15} /> Paste
            </MenuItem>
          </MenuList>
        </Menu>
      ),
    },
    {
      cardHeader: "Aligning With Icons",
      cardSubtext:
        "The hasIcons prop will align menu items if only a subset of menu items contain an icon.",
      cardComponent: (
        <Menu>
          <MenuTrigger asChild>
            <Button variant="outline">Aligned</Button>
          </MenuTrigger>
          <MenuList hasIcons>
            <MenuItem>
              <ScissorsIcon size={18} /> Cut
            </MenuItem>
            <MenuItem>Copy</MenuItem>
            <MenuItem>
              <ClipboardPasteIcon size={15} /> Paste
            </MenuItem>
          </MenuList>
        </Menu>
      ),
    },
    {
      cardHeader: "Aligning With Selectable Items",
      cardSubtext:
        "The hasCheckmarks prop will align menu items if only a subset of menu items are selectable.",
      cardComponent: (
        <Menu>
          <MenuTrigger asChild>
            <Button variant="outline">Selectable</Button>
          </MenuTrigger>
          <MenuList hasCheckmarks>
            <MenuItem>New Tab</MenuItem>
            <MenuItemCheckbox checked>Share</MenuItemCheckbox>
            <MenuItem>Print</MenuItem>
          </MenuList>
        </Menu>
      ),
    },
    {
      cardHeader: "Secondary Content For Menu Items",
      cardSubtext: "Basic usage and default styling.",
      cardComponent: (
        <Menu>
          <MenuTrigger asChild>
            <Button variant="outline">File</Button>
          </MenuTrigger>
          <MenuList>
            <MenuItem>
              New Tab <span className="ml-auto text-xs text-muted-foreground">⌘T</span>
            </MenuItem>
            <MenuItem>
              New Window <span className="ml-auto text-xs text-muted-foreground">⌘N</span>
            </MenuItem>
          </MenuList>
        </Menu>
      ),
    },
    {
      cardHeader: "Controlling Open And Close",
      cardSubtext: "Basic usage and default styling.",
      cardComponent: <ControlledMenu />,
    },
    {
      cardHeader: "Grouping Items",
      cardSubtext: "Basic usage and default styling.",
      cardComponent: (
        <Menu>
          <MenuTrigger asChild>
            <Button variant="outline">Grouped</Button>
          </MenuTrigger>
          <MenuList>
            <MenuGroup>
              <MenuLabel>Actions</MenuLabel>
              <MenuItem>New</MenuItem>
              <MenuItem>Open</MenuItem>
            </MenuGroup>
            <MenuDivider />
            <MenuGroup>
              <MenuLabel>Sharing</MenuLabel>
              <MenuItem>Share</MenuItem>
              <MenuItem>Print</MenuItem>
            </MenuGroup>
          </MenuList>
        </Menu>
      ),
    },
    {
      cardHeader: "Radio Items",
      cardSubtext: "Basic usage and default styling.",
      cardComponent: (
        <Menu>
          <MenuTrigger asChild>
            <Button variant="outline">Sort</Button>
          </MenuTrigger>
          <MenuList>
            <MenuRadioGroup value="date">
              <MenuItemRadio value="date">Date</MenuItemRadio>
              <MenuItemRadio value="name">Name</MenuItemRadio>
            </MenuRadioGroup>
          </MenuList>
        </Menu>
      ),
    },
    {
      cardHeader: "Submenus",
      cardSubtext: "Basic usage and default styling.",
      cardComponent: (
        <Menu>
          <MenuTrigger asChild>
            <Button variant="outline">Share</Button>
          </MenuTrigger>
          <MenuList>
            <MenuItem>Email</MenuItem>
            <MenuSub>
              <MenuSubTrigger>More</MenuSubTrigger>
              <MenuSubContent>
                <MenuItem>Slack</MenuItem>
                <MenuItem>Teams</MenuItem>
              </MenuSubContent>
            </MenuSub>
          </MenuList>
        </Menu>
      ),
    },
  ],
}

function ControlledMenu() {
  const [open, setOpen] = useState(false)

  return (
    <Menu open={open} onOpenChange={(next) => setOpen(!!next)}>
      <MenuTrigger asChild>
        <Button variant="outline">{open ? "Close" : "Open"}</Button>
      </MenuTrigger>
      <MenuList>
        <MenuItem>New</MenuItem>
        <MenuItem>Open</MenuItem>
      </MenuList>
    </Menu>
  )
}
