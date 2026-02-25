import { TagPicker, useTagPickerFilter } from "@/components/tag-picker"
import { useState } from "react"

const options = [
  { value: "react", label: "React" },
  { value: "next", label: "Next.js" },
  { value: "tailwind", label: "Tailwind" },
  { value: "radix", label: "Radix" },
]

export const tagpicker_card = {
  header: "TagPicker",
  subText:
    "A TagPicker combines a text field and a dropdown giving people a way to select an option from a list or enter their own choice. It is a specialized version of a Combobox where selecting an option from a list results in a Tag being added close to the text field.",
  cards: [
    {
      cardComponent: <TagPicker defaultOptions={options} />, // default
    },
    {
      cardHeader: "Guidelines",
      cardSubtext: "Selection and input behavior.",
      cardComponent: (
        <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground dark:text-slate-300">
          <li>Enable filtering for large option sets.</li>
          <li>Use noPopover when tags are user-defined.</li>
          <li>Limit max selections when needed.</li>
        </ul>
      ),
    },
    {
      cardHeader: "Button",
      cardSubtext:
        "The component TagPickerButton renders an invisible button that can be used instead of TagPickerInput to opt-out of a text field and to provide something similar to a Dropdown behavior.",
      cardComponent: (
        <TagPicker defaultOptions={options} placeholder="Pick a tag" />
      ),
    },
    {
      cardHeader: "Filtering",
      cardSubtext:
        "TagPicker can take advantage of the provided useTagPickerFilter hook to filter the options based on the user-typed string.",
      cardComponent: <FilteredTagPicker />,
    },
    {
      cardHeader: "Size",
      cardSubtext:
        "A TagPicker's size can be set to medium (default), large or extra-large.",
      cardComponent: (
        <div className="flex flex-col gap-2">
          <TagPicker defaultOptions={options} size="sm" />
          <TagPicker defaultOptions={options} size="md" />
          <TagPicker defaultOptions={options} size="lg" />
        </div>
      ),
    },
    {
      cardHeader: "Appearance",
      cardSubtext: "A TagPicker can have appearance variants.",
      cardComponent: (
        <div className="flex flex-col gap-2">
          <TagPicker defaultOptions={options} variant="outline" />
          <TagPicker defaultOptions={options} variant="underline" />
          <TagPicker defaultOptions={options} variant="filledLight" />
        </div>
      ),
    },
    {
      cardHeader: "Disabled",
      cardSubtext:
        "A TagPicker can be disabled. Disabling TagPicker will disable the access to the TagPickerList, but it'll still allow modifications to the selectedOptions.",
      cardComponent: <TagPicker defaultOptions={options} disabled />,
    },
    {
      cardHeader: "Expand Icon",
      cardSubtext:
        "TagPickerControl provides an expandIcon slot for modifying the default expandIcon chevron.",
      cardComponent: (
        <TagPicker defaultOptions={options} placeholder="Open list" />
      ),
    },
    {
      cardHeader: "Secondary Action",
      cardSubtext:
        "TagPickerControl provides a secondaryAction slot for possible extra functionalities that may be desired.",
      cardComponent: (
        <TagPicker defaultOptions={options} clearable placeholder="Clearable" />
      ),
    },
    {
      cardHeader: "Grouped",
      cardComponent: (
        <TagPicker
          groupBy="group"
          defaultOptions={[
            { value: "react", label: "React", group: "Frontend" },
            { value: "next", label: "Next.js", group: "Frontend" },
            { value: "node", label: "Node", group: "Backend" },
          ]}
        />
      ),
    },
    {
      cardHeader: "Truncated Text",
      cardSubtext:
        "Text truncation is a common pattern used to handle long text that doesn't fit within the available space.",
      cardComponent: (
        <TagPicker
          defaultOptions={[
            { value: "long", label: "A very long tag label that will truncate" },
          ]}
        />
      ),
    },
    {
      cardHeader: "Single Select",
      cardSubtext:
        "By default, the TagPicker allows you to have multiple tags selected. To enable single selection, you can manage the selected options state yourself and pass only one selected option to the TagPicker component.",
      cardComponent: <SingleSelectTagPicker />,
    },
    {
      cardHeader: "No Popover",
      cardSubtext:
        "You can use the TagPicker without the popover with the list of options by providing the noPopover property.",
      cardComponent: (
        <TagPicker
          defaultOptions={options}
          noPopover
          creatable
          placeholder="Type to add tags"
        />
      ),
    },
  ],
}

function FilteredTagPicker() {
  const [query, setQuery] = useState("")
  const { options: filtered, emptyMessage } = useTagPickerFilter({
    query,
    options,
  })

  return (
    <TagPicker
      defaultOptions={filtered}
      inputProps={{
        onChange: (event) => setQuery(event.target.value),
      }}
      emptyIndicator={emptyMessage}
    />
  )
}

function SingleSelectTagPicker() {
  const [selected, setSelected] = useState([options[0]])

  return (
    <TagPicker
      multiselect={false}
      tags={false}
      selectedOptions={selected}
      onChange={(next) => setSelected(next)}
      defaultOptions={options}
    />
  )
}
