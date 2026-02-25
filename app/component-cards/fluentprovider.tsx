import { FluentProvider } from "@/components/fluent-provider"

export const fluentprovider_card = {
  header: "FluentProvider",
  subText:
    "The FluentProvider transforms a passed theme to CSS variables and passes other settings to Fluent UI components.",
  cards: [
    {
      cardComponent: (
        <FluentProvider theme={{ "color-brand-primary": "#2563eb" }}>
          <div className="rounded-md border border-border p-3 text-sm">
            <span style={{ color: "var(--color-brand-primary)" }}>
              FluentProvider sets CSS variables.
            </span>
          </div>
        </FluentProvider>
      ),
    },
    {
      cardHeader: "Guidelines",
      cardSubtext: "Provider placement and theme usage.",
      cardComponent: (
        <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground dark:text-slate-300">
          <li>Place a provider near the app root for consistent tokens.</li>
          <li>Use nested providers for scoped overrides.</li>
          <li>Avoid frequent theme changes to prevent layout thrash.</li>
        </ul>
      ),
    },
    {
      cardHeader: "Dir",
      cardSubtext:
        "A Fluent provider can render text left-to-right (LTR) or right-to-left (RTL).",
      cardComponent: (
        <FluentProvider dir="rtl">
          <div className="rounded-md border border-border p-3 text-sm">
            مثال لليمين إلى اليسار
          </div>
        </FluentProvider>
      ),
    },
    {
      cardHeader: "Apply Styles To Portals",
      cardSubtext:
        "applyStylesToPortals controls if styles from FluentProvider should be applied to components that use Portal component.",
      cardComponent: (
        <FluentProvider
          applyStylesToPortals
          theme={{ "color-brand-primary": "#16a34a" }}
        >
          <div className="rounded-md border border-border p-3 text-sm">
            Portal styles enabled.
          </div>
        </FluentProvider>
      ),
    },
    {
      cardHeader: "Nested",
      cardSubtext:
        "A Fluent provider can be nested to override some or all of a tokens.",
      cardComponent: (
        <FluentProvider theme={{ "color-brand-primary": "#2563eb" }}>
          <div className="rounded-md border border-border p-3 text-sm">
            <span style={{ color: "var(--color-brand-primary)" }}>
              Outer theme
            </span>
            <FluentProvider theme={{ "color-brand-primary": "#f59e0b" }}>
              <div className="mt-2">
                <span style={{ color: "var(--color-brand-primary)" }}>
                  Nested theme
                </span>
              </div>
            </FluentProvider>
          </div>
        </FluentProvider>
      ),
    },
    {
      cardHeader: "Frame",
      cardSubtext:
        "A FluentProvider does not cross an iframe boundary. To render into iframes pass a proper Document instance to targetDocument prop on FluentProvider & RendererProvider.",
      cardComponent: (
        <FluentProvider>
          <div className="rounded-md border border-border p-3 text-sm">
            Use targetDocument for iframes.
          </div>
        </FluentProvider>
      ),
    },
  ],
}
