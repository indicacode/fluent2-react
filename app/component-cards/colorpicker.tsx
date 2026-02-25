import Button from "@/components/button"
import { ColorPicker } from "@/components/color-picker"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/popover"
import { ColorSwatch, SwatchPicker } from "@/components/swatch-picker"

export const colorpicker_card = {
  header: "ColorPicker",
  subText:
    "The ColorPicker allows users to browse and select colors. By default, it enables navigation through a color spectrum and operates in HSV/HSL format.",
  cards: [
    {
      cardComponent: <ColorPicker defaultValue="#2563eb" />,
    },
    {
      cardHeader: "Guidelines",
      cardSubtext: "Best practices for color selection.",
      cardComponent: (
        <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground dark:text-slate-300">
          <li>Show the selected color value (hex) when possible.</li>
          <li>Provide a visible swatch for quick verification.</li>
          <li>Use a popover for advanced selection to save space.</li>
        </ul>
      ),
    },
    {
      cardHeader: "Color Picker Shape",
      cardSubtext:
        "The shape prop sets border-radius of the ColorPicker sub-components. The default is rounded.",
      cardComponent: (
        <div className="flex flex-col gap-3">
          <ColorPicker defaultValue="#16a34a" shape="rounded" />
          <ColorPicker defaultValue="#f59e0b" shape="square" />
        </div>
      ),
    },
    {
      cardHeader: "Color Area Default",
      cardSubtext:
        "The ColorArea component allows users to adjust two channels of HSB color values against a two-dimensional gradient background.",
      cardComponent: <ColorPicker defaultValue="#0ea5e9" />,
    },
    {
      cardHeader: "Color Slider Default",
      cardSubtext:
        "The ColorSlider allows users to change the hue aspect of a color value.",
      cardComponent: <ColorPicker defaultValue="#ef4444" />,
    },
    {
      cardHeader: "Color Slider Channels",
      cardSubtext:
        "The ColorSlider allows users to choose color channels like hue, saturation, and value.",
      cardComponent: <ColorPicker defaultValue="#a855f7" />,
    },
    {
      cardHeader: "Alpha Slider Default",
      cardSubtext:
        "The AlphaSlider allows users to change the alpha channel of a color value.",
      cardComponent: <ColorPicker defaultValue="#10b981" />,
    },
    {
      cardHeader: "Color And Swatch Picker",
      cardComponent: (
        <div className="flex flex-col gap-3">
          <ColorPicker defaultValue="#2563eb" />
          <SwatchPicker defaultValue="blue">
            <ColorSwatch value="blue" color="#2563eb" />
            <ColorSwatch value="green" color="#22c55e" />
            <ColorSwatch value="amber" color="#f59e0b" />
          </SwatchPicker>
        </div>
      ),
    },
    {
      cardHeader: "Color Picker Popup",
      cardComponent: (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Open color picker</Button>
          </PopoverTrigger>
          <PopoverContent className="w-fit">
            <ColorPicker defaultValue="#9333ea" />
          </PopoverContent>
        </Popover>
      ),
    },
  ],
}
