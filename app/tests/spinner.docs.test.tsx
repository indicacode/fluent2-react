import { describe, it } from "@jest/globals"
import "@testing-library/jest-dom"
import { fireEvent, render } from "@testing-library/react"
import type { ReactNode } from "react"
import { spinner_card } from "../component-cards/spinner"

function renderCardComponent(cardComponent: ReactNode) {
  const { container, unmount } = render(<>{cardComponent}</>)
  const button = container.querySelector("button")
  if (button) {
    fireEvent.click(button)
  }
  unmount()
}

describe("spinner docs", () => {
  it("renders card components", () => {
    spinner_card.cards.forEach((card) => {
      renderCardComponent(card.cardComponent)
    })
  })
})
