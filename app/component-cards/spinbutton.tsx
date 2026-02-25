import { SpinButton } from "@/components/spin-button"
import { useState } from "react"

export const spinbutton_card = {
  header: "SpinButton",
  subText:
    "SpinButtons are used to allow numerical and non-numerical input bounded between minimum and maximum values with buttons to increment and decrement the input value.",
  cards: [
    {
      cardComponent: <SpinButton defaultValue={2} />,
    },
    {
      cardHeader: "Guidelines",
      cardSubtext: "Numeric input behavior.",
      cardComponent: (
        <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground dark:text-slate-300">
          <li>Set min/max to prevent invalid values.</li>
          <li>Use stepPage for larger increments.</li>
          <li>Keep the control compact in dense forms.</li>
        </ul>
      ),
    },
    {
      cardHeader: "Controlled",
      cardSubtext:
        "SpinButton can be a controlled input where the value and, optionally, the display value are stored in state and updated with onChange.",
      cardComponent: <ControlledSpinButton />,
    },
    {
      cardHeader: "Uncontrolled",
      cardSubtext: "An uncontrolled SpinButton",
      cardComponent: <SpinButton defaultValue={5} />,
    },
    {
      cardHeader: "Bounds",
      cardSubtext:
        "SpinButton can be bounded with the min and max props. Using the spin buttons or hotkeys will clamp values in the range of [min, max]. Users may type a value outside the range into the text input and it will not be clamped by the control.",
      cardComponent: <SpinButton defaultValue={2} min={0} max={5} />,
    },
    {
      cardHeader: "Display Value",
      cardSubtext: "SpinButton supports formatted display values.",
      cardComponent: <SpinButton defaultValue={10} />,
    },
    {
      cardHeader: "Step",
      cardSubtext:
        "SpinButton step size can be set. Additionally stepPage can be set to a large value to allow bulk steps via the Page Up and Page Down keys.",
      cardComponent: <SpinButton defaultValue={0} step={0.5} stepPage={5} />,
    },
    {
      cardHeader: "Size",
      cardSubtext: "SpinButton can have different sizes.",
      cardComponent: (
        <div className="flex flex-col gap-2">
          <SpinButton defaultValue={1} size="sm" />
          <SpinButton defaultValue={2} size="md" />
          <SpinButton defaultValue={3} size="lg" />
        </div>
      ),
    },
    {
      cardHeader: "Appearance",
      cardSubtext:
        "SpinButton can have different appearances. The colors adjacent to the input should have a sufficient contrast.",
      cardComponent: (
        <div className="flex flex-col gap-2">
          <SpinButton defaultValue={1} appearance="outline" />
          <SpinButton defaultValue={2} appearance="underline" />
          <SpinButton defaultValue={3} appearance="filled" />
        </div>
      ),
    },
    {
      cardHeader: "Size",
      cardSubtext: "SpinButton can be disabled.",
      cardComponent: <SpinButton defaultValue={2} disabled />,
    },
  ],
}

function ControlledSpinButton() {
  const [value, setValue] = useState(3)
  return <SpinButton value={value} onChange={setValue} />
}
