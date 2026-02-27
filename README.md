# fluent2-react

✨ Componentes React inspirados no Fluent 2, construidos com Base UI + Tailwind CSS e distribuidos via registry do shadcn/ui.

---

## 👋 Visao Geral

Este repositorio junta:

- Uma aplicacao de docs/playground em Next.js (`app/`)
- Componentes reutilizaveis (`components/`)
- Pacotes prontos para registry (`registry/fluent2tailwind/`)

Objetivo do projeto:

- Levar a linguagem visual do Fluent 2 para React moderno
- Entregar componentes acessiveis e composiveis
- Facilitar a instalacao em outros projetos com `shadcn add`

---

## 🧰 Stack

- React 19
- Next.js 16 (App Router)
- Base UI primitives
- Tailwind CSS 4 + `tailwind-variants`
- Jest + Testing Library

---

## 🚀 Comecando Rapido (Local)

### Pre-requisitos

- Node.js 20+ (recomendado)
- pnpm 10+

### Rodar localmente

```bash
pnpm install
pnpm dev
```

A aplicacao abre em `http://localhost:3000`.

### Scripts uteis

```bash
pnpm dev          # servidor de desenvolvimento
pnpm build        # build de producao
pnpm start        # sobe a build de producao
pnpm test         # testes com Jest
pnpm test:watch   # testes em modo watch
pnpm test:ci      # execucao de testes para CI
pnpm typecheck    # checagem TypeScript
pnpm registry:build
```

---

## 📦 Instalando Componentes em Outro Projeto

1. Inicialize o shadcn (se necessario):

```bash
pnpm dlx shadcn@latest init
```

2. Instale direto do registry publicado:

```bash
pnpm dlx shadcn@latest add "https://agreeable-moss-048e15a0f.1.azurestaticapps.net/r/button.json"
```

3. (Opcional) Configure alias em `components.json`:

```json
{
  "registries": {
    "@fluent2": "https://agreeable-moss-048e15a0f.1.azurestaticapps.net/r/{name}.json"
  }
}
```

Depois instale por alias:

```bash
pnpm dlx shadcn@latest add @fluent2/button @fluent2/input @fluent2/dialog
```

---

## 🗂 Estrutura do Projeto

- `app/`: paginas de documentacao e demos
- `components/`: componentes fonte usados nos exemplos/docs
- `registry/fluent2tailwind/`: arquivos do registry shadcn
- `public/r/`: assets JSON publicados do registry
- `app/tests/`: testes de modulos e comportamentos

---

## 🧩 Status dos Componentes (Roadmap)

### 🔹 Foundations

- [ ] Color tokens
- [ ] Typography tokens
- [ ] Spacing scale
- [ ] Radius scale
- [ ] Elevation tokens
- [ ] Motion tokens
- [x] Icon system

### 🔹 Inputs

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

### 🔹 Navigation

- [x] Menu
- [x] ContextMenu
- [x] Tabs
- [x] Breadcrumb
- [x] Pagination
- [x] Navbar
- [x] Sidebar / Drawer
- [ ] CommandBar
- [x] Toolbar

### 🔹 Feedback

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

### 🔹 Data Display

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

### 🔹 Layout

- [ ] Stack
- [ ] Grid
- [ ] Container
- [ ] Separator

### 🔹 Advanced

- [x] CommandPalette
- [ ] RichTextEditor
- [ ] VirtualizedList
- [ ] DataGrid Pro features
- [ ] Theming system (dark/light/brand)
- [ ] RTL support

---

## ♿ Acessibilidade

Meta de qualidade:

- WCAG 2.1 AA
- Boas praticas de ARIA
- Navegacao por teclado
- Focus management

---

## 🤝 Contribuindo

Contribuicoes sao bem-vindas.

Antes de abrir PR:

- Mantenha mudancas pequenas e objetivas
- Inclua testes (ou explique por que nao precisa)
- Anexe screenshots em mudancas visuais
- Use Conventional Commits (`feat(web): ...`, `fix(web): ...`)

---

## 📄 Licenca

ISC
