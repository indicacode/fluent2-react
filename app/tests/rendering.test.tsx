import { describe, expect, it } from "@jest/globals"
import "@testing-library/jest-dom"
import { Accordion } from "../accordion"
import { Avatar } from "../avatar"
import { Button } from "../button"
import { Card } from "../card"
import { Divider } from "../divider"
import { Drawer } from "../drawer"
import { Input, InputLeftAddon, InputRightAddon } from "../input"
import { Label } from "../label"
import { Link } from "../link"
import { Slider } from "../slider"
import { Switch } from "../switch"
import { Textarea } from "../textarea"
import { renderComponent } from "./renderComponent"

describe("Global Component Rendering", () => {
  const componentsToTest = [
    { name: "Input", Component: Input, props: { labelText: "Test Input" } },
    {
      name: "InputLeftAddon",
      Component: InputLeftAddon,
      props: { children: "Left Addon" },
    },
    {
      name: "InputRightAddon",
      Component: InputRightAddon,
      props: { children: "Right Addon" },
    },
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
    {
      name: "Drawer",
      Component: Drawer,
      props: { isOpen: true, children: "Drawer Content" },
    },
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
      const { getByText, container } = renderComponent(Component, props)

      // Check if the component is rendered properly
      if (props.children) {
        expect(getByText(props.children)).toBeInTheDocument()
      } else {
        expect(container.firstChild).toBeInTheDocument()
      }
    })
  })
})
