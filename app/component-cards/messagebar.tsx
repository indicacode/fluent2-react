import Button from "@/components/button"
import {
  MessageBar,
  MessageBarActions,
  MessageBarTitle,
} from "@/components/message-bar"

export const messagebar_card = {
  header: "MessageBar",
  subText: <></>,
  cards: [
    {
      cardHeader: "Default",
      cardSubtext: "Basic usage and default styling.",
      cardComponent: (
        <MessageBar title="Scheduled: Catch up">
          Friday, February 10, 2023 at 5:57 PM
        </MessageBar>
      ),
    },
    {
      cardHeader: "Guidelines",
      cardSubtext: "When to use each intent and layout.",
      cardComponent: (
        <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground dark:text-slate-300">
          <li>Use error intent for blocking problems.</li>
          <li>Use success intent for completion feedback.</li>
          <li>Keep actions limited to 1–2 primary items.</li>
        </ul>
      ),
    },
    {
      cardHeader: "Intent",
      cardSubtext:
        "MessageBar components come built-in with preset intents that determine the design and aria live announcement.",
      cardComponent: (
        <div className="flex flex-col gap-2">
          <MessageBar intent="info">Informational message</MessageBar>
          <MessageBar intent="warning">Warning message</MessageBar>
          <MessageBar intent="error">Error message</MessageBar>
          <MessageBar intent="success">Success message</MessageBar>
        </div>
      ),
    },
    {
      cardHeader: "Shape",
      cardSubtext:
        "MessageBar can have either rounded-sm or square corners, please follow the usage guidance for these shapes.",
      cardComponent: (
        <div className="flex flex-col gap-2">
          <MessageBar shape="rounded">Rounded shape</MessageBar>
          <MessageBar shape="square">Square shape</MessageBar>
        </div>
      ),
    },
    {
      cardHeader: "Actions",
      cardSubtext: "The MessageBar can have different actions.",
      cardComponent: (
        <MessageBar
          title="Scheduled: Catch up"
          actions={
            <MessageBarActions>
              <Button size="sm" variant="outline">
                Undo
              </Button>
              <Button size="sm" variant="outline">
                Dismiss
              </Button>
            </MessageBarActions>
          }
        >
          Friday, February 10, 2023 at 5:57 PM
        </MessageBar>
      ),
    },
    {
      cardHeader: "Dismiss",
      cardSubtext:
        "MessageBar components should be used in a MessageBarGroup when possible to enable exit animations.",
      cardComponent: (
        <MessageBar dismissible onDismiss={() => {}}>
          Dismissible message
        </MessageBar>
      ),
    },
    {
      cardHeader: "Reflow",
      cardSubtext:
        "The MessageBar will reflow by default once the body content wraps to a second line.",
      cardComponent: (
        <MessageBar>
          This is a longer message that should wrap to demonstrate the layout
          when content spans multiple lines in the message bar.
        </MessageBar>
      ),
    },
    {
      cardHeader: "Manual Layout",
      cardSubtext:
        "It's possible to opt out of automatic reflow with the layout prop.",
      cardComponent: (
        <MessageBar layout="singleline">
          Single-line layout example
        </MessageBar>
      ),
    },
    {
      cardHeader: "Custom Title",
      cardSubtext: "Compose with MessageBarTitle for custom markup.",
      cardComponent: (
        <MessageBar>
          <MessageBarTitle>Custom title</MessageBarTitle>
          Body text goes here.
        </MessageBar>
      ),
    },
  ],
}
