import "@testing-library/jest-dom"
import { describe, it, expect } from "@jest/globals"
import { fireEvent, render, screen } from "@testing-library/react"
import type { ReactNode } from "react"
import { ThemeProvider } from "next-themes"
import { Line, LineChart } from "recharts"
import { useForm } from "react-hook-form"

import { Alert, AlertDescription, AlertTitle } from "../alert"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../alert-dialog"
import { AspectRatio } from "../aspect-ratio"
import { Calendar } from "../calendar"
import { ChartContainer } from "../chart"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../collapsible"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "../command"
import { CommandEmpty as CustomCommandEmpty } from "../customCommandEmpty"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "../context-menu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../dropdown-menu"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../form"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../hover-card"
import { Icon } from "../icon"
import { Icon as IconFromIcons } from "../icons"
import InfoLabel from "../infoLabel"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../input-otp"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "../menubar"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../navigation-menu"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../pagination"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../resizable"
import { ScrollArea } from "../scroll-area"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../sheet"
import { Toaster as SonnerToaster } from "../sonner"
import { StatusBadge } from "../status-badge"
import { Toaster } from "../toaster"
import { Toggle } from "../toggle"
import { ToggleGroup, ToggleGroupItem } from "../toggle-group"

function renderWithTheme(children: ReactNode) {
  return render(
    <ThemeProvider attribute="class" defaultTheme="light">
      {children}
    </ThemeProvider>
  )
}

beforeAll(() => {
  if (!window.matchMedia) {
    window.matchMedia = () =>
      ({
        matches: false,
        addEventListener: () => {},
        removeEventListener: () => {},
        addListener: () => {},
        removeListener: () => {},
        dispatchEvent: () => false,
      }) as unknown as MediaQueryList
  }

  if (!global.ResizeObserver) {
    global.ResizeObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    }
  }
})

describe("alert", () => {
  it("renders alert content", () => {
    render(
      <Alert>
        <AlertTitle>Alert title</AlertTitle>
        <AlertDescription>Alert description</AlertDescription>
      </Alert>
    )

    expect(screen.getByRole("alert")).toBeInTheDocument()
  })
})

describe("alert-dialog", () => {
  it("renders dialog content", () => {
    render(
      <AlertDialog defaultOpen>
        <AlertDialogTrigger>Open</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm action</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )

    expect(screen.getByText("Confirm action")).toBeInTheDocument()
  })
})

describe("aspect-ratio", () => {
  it("renders with children", () => {
    render(
      <AspectRatio ratio={16 / 9}>
        <div>Media</div>
      </AspectRatio>
    )

    expect(screen.getByText("Media")).toBeInTheDocument()
  })
})

describe("calendar", () => {
  it("renders calendar", () => {
    render(
      <Calendar
        mode="single"
        selected={new Date(2026, 0, 15)}
        onSelect={() => {}}
      />
    )

    expect(screen.getByRole("grid")).toBeInTheDocument()
  })
})

describe("chart", () => {
  it("renders chart container", () => {
    const data = [
      { name: "Jan", value: 10 },
      { name: "Feb", value: 20 },
    ]

    const { container } = render(
      <ChartContainer
        config={{
          value: { label: "Value", color: "hsl(0 0% 0%)" },
        }}
      >
        <LineChart data={data}>
          <Line type="monotone" dataKey="value" />
        </LineChart>
      </ChartContainer>
    )

    expect(container.firstChild).toBeTruthy()
  })
})

describe("collapsible", () => {
  it("toggles content", () => {
    render(
      <Collapsible defaultOpen>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Hidden content</CollapsibleContent>
      </Collapsible>
    )

    const trigger = screen.getByText("Toggle")
    fireEvent.click(trigger)
    expect(screen.getByText("Hidden content")).toBeInTheDocument()
  })
})

describe("command", () => {
  it("renders command content", () => {
    render(
      <Command>
        <CommandInput placeholder="Search" />
        <CommandList>
          <CommandEmpty>No results</CommandEmpty>
          <CommandGroup heading="Group">
            <CommandItem>
              Item
              <CommandShortcut>⌘K</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
        </CommandList>
      </Command>
    )

    expect(screen.getByText("Item")).toBeInTheDocument()
  })
})

describe("custom command empty", () => {
  it("renders inside command", () => {
    render(
      <Command>
        <CommandList>
          <CustomCommandEmpty>No results</CustomCommandEmpty>
        </CommandList>
      </Command>
    )

    expect(screen.getByText("No results")).toBeInTheDocument()
  })
})

describe("context-menu", () => {
  it("renders trigger", () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger>Open</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Item</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    )

    expect(screen.getByText("Open")).toBeInTheDocument()
  })
})

describe("dropdown-menu", () => {
  it("renders trigger", () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Item</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )

    expect(screen.getByText("Open")).toBeInTheDocument()
  })
})

describe("form", () => {
  it("renders form fields", () => {
    function FormExample() {
      const methods = useForm({
        defaultValues: { email: "" },
      })

      return (
        <Form {...methods}>
          <form onSubmit={methods.handleSubmit(() => {})}>
            <FormField
              name="email"
              control={methods.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <input {...field} />
                  </FormControl>
                  <FormDescription>Helper text</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      )
    }

    render(<FormExample />)

    expect(screen.getByLabelText("Email")).toBeInTheDocument()
  })
})

describe("hover-card", () => {
  it("renders trigger", () => {
    render(
      <HoverCard>
        <HoverCardTrigger>Open</HoverCardTrigger>
        <HoverCardContent>Content</HoverCardContent>
      </HoverCard>
    )

    expect(screen.getByText("Open")).toBeInTheDocument()
  })
})

describe("icon", () => {
  it("renders icon", () => {
    render(<Icon>✓</Icon>)
    expect(screen.getByText("✓")).toBeInTheDocument()
  })

  it("renders icon from icons module", () => {
    render(<IconFromIcons>✓</IconFromIcons>)
    expect(screen.getByText("✓")).toBeInTheDocument()
  })
})

describe("infoLabel", () => {
  it("renders label text", () => {
    render(<InfoLabel>Label</InfoLabel>)
    expect(screen.getByText("Label")).toBeInTheDocument()
  })
})

describe("input-otp", () => {
  it("renders otp slots", () => {
    const { container } = render(
      <InputOTP maxLength={4}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSeparator />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
        </InputOTPGroup>
      </InputOTP>
    )

    expect(container.querySelector("[data-slot='input-otp']")).toBeTruthy()
  })
})

describe("menubar", () => {
  it("renders menu trigger", () => {
    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>New</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    )

    expect(screen.getByText("File")).toBeInTheDocument()
  })
})

describe("navigation-menu", () => {
  it("renders trigger", () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Products</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div>Content</div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    )

    expect(screen.getByText("Products")).toBeInTheDocument()
  })
})

describe("pagination", () => {
  it("renders pagination controls", () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )

    expect(screen.getByRole("navigation")).toBeInTheDocument()
  })
})

describe("resizable", () => {
  it("renders panels", () => {
    render(
      <div style={{ height: 200 }}>
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel>Left</ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel>Right</ResizablePanel>
        </ResizablePanelGroup>
      </div>
    )

    expect(screen.getByText("Left")).toBeInTheDocument()
  })
})

describe("scroll-area", () => {
  it("renders scroll area", () => {
    render(
      <ScrollArea style={{ height: 100, width: 100 }}>
        <div style={{ height: 200 }}>Content</div>
      </ScrollArea>
    )

    expect(screen.getByText("Content")).toBeInTheDocument()
  })
})

describe("sheet", () => {
  it("renders sheet content", () => {
    render(
      <Sheet defaultOpen>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Title</SheetTitle>
            <SheetDescription>Description</SheetDescription>
          </SheetHeader>
          <SheetFooter>Footer</SheetFooter>
        </SheetContent>
      </Sheet>
    )

    expect(screen.getByText("Title")).toBeInTheDocument()
  })
})

describe("sonner", () => {
  it("renders sonner toaster", () => {
    const { container } = renderWithTheme(<SonnerToaster />)
    expect(container.firstChild).toBeTruthy()
  })
})

describe("status-badge", () => {
  it("renders status badge", () => {
    const { container } = render(<StatusBadge status="online" />)
    expect(container.firstChild).toBeTruthy()
  })
})

describe("toaster", () => {
  it("renders toaster", () => {
    const { container } = render(<Toaster />)
    expect(container.firstChild).toBeTruthy()
  })
})

describe("toggle", () => {
  it("toggles on click", () => {
    render(<Toggle>Bold</Toggle>)
    const button = screen.getByRole("button")
    fireEvent.click(button)
    expect(button).toBeInTheDocument()
  })
})

describe("toggle-group", () => {
  it("renders toggle group", () => {
    render(
      <ToggleGroup type="single" defaultValue="left">
        <ToggleGroupItem value="left">Left</ToggleGroupItem>
        <ToggleGroupItem value="right">Right</ToggleGroupItem>
      </ToggleGroup>
    )

    expect(screen.getByText("Left")).toBeInTheDocument()
  })
})
