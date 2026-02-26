# fluent2-react

React component library implementing the Microsoft Fluent 2 Design
System.

Built on top of Base UI primitives and distributed via shadcn/ui
registry.

------------------------------------------------------------------------

## ✨ Overview

`fluent2-react` is a React implementation of Microsoft's Fluent 2 Design
System, designed for modern applications built with React and Next.js.

The library provides:

-   Accessible components (ARIA compliant)
-   Design token alignment with Fluent 2
-   Composition-friendly APIs
-   Tailwind-compatible styling
-   Integration with shadcn/ui registry

------------------------------------------------------------------------

## 🏗 Architecture

-   **Framework:** React 18+
-   **Primitives:** Base UI
-   **Styling:** TailwindCSS
-   **Registry:** shadcn/ui
-   **Design System:** Microsoft Fluent 2

Structure philosophy:

-   Headless-first where possible
-   Controlled & uncontrolled APIs
-   Variant-based styling
-   Token-driven theming

------------------------------------------------------------------------

## 📦 Installation

1) Initialize shadcn (if your project does not have `components.json` yet):

``` bash
pnpm dlx shadcn@latest init
```

2) Add a component directly from the deployed registry:

``` bash
pnpm dlx shadcn@latest add "https://agreeable-moss-048e15a0f.1.azurestaticapps.net/r/button.json"
```

You can replace `button.json` with any component available under `/r/`
(for example: `form.json`, `input.json`, `dialog.json`).

3) Optional: configure a short registry alias in `components.json`:

``` json
{
  "registries": {
    "@fluent2": "https://agreeable-moss-048e15a0f.1.azurestaticapps.net/r/{name}.json"
  }
}
```

Then install by alias:

``` bash
pnpm dlx shadcn@latest add @fluent2/form @fluent2/input @fluent2/button
```

------------------------------------------------------------------------

## 🎨 Design Tokens

Tokens follow Fluent 2 specification:

-   Color (brand, neutral, semantic)
-   Typography
-   Radius
-   Spacing
-   Elevation
-   Motion

------------------------------------------------------------------------

## 🧩 Components Roadmap

### 🔹 Foundations

-   [ ] Color tokens
-   [ ] Typography tokens
-   [ ] Spacing scale
-   [ ] Radius scale
-   [ ] Elevation tokens
-   [ ] Motion tokens
-   [ ] Icon system

------------------------------------------------------------------------

### 🔹 Inputs

-   [ ] Button
-   [ ] IconButton
-   [ ] ToggleButton
-   [ ] SplitButton
-   [ ] Input (TextField)
-   [ ] TextArea
-   [ ] PasswordField
-   [ ] SearchBox
-   [ ] Checkbox
-   [ ] RadioGroup
-   [ ] Switch
-   [ ] Slider
-   [ ] Select
-   [ ] Combobox
-   [ ] Dropdown
-   [ ] DatePicker
-   [ ] TimePicker
-   [ ] FileUpload

------------------------------------------------------------------------

### 🔹 Navigation

-   [ ] Menu
-   [ ] ContextMenu
-   [ ] Tabs
-   [ ] Breadcrumb
-   [ ] Pagination
-   [ ] Navbar
-   [ ] Sidebar / Drawer
-   [ ] CommandBar
-   [ ] Toolbar

------------------------------------------------------------------------

### 🔹 Feedback

-   [ ] Alert
-   [ ] Toast
-   [ ] Dialog
-   [ ] Modal
-   [ ] Popover
-   [ ] Tooltip
-   [ ] ProgressBar
-   [ ] Spinner
-   [ ] Skeleton
-   [ ] MessageBar

------------------------------------------------------------------------

### 🔹 Data Display

-   [ ] Card
-   [ ] List
-   [ ] Table
-   [ ] DataGrid
-   [ ] Avatar
-   [ ] Badge
-   [ ] Tag
-   [ ] Divider
-   [ ] Accordion
-   [ ] TreeView

------------------------------------------------------------------------

### 🔹 Layout

-   [ ] Stack
-   [ ] Grid
-   [ ] Container
-   [ ] Separator

------------------------------------------------------------------------

### 🔹 Advanced

-   [ ] CommandPalette
-   [ ] RichTextEditor
-   [ ] VirtualizedList
-   [ ] DataGrid Pro features
-   [ ] Theming system (dark/light/brand)
-   [ ] RTL support

------------------------------------------------------------------------

## 🧪 Accessibility

All components aim to comply with:

-   WCAG 2.1 AA
-   ARIA best practices
-   Keyboard navigation
-   Focus management

------------------------------------------------------------------------

## 📚 Documentation

Documentation will include:

-   Usage examples
-   Accessibility notes
-   Theming guide
-   Design token reference
-   Integration examples (Next.js)

------------------------------------------------------------------------

## 🛣 Roadmap

1.  Foundations
2.  Core Inputs
3.  Navigation primitives
4.  Feedback components
5.  DataGrid
6.  Theming system
7.  Advanced patterns

------------------------------------------------------------------------

## 🤝 Contributing

Contributions are welcome.\
Please open an issue before large architectural changes.

------------------------------------------------------------------------

## 📄 License

MIT
