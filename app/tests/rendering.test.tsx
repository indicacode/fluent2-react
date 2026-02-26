import { describe, expect, it } from "@jest/globals"
import "@testing-library/jest-dom"
import { Accordion } from "../../components/accordion"
import { Avatar } from "../../components/avatar"
import { Button } from "../../components/button"
import { Card } from "../../components/card"
import { Divider } from "../../components/divider"
import { Input } from "../../components/input"
import { Label } from "../../components/label"
import Link from "../../components/link"
import { Slider } from "../../components/slider"
import { Switch } from "../../components/switch"
import { Textarea } from "../../components/textarea"
import { renderComponent } from "./renderComponent"

describe("Global Component Rendering", () => {
  const componentsToTest = [
    { name: "Input", Component: Input, props: { labelText: "Test Input" } },
    { name: "Button", Component: Button, props: { children: "Click Me" } },
    {
      name: "Accordion",
      Component: Accordion,
      props: { title: "Accordion Title", children: "Accordion Content" },
    },
    {
      name: "Avatar",
      Component: Avatar,
      props: { alt: "User Avatar", src: "avatar.jpg" },
    },
    { name: "Card", Component: Card, props: { children: "Card Content" } },
    { name: "Divider", Component: Divider },
    { name: "Label", Component: Label, props: { children: "Label Content" } },
    {
      name: "Link",
      Component: Link,
      props: { href: "#", children: "Click Here" },
    },
    {
      name: "Slider",
      Component: Slider,
      props: { value: 50, min: 0, max: 100 },
    },
    {
      name: "Switch",
      Component: Switch,
      props: { isChecked: true, children: "toggle" },
    },
    {
      name: "Textarea",
      Component: Textarea,
      props: { placeholder: "Type here..." },
    },
  ]

  componentsToTest.forEach(({ name, Component, props }) => {
    it(`renders the ${name} component without crashing`, () => {
      const { container } = renderComponent(Component, props)
      expect(container.firstChild).toBeInTheDocument()
    })
  })
})
