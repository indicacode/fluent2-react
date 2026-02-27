"use client"

import {
  Menu,
  MenuDivider,
  MenuItem,
  MenuList,
  MenuTrigger,
} from "@/components/menu"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tabs"
import { ToggleGroup, ToggleGroupItem } from "@/components/toggle-group"
import { Toolbar, ToolbarButton } from "@/components/toolbar"
import { cn } from "@/lib/utils"
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  CalendarDays,
  ChartColumn,
  ClipboardPaste,
  Copy,
  Grid3X3,
  Image,
  IndentIncrease,
  Italic,
  List,
  PaintBucket,
  Paintbrush,
  Redo2,
  Ruler,
  Save,
  Scissors,
  Shapes,
  Sparkles,
  Type,
  Underline,
  Undo2,
  ZoomIn,
  ZoomOut,
  type LucideIcon,
} from "lucide-react"
import { CaretDownIcon } from "@phosphor-icons/react"
import { type ReactNode } from "react"

type RibbonTab = "home" | "insert" | "view" | "picture"

type MicrosoftRibbonProps = {
  className?: string
  defaultTab?: RibbonTab
  showPictureTools?: boolean
}

function QuickAccessButton({
  icon: Icon,
  label,
}: {
  icon: LucideIcon
  label: string
}) {
  return (
    <ToolbarButton
      aria-label={label}
      className="h-8 min-w-8 box-border rounded-sm border border-transparent px-1.5 text-muted-foreground hover:border-border/70 hover:bg-muted hover:text-foreground"
    >
      <Icon className="size-4" />
    </ToolbarButton>
  )
}

function RibbonLargeButton({
  icon: Icon,
  label,
}: {
  icon: LucideIcon
  label: string
}) {
  return (
    <ToolbarButton
      className="h-full min-h-[88px] w-[88px] box-border flex-col items-center gap-1 rounded-sm border border-transparent px-2 py-2 text-[11px] leading-tight hover:border-border/70 hover:bg-muted"
    >
      <Icon className="size-5" />
      <span className="text-center">{label}</span>
    </ToolbarButton>
  )
}

function RibbonSmallButton({
  icon: Icon,
  label,
  className,
}: {
  icon: LucideIcon
  label: string
  className?: string
}) {
  return (
    <ToolbarButton
      className={cn(
        "h-8 w-full box-border justify-start gap-2 rounded-sm border border-transparent px-2 text-xs text-foreground hover:border-border/70 hover:bg-muted",
        className
      )}
    >
      <Icon className="size-4" />
      <span>{label}</span>
    </ToolbarButton>
  )
}

function RibbonGroup({
  title,
  children,
  className,
}: {
  title: string
  children: ReactNode
  className?: string
}) {
  return (
    <section
      className={cn(
        "flex min-h-32 min-w-[182px] flex-col border-r border-border/70 last:border-r-0",
        className
      )}
    >
      <div className="flex flex-1 px-3 py-2.5">
        <Toolbar
          size="small"
          className="h-full w-full items-start gap-2.5 border-0 bg-transparent p-0"
        >
          {children}
        </Toolbar>
      </div>
      <div className="border-t border-border/70 px-2 py-1.5 text-center text-[11px] text-muted-foreground">
        {title}
      </div>
    </section>
  )
}

function RibbonTrailingLabelSeparator() {
  return (
    <div aria-hidden className="pointer-events-none flex min-h-32 min-w-2 flex-1 flex-col">
      <div className="flex-1" />
      <div className="h-7 border-t border-border/70" />
    </div>
  )
}

function FileMenu() {
  return (
    <Menu>
      <MenuTrigger className="flex h-8 box-border items-center gap-1 rounded-sm border border-primary/90 bg-primary px-3 text-xs font-medium text-primary-foreground hover:bg-primary/90">
        File
        <CaretDownIcon size={12} />
      </MenuTrigger>
      <MenuList>
        <MenuItem>New</MenuItem>
        <MenuItem>Open</MenuItem>
        <MenuItem>Save</MenuItem>
        <MenuDivider />
        <MenuItem>Share</MenuItem>
        <MenuItem>Export</MenuItem>
      </MenuList>
    </Menu>
  )
}

export function MicrosoftRibbon({
  className,
  defaultTab = "home",
  showPictureTools = false,
}: MicrosoftRibbonProps) {
  const initialTab = showPictureTools && defaultTab === "picture" ? "picture" : defaultTab

  return (
    <Tabs
      defaultValue={initialTab}
      className={cn("w-full overflow-hidden rounded-md border border-border bg-background", className)}
    >
      <div className="flex items-center justify-between border-b border-border bg-muted/40 px-3 py-1.5">
        <Toolbar size="small" className="gap-1 border-0 bg-transparent p-0">
          <QuickAccessButton icon={Save} label="Save" />
          <QuickAccessButton icon={Undo2} label="Undo" />
          <QuickAccessButton icon={Redo2} label="Redo" />
        </Toolbar>

        <span className="text-xs text-muted-foreground">Document1.docx</span>

        <Toolbar size="small" className="border-0 bg-transparent p-0">
          <ToolbarButton className="h-8 box-border rounded-sm border border-transparent px-2 text-xs text-muted-foreground hover:border-border/70 hover:bg-muted">
            Share
          </ToolbarButton>
        </Toolbar>
      </div>

      <div className="flex items-end justify-between gap-3 border-b border-border bg-background px-3 pt-1.5">
        <div className="flex items-end gap-2">
          <FileMenu />
          <TabsList className="h-10 gap-1 rounded-none bg-transparent p-0">
            <TabsTrigger
              value="home"
              className="relative h-9 box-border rounded-t-sm border border-transparent px-3 py-1.5 text-xs hover:bg-muted/70 data-[active]:border data-[active]:border-border data-[active]:border-b data-[active]:border-b-background data-[active]:bg-background data-[active]:font-medium after:absolute after:right-2 after:bottom-[2px] after:left-2 after:h-0.5 after:rounded-full after:bg-primary after:opacity-0 after:transition-opacity data-[active]:after:opacity-100"
            >
              Home
            </TabsTrigger>
            <TabsTrigger
              value="insert"
              className="relative h-9 box-border rounded-t-sm border border-transparent px-3 py-1.5 text-xs hover:bg-muted/70 data-[active]:border data-[active]:border-border data-[active]:border-b data-[active]:border-b-background data-[active]:bg-background data-[active]:font-medium after:absolute after:right-2 after:bottom-[2px] after:left-2 after:h-0.5 after:rounded-full after:bg-primary after:opacity-0 after:transition-opacity data-[active]:after:opacity-100"
            >
              Insert
            </TabsTrigger>
            <TabsTrigger
              value="view"
              className="relative h-9 box-border rounded-t-sm border border-transparent px-3 py-1.5 text-xs hover:bg-muted/70 data-[active]:border data-[active]:border-border data-[active]:border-b data-[active]:border-b-background data-[active]:bg-background data-[active]:font-medium after:absolute after:right-2 after:bottom-[2px] after:left-2 after:h-0.5 after:rounded-full after:bg-primary after:opacity-0 after:transition-opacity data-[active]:after:opacity-100"
            >
              View
            </TabsTrigger>
            {showPictureTools && (
              <TabsTrigger
                value="picture"
                className="relative h-9 box-border rounded-t-sm border border-transparent px-3 py-1.5 text-xs text-info-foreground hover:bg-info/50 data-[active]:border data-[active]:border-info-foreground/35 data-[active]:border-b data-[active]:border-b-background data-[active]:bg-info data-[active]:font-medium after:absolute after:right-2 after:bottom-[2px] after:left-2 after:h-0.5 after:rounded-full after:bg-info-foreground after:opacity-0 after:transition-opacity data-[active]:after:opacity-100"
              >
                Picture Tools
              </TabsTrigger>
            )}
          </TabsList>
        </div>

        <span className="pb-1 pr-1 text-[11px] text-muted-foreground">Tell me what you want to do</span>
      </div>

      <TabsContent value="home" className="mt-0 px-1 py-1">
        <div className="flex w-full gap-1.5 overflow-x-auto bg-background">
          <RibbonGroup title="Clipboard" className="min-w-[210px]">
            <RibbonLargeButton icon={ClipboardPaste} label="Paste" />
            <div className="grid flex-1 grid-cols-1 gap-1">
              <RibbonSmallButton icon={Scissors} label="Cut" />
              <RibbonSmallButton icon={Copy} label="Copy" />
              <RibbonSmallButton icon={Paintbrush} label="Format Painter" />
            </div>
          </RibbonGroup>

          <RibbonGroup title="Font" className="min-w-[260px]">
            <div className="flex w-full flex-col gap-2">
              <div className="flex gap-1">
                <Select defaultValue="Segoe UI">
                  <SelectTrigger className="h-8 w-[145px] border border-border text-xs hover:border-border hover:border-b active:border-border active:border-b">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Segoe UI">Segoe UI</SelectItem>
                      <SelectItem value="Calibri">Calibri</SelectItem>
                      <SelectItem value="Cambria">Cambria</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Select defaultValue="11">
                  <SelectTrigger className="h-8 w-[64px] border border-border text-xs hover:border-border hover:border-b active:border-border active:border-b">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="11">11</SelectItem>
                      <SelectItem value="12">12</SelectItem>
                      <SelectItem value="14">14</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-1">
                <ToggleGroup defaultValue={["bold"]} className="gap-1">
                  <ToggleGroupItem value="bold" size="sm" aria-label="Bold">
                    <Bold className="size-3.5" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="italic" size="sm" aria-label="Italic">
                    <Italic className="size-3.5" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="underline" size="sm" aria-label="Underline">
                    <Underline className="size-3.5" />
                  </ToggleGroupItem>
                </ToggleGroup>
                <RibbonSmallButton
                  icon={PaintBucket}
                  label="Text Color"
                  className="h-8 max-w-[116px]"
                />
              </div>
            </div>
          </RibbonGroup>

          <RibbonGroup title="Paragraph" className="min-w-[235px]">
            <div className="flex w-full flex-col gap-1">
              <ToggleGroup defaultValue={["align-left"]} className="gap-1">
                <ToggleGroupItem value="align-left" size="sm" aria-label="Align Left">
                  <AlignLeft className="size-3.5" />
                </ToggleGroupItem>
                <ToggleGroupItem value="align-center" size="sm" aria-label="Align Center">
                  <AlignCenter className="size-3.5" />
                </ToggleGroupItem>
                <ToggleGroupItem value="align-right" size="sm" aria-label="Align Right">
                  <AlignRight className="size-3.5" />
                </ToggleGroupItem>
              </ToggleGroup>
              <div className="flex gap-1">
                <RibbonSmallButton icon={List} label="Bullets" className="h-8 max-w-[108px]" />
                <RibbonSmallButton
                  icon={IndentIncrease}
                  label="Increase Indent"
                  className="h-8"
                />
              </div>
            </div>
          </RibbonGroup>
          <RibbonTrailingLabelSeparator />
        </div>
      </TabsContent>

      <TabsContent value="insert" className="mt-0 px-1 py-1">
        <div className="flex w-full gap-1.5 overflow-x-auto bg-background">
          <RibbonGroup title="Illustrations" className="min-w-[230px]">
            <RibbonLargeButton icon={Image} label="Pictures" />
            <div className="grid flex-1 grid-cols-1 gap-1">
              <RibbonSmallButton icon={Shapes} label="Shapes" />
              <RibbonSmallButton icon={Sparkles} label="Icons" />
              <RibbonSmallButton icon={ChartColumn} label="Chart" />
            </div>
          </RibbonGroup>

          <RibbonGroup title="Text" className="min-w-[230px]">
            <RibbonLargeButton icon={Type} label="Text Box" />
            <div className="grid flex-1 grid-cols-1 gap-1">
              <RibbonSmallButton icon={Type} label="WordArt" />
              <RibbonSmallButton icon={CalendarDays} label="Date & Time" />
              <RibbonSmallButton icon={Type} label="Signature Line" />
            </div>
          </RibbonGroup>
          <RibbonTrailingLabelSeparator />
        </div>
      </TabsContent>

      <TabsContent value="view" className="mt-0 px-1 py-1">
        <div className="flex w-full gap-1.5 overflow-x-auto bg-background">
          <RibbonGroup title="Show" className="min-w-[250px]">
            <div className="flex w-full flex-col gap-1">
              <ToggleGroup defaultValue={["ruler", "gridlines"]} className="w-full gap-1">
                <ToggleGroupItem value="ruler" size="sm">
                  <Ruler className="size-3.5" />
                  <span className="text-xs">Ruler</span>
                </ToggleGroupItem>
                <ToggleGroupItem value="gridlines" size="sm">
                  <Grid3X3 className="size-3.5" />
                  <span className="text-xs">Gridlines</span>
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </RibbonGroup>

          <RibbonGroup title="Zoom" className="min-w-[230px]">
            <div className="grid w-full grid-cols-2 gap-1">
              <RibbonSmallButton icon={ZoomIn} label="Zoom In" />
              <RibbonSmallButton icon={ZoomOut} label="Zoom Out" />
              <ToolbarButton className="col-span-2 h-8 w-full box-border rounded-sm border border-transparent px-2 text-xs hover:border-border/70 hover:bg-muted">
                100%
              </ToolbarButton>
            </div>
          </RibbonGroup>
          <RibbonTrailingLabelSeparator />
        </div>
      </TabsContent>

      {showPictureTools && (
        <TabsContent value="picture" className="mt-0 px-1 py-1">
          <div className="flex w-full gap-1.5 overflow-x-auto bg-info/30">
            <RibbonGroup title="Adjust" className="min-w-[230px]">
              <RibbonLargeButton icon={PaintBucket} label="Remove Background" />
              <div className="grid flex-1 grid-cols-1 gap-1">
                <RibbonSmallButton icon={Sparkles} label="Corrections" />
                <RibbonSmallButton icon={PaintBucket} label="Color" />
                <RibbonSmallButton icon={Image} label="Compress" />
              </div>
            </RibbonGroup>

            <RibbonGroup title="Picture Styles" className="min-w-[210px] border-r-0">
              <div className="grid w-full grid-cols-1 gap-1">
                <RibbonSmallButton icon={Image} label="Picture Border" />
                <RibbonSmallButton icon={Sparkles} label="Picture Effects" />
                <RibbonSmallButton icon={Shapes} label="Picture Layout" />
              </div>
            </RibbonGroup>
            <RibbonTrailingLabelSeparator />
          </div>
        </TabsContent>
      )}
    </Tabs>
  )
}
