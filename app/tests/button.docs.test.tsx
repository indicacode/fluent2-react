import { describe, it } from "@jest/globals"
import "@testing-library/jest-dom"
import { fireEvent, render } from "@testing-library/react"
import type { ReactNode } from "react"
import { button_card } from "../component-cards/button"

function renderCardComponent(cardComponent: ReactNode) {
  const { container, unmount } = render(<>{cardComponent}</>)
  const button = container.querySelector("button")
  if (button) {
    fireEvent.click(button)
  }
  unmount()
}

describe("button docs", () => {
  it("renders card components", () => {
    button_card.cards.forEach((card) => {
      renderCardComponent(card.cardComponent)
    })
  })
})
