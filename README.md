# fluent2-react

Fluent 2-inspired React components built with Base UI primitives, Tailwind CSS, and distributed through a shadcn/ui registry.

## Overview

This repository contains:

- A Next.js docs/playground app (`app/`)
- Reusable components (`components/`)
- Registry-ready component packages (`registry/fluent2tailwind/`)

Core goals:

- Fluent 2 visual language and interaction patterns
- Accessible components (keyboard + ARIA-focused)
- Composition-friendly React APIs
- Easy installation through shadcn registry

## Tech Stack

- React 19
- Next.js 16 (App Router)
- Base UI primitives
- Tailwind CSS 4 + `tailwind-variants`
- Jest + Testing Library

## Quick Start (Local Development)

### Prerequisites

- Node.js 20+ recommended
- pnpm 10+

### Run

```bash
pnpm install
pnpm dev
```

App runs on `http://localhost:3000`.

### Useful Scripts

```bash
pnpm dev          # start development server
pnpm build        # production build
pnpm start        # run production server
pnpm test         # run Jest tests
pnpm test:watch   # watch mode tests
pnpm test:ci      # CI-friendly test run
pnpm typecheck    # TypeScript checks
pnpm registry:build
```

## Install Components in Another Project

1. Initialize shadcn (if needed):

```bash
pnpm dlx shadcn@latest init
```

2. Install directly from the deployed registry:

```bash
pnpm dlx shadcn@latest add "https://agreeable-moss-048e15a0f.1.azurestaticapps.net/r/button.json"
```

3. Optional alias in your `components.json`:

```json
{
  "registries": {
    "@fluent2": "https://agreeable-moss-048e15a0f.1.azurestaticapps.net/r/{name}.json"
  }
}
```

Then install by alias:

```bash
pnpm dlx shadcn@latest add @fluent2/button @fluent2/input @fluent2/dialog
```

## Project Structure

- `app/`: documentation pages and component demos
- `components/`: source components used by docs/examples
- `registry/fluent2tailwind/`: shadcn registry source files
- `public/r/`: published registry JSON assets
- `app/tests/`: tests for docs modules and behaviors

## Component Status (Roadmap)

### Foundations

- [ ] Color tokens
- [ ] Typography tokens
- [ ] Spacing scale
- [ ] Radius scale
- [ ] Elevation tokens
- [ ] Motion tokens
- [x] Icon system

### Inputs

- [x] Button
- [ ] IconButton
- [x] ToggleButton
- [ ] SplitButton
- [x] Input (TextField)
- [x] TextArea
- [ ] PasswordField
- [x] SearchBox
- [x] Checkbox
- [x] RadioGroup
- [x] Switch
- [x] Slider
- [x] Select
- [x] Combobox
- [x] Dropdown
- [ ] DatePicker
- [ ] TimePicker
- [ ] FileUpload

### Navigation

- [x] Menu
- [x] ContextMenu
- [x] Tabs
- [x] Breadcrumb
- [x] Pagination
- [x] Navbar
- [x] Sidebar / Drawer
- [ ] CommandBar
- [x] Toolbar

### Feedback

- [x] Alert
- [x] Toast
- [x] Dialog
- [ ] Modal
- [x] Popover
- [x] Tooltip
- [x] ProgressBar
- [x] Spinner
- [x] Skeleton
- [x] MessageBar

### Data Display

- [x] Card
- [x] List
- [x] Table
- [x] DataGrid
- [x] Avatar
- [x] Badge
- [x] Tag
- [x] Divider
- [x] Accordion
- [x] TreeView

### Layout

- [ ] Stack
- [ ] Grid
- [ ] Container
- [ ] Separator

### Advanced

- [x] CommandPalette
- [ ] RichTextEditor
- [ ] VirtualizedList
- [ ] DataGrid Pro features
- [ ] Theming system (dark/light/brand)
- [ ] RTL support

## Accessibility

Target quality bar:

- WCAG 2.1 AA
- ARIA best practices
- Keyboard navigation
- Focus management

## Contributing

Contributions are welcome.

Before opening a PR:

- Keep changes scoped
- Include tests (or explain why not needed)
- Share screenshots for visual changes
- Use Conventional Commits (`feat(web): ...`, `fix(web): ...`)

## License

ISC
