import {
  ColorSwatch,
  ImageSwatch,
  SwatchPicker,
} from "@/components/swatch-picker"

export const swatchpicker_card = {
  header: "SwatchPicker",
  subText:
    "A swatch picker lets people choose a color, image, or pattern and apply it to graphics or text.",
  cards: [
    {
      cardComponent: (
        <SwatchPicker defaultValue="blue">
          <ColorSwatch value="blue" color="#2563eb" />
          <ColorSwatch value="green" color="#22c55e" />
          <ColorSwatch value="amber" color="#f59e0b" />
        </SwatchPicker>
      ),
    },
    {
      cardHeader: "Guidelines",
      cardSubtext: "Visual selection tips.",
      cardComponent: (
        <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground dark:text-slate-300">
          <li>Provide tooltips for non-obvious swatches.</li>
          <li>Keep spacing consistent for scanability.</li>
          <li>Mix color and image swatches sparingly.</li>
        </ul>
      ),
    },
    {
      cardHeader: "Swatch Picker Size",
      cardSubtext:
        "The size prop sets width and height of the Swatch. The default is medium which is 28x28px. extra-small is 20x20px, small is 24x24px, large is 32x32px.",
      cardComponent: (
        <div className="flex flex-col gap-3">
          <SwatchPicker size="sm" defaultValue="blue">
            <ColorSwatch value="blue" color="#2563eb" />
            <ColorSwatch value="green" color="#22c55e" />
          </SwatchPicker>
          <SwatchPicker size="md" defaultValue="amber">
            <ColorSwatch value="amber" color="#f59e0b" />
            <ColorSwatch value="purple" color="#a855f7" />
          </SwatchPicker>
          <SwatchPicker size="lg" defaultValue="rose">
            <ColorSwatch value="rose" color="#f43f5e" />
            <ColorSwatch value="slate" color="#64748b" />
          </SwatchPicker>
        </div>
      ),
    },
    {
      cardHeader: "Swatch Picker Shape",
      cardSubtext:
        "The shape prop sets border-radius of the Swatch. The default is square.",
      cardComponent: (
        <div className="flex flex-col gap-3">
          <SwatchPicker shape="square" defaultValue="slate">
            <ColorSwatch value="slate" color="#64748b" />
            <ColorSwatch value="blue" color="#2563eb" />
          </SwatchPicker>
          <SwatchPicker shape="rounded" defaultValue="green">
            <ColorSwatch value="green" color="#22c55e" />
            <ColorSwatch value="amber" color="#f59e0b" />
          </SwatchPicker>
        </div>
      ),
    },
    {
      cardHeader: "Swatch Picker Layout",
      cardSubtext:
        "The layout prop places items in a row or a grid.",
      cardComponent: (
        <SwatchPicker defaultValue="blue">
          <ColorSwatch value="blue" color="#2563eb" />
          <ColorSwatch value="green" color="#22c55e" />
          <ColorSwatch value="amber" color="#f59e0b" />
          <ColorSwatch value="purple" color="#a855f7" />
        </SwatchPicker>
      ),
    },
    {
      cardHeader: "Swatch Picker Spacing",
      cardSubtext:
        "The spacing prop sets gap between swatches.",
      cardComponent: (
        <SwatchPicker defaultValue="blue">
          <ColorSwatch value="blue" color="#2563eb" />
          <ColorSwatch value="green" color="#22c55e" />
          <ColorSwatch value="amber" color="#f59e0b" />
        </SwatchPicker>
      ),
    },
    {
      cardHeader: "Swatch Picker Image",
      cardSubtext:
        "A swatch can be represented as an image.",
      cardComponent: (
        <SwatchPicker defaultValue="image-1">
          <ImageSwatch
            value="image-1"
            src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=80&h=80&fit=crop"
            alt="Forest"
          />
          <ImageSwatch
            value="image-2"
            src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=80&h=80&fit=crop"
            alt="Mountains"
          />
        </SwatchPicker>
      ),
    },
    {
      cardHeader: "Swatch Picker Example",
      cardSubtext:
        "Empty swatch is used for cases where new swatches can be added.",
      cardComponent: (
        <SwatchPicker defaultValue="blue">
          <ColorSwatch value="blue" color="#2563eb" />
          <ColorSwatch value="green" color="#22c55e" />
          <ColorSwatch value="amber" color="#f59e0b" />
        </SwatchPicker>
      ),
    },
    {
      cardHeader: "Swatch Picker Variants",
      cardSubtext:
        "ColorSwatch component can have color, gradient, icon and initials.",
      cardComponent: (
        <SwatchPicker defaultValue="blue">
          <ColorSwatch value="blue" color="#2563eb" />
          <ColorSwatch value="green" color="#22c55e" />
        </SwatchPicker>
      ),
    },
    {
      cardHeader: "Swatch Picker Mixed Swatches",
      cardSubtext:
        "It's possible to use ColorSwatch and ImageSwatch in one SwatchPicker.",
      cardComponent: (
        <SwatchPicker defaultValue="image-1">
          <ColorSwatch value="blue" color="#2563eb" />
          <ImageSwatch
            value="image-1"
            src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=80&h=80&fit=crop"
            alt="Lake"
          />
        </SwatchPicker>
      ),
    },
    {
      cardHeader: "Swatch Picker With Tooltip",
      cardSubtext:
        "Each swatch should have a descriptive tooltip.",
      cardComponent: (
        <SwatchPicker defaultValue="blue">
          <ColorSwatch value="blue" color="#2563eb" title="Blue" />
          <ColorSwatch value="green" color="#22c55e" title="Green" />
          <ColorSwatch value="amber" color="#f59e0b" title="Amber" />
        </SwatchPicker>
      ),
    },
    {
      cardHeader: "Swatch Picker Popup",
      cardSubtext:
        "The swatch picker can be integrated within a popover or similar element.",
      cardComponent: (
        <SwatchPicker defaultValue="blue">
          <ColorSwatch value="blue" color="#2563eb" />
          <ColorSwatch value="green" color="#22c55e" />
          <ColorSwatch value="amber" color="#f59e0b" />
        </SwatchPicker>
      ),
    },
  ],
}
