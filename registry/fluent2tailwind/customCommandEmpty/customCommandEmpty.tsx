import { useCommandState } from "cmdk"

import { tv } from "tailwind-variants"

const commandEmptySlots = tv({
  slots: {
    root: "py-6 text-center text-sm",
  },
})

const { root } = commandEmptySlots()

/**
 * The `CommandEmpty` of shadcn/ui will cause the cmdk empty not rendering correctly.
 * So we create one and copy the `Empty` implementation from `cmdk`.
 *
 * @reference: https://github.com/hsuanyi-chou/shadcn-ui-expansions/issues/34#issuecomment-1949561607
 **/
export function CommandEmpty({ className, ...props }) {
  const render = useCommandState((state) => state.filtered.count === 0)

  if (!render) return null

  return (
    <div
      className={root({ className })}
      cmdk-empty=""
      role="presentation"
      {...props}
    />
  )
}
