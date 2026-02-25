import { describe, it } from "@jest/globals"
import "@testing-library/jest-dom"
import { fireEvent, render } from "@testing-library/react"
import type { ReactNode } from "react"
import { infolabel_card } from "../component-cards/infolabel"

function renderCardComponent(cardComponent: ReactNode) {
  const { container, unmount } = render(<>{cardComponent}</>)
  const button = container.querySelector("button")
  if (button) {
    fireEvent.click(button)
  }
  unmount()
}

describe("infolabel docs", () => {
  it("renders card components", () => {
    infolabel_card.cards.forEach((card) => {
      renderCardComponent(card.cardComponent)
    })
  })
})
