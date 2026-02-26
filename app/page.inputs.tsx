import { tooltip_card } from "@/app/component-cards/tooltip"
import { ArticleIcon } from "@phosphor-icons/react"
import { ReactNode } from "react"
import { accordion_card } from "./component-cards/accordion"
import { avatar_card } from "./component-cards/avatar"
import { avatargroup_card } from "./component-cards/avatargroup"
import { badge_card } from "./component-cards/badge"
import { breadcrumb_card } from "./component-cards/breadcrumb"
import { button_card } from "./component-cards/button"
import { card_card } from "./component-cards/card"
import { carousel_card } from "./component-cards/carousel"
import { checkbox_card } from "./component-cards/checkbox"
import { colorpicker_card } from "./component-cards/colorpicker"
import { datagrid_card } from "./component-cards/datagrid"
import { dialog_card } from "./component-cards/dialog"
import { divider_card } from "./component-cards/divider"
import { drawer_card } from "./component-cards/drawer"
import { dropdown_card } from "./component-cards/dropdown"
import { field_card } from "./component-cards/field"
import { fluentprovider_card } from "./component-cards/fluentprovider"
import { image_card } from "./component-cards/image"
import { infolabel_card } from "./component-cards/infolabel"
import { input_card } from "./component-cards/input"
import { label_card } from "./component-cards/label"
import { link_card } from "./component-cards/link"
import { list_card } from "./component-cards/list"
import { menu_card } from "./component-cards/menu"
import { messagebar_card } from "./component-cards/messagebar"
import { overflow_card } from "./component-cards/overflow"
import { persona_card } from "./component-cards/persona"
import { popover_card } from "./component-cards/popover"
import { portal_card } from "./component-cards/portal"
import { progressbar_card } from "./component-cards/progressbar"
import { radiogroup_card } from "./component-cards/radiogroup"
import { rating_card } from "./component-cards/rating"
import { ratingdisplay_card } from "./component-cards/ratingdisplay"
import { searchbox_card } from "./component-cards/searchbox"
import { select_card } from "./component-cards/select"
import { skeleton_card } from "./component-cards/skeleton"
import { slider_card } from "./component-cards/slider"
import { spinbutton_card } from "./component-cards/spinbutton"
import { spinner_card } from "./component-cards/spinner"
import { swatchpicker_card } from "./component-cards/swatchpicker"
import { switch_card } from "./component-cards/switch"
import { table_card } from "./component-cards/table"
import { tablist_card } from "./component-cards/tablist"
import { tag_card } from "./component-cards/tag"
import { tagpicker_card } from "./component-cards/tagpicker"
import { teachingpopover_card } from "./component-cards/teachingpopover"
import { text_card } from "./component-cards/text"
import { textarea_card } from "./component-cards/textarea"
import { toast_card } from "./component-cards/toast"
import { toolbar_card } from "./component-cards/toolbar"
import { tree_card } from "./component-cards/tree"

type ComponentsType = Array<{
  header: string
  subText: string
  cards: Array<{
    cardHeader: string
    cardSubtext: ReactNode
    cardComponent: ReactNode
  }>
}>

export const components = [
  breadcrumb_card,
  button_card,
  badge_card,
  carousel_card,
  colorpicker_card,
  dropdown_card,
  field_card,
  fluentprovider_card,
  portal_card,
  input_card,
  label_card,
  link_card,
  searchbox_card,
  text_card,
  list_card,
  image_card,
  // combobox_card,
  divider_card,
  select_card,
  drawer_card,
  dialog_card,
  popover_card,
  tablist_card,
  datagrid_card,
  table_card,
  slider_card,
  accordion_card,
  avatar_card,
  avatargroup_card,
  skeleton_card,
  switch_card,
  textarea_card,
  radiogroup_card,
  rating_card,
  ratingdisplay_card,
  card_card,
  checkbox_card,
  infolabel_card,
  menu_card,
  toast_card,
  messagebar_card,
  tooltip_card,
  persona_card,
  toolbar_card,
  progressbar_card,
  overflow_card,
  spinbutton_card,
  spinner_card,
  swatchpicker_card,
  tag_card,
  tagpicker_card,
  teachingpopover_card,
  tree_card,
] as ComponentsType

type SideBarGroup = {
  title: string
  items: string[]
}

type SideBarItem = string | SideBarGroup

function groupOnlyFamilies(headers: string[]): SideBarItem[] {
  const normalized = new Set(headers.map((header) => header.toLowerCase()))
  const familyByHeader = new Map<string, string>()
  const familyItems = new Map<string, string[]>()

  headers.forEach((header) => {
    const [firstWord] = header.split(" ")
    const family =
      firstWord &&
      normalized.has(firstWord.toLowerCase()) &&
      header.toLowerCase() !== firstWord.toLowerCase()
        ? firstWord
        : header

    familyByHeader.set(header, family)
    if (!familyItems.has(family)) {
      familyItems.set(family, [])
    }
    familyItems.get(family)?.push(header)
  })

  const emittedFamilies = new Set<string>()
  const result: SideBarItem[] = []

  headers.forEach((header) => {
    const family = familyByHeader.get(header) ?? header
    const items = familyItems.get(family) ?? [header]

    if (items.length > 1) {
      if (!emittedFamilies.has(family)) {
        emittedFamilies.add(family)
        result.push({ title: family, items })
      }
      return
    }

    result.push(header)
  })

  return result
}

export const sideBar = {
  Components: {
    icon: ArticleIcon,
    items: groupOnlyFamilies(components.map((component) => component.header).sort()),
  },
} as const
