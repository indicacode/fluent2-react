import { describe, it } from "@jest/globals"
import "@testing-library/jest-dom"
import { fireEvent, render } from "@testing-library/react"
import type { ReactNode } from "react"
import { persona_card } from "../component-cards/persona"

function renderCardComponent(cardComponent: ReactNode) {
  const { container, unmount } = render(<>{cardComponent}</>)
  const button = container.querySelector("button")
  if (button) {
    fireEvent.click(button)
  }
  unmount()
}

describe("persona docs", () => {
  it("renders card components", () => {
    persona_card.cards.forEach((card) => {
      renderCardComponent(card.cardComponent)
    })
  })
})
