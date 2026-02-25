import { describe, it } from "@jest/globals"
import "@testing-library/jest-dom"
import { fireEvent, render } from "@testing-library/react"
import type { ReactNode } from "react"
import { skeleton_card } from "../component-cards/skeleton"

function renderCardComponent(cardComponent: ReactNode) {
  const { container, unmount } = render(<>{cardComponent}</>)
  const button = container.querySelector("button")
  if (button) {
    fireEvent.click(button)
  }
  unmount()
}

describe("skeleton docs", () => {
  it("renders card components", () => {
    skeleton_card.cards.forEach((card) => {
      renderCardComponent(card.cardComponent)
    })
  })
})
