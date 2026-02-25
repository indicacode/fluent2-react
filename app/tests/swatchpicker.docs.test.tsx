import { describe, it } from "@jest/globals"
import "@testing-library/jest-dom"
import { fireEvent, render } from "@testing-library/react"
import type { ReactNode } from "react"
import { swatchpicker_card } from "../component-cards/swatchpicker"

function renderCardComponent(cardComponent: ReactNode) {
  const { container, unmount } = render(<>{cardComponent}</>)
  const button = container.querySelector("button")
  if (button) {
    fireEvent.click(button)
  }
  unmount()
}

describe("swatchpicker docs", () => {
  it("renders card components", () => {
    swatchpicker_card.cards.forEach((card) => {
      renderCardComponent(card.cardComponent)
    })
  })
})
