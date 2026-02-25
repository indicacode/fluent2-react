import { describe, it } from "@jest/globals"
import "@testing-library/jest-dom"
import { fireEvent, render } from "@testing-library/react"
import type { ReactNode } from "react"
import { divider_card } from "../component-cards/divider"

function renderCardComponent(cardComponent: ReactNode) {
  const { container, unmount } = render(<>{cardComponent}</>)
  const button = container.querySelector("button")
  if (button) {
    fireEvent.click(button)
  }
  unmount()
}

describe("divider docs", () => {
  it("renders card components", () => {
    divider_card.cards.forEach((card) => {
      renderCardComponent(card.cardComponent)
    })
  })
})
