import { describe, it } from "@jest/globals"
import "@testing-library/jest-dom"
import { fireEvent, render } from "@testing-library/react"
import type { ReactNode } from "react"
import { tooltip_card } from "../component-cards/tooltip"

function renderCardComponent(cardComponent: ReactNode) {
  const { container, unmount } = render(<>{cardComponent}</>)
  const button = container.querySelector("button")
  if (button) {
    fireEvent.click(button)
  }
  unmount()
}

describe("tooltip docs", () => {
  it("renders card components", () => {
    tooltip_card.cards.forEach((card) => {
      renderCardComponent(card.cardComponent)
    })
  })
})
