import { Field } from "@/components/field"
import InfoLabel from "@/components/infoLabel"
import { Switch } from "@/components/switch"
import { Input } from "@/components/input"
export const field_card = {
  header: "Field",
  subText:
    "Field adds a label, validation message, and hint text to a control.",
  cards: [
    {
      cardComponent: (
        <Field label="Example field" hint="Optional hint">
          <Input />
        </Field>
      ),
    },
    {
      cardHeader: "Horizontal Orientation",
      cardSubtext:
        "Setting orientation=horizontal places the label beside the input. The validationMessage and hint still appear below the input.",
      cardComponent: (
        <Field
          orientation="horizontal"
          label="Example field"
          hint="Validation message and hint are below the input."
        >
          <Input />
        </Field>
      ),
    },
    {
      cardHeader: "Required",
      cardSubtext:
        "When a Field is marked as required, the label has a red asterisk, and the input gets the aria-required property for accessiblity tools.",
      cardComponent: (
        <Field required label="Required field">
          <Input />
        </Field>
      ),
    },
    {
      cardHeader: "Info button",
      cardSubtext:
        "Add an info button to the label by replacing the Field's label with an InfoLabel. This can be done using a slot render function. See the code from this story for more details.",
      cardComponent: (
        <Field
          label={<InfoLabel info="Extra info">Field label</InfoLabel>}
          hint="More details available"
        >
          <Input />
        </Field>
      ),
    },
    {
      cardHeader: "Disabled control",
      cardSubtext:
        "When the control inside the Field is disabled, the label should not be marked disabled. This ensures the label remains readable to users.",
      cardComponent: (
        <Field label="Field with disabled control">
          <Input disabled />
        </Field>
      ),
    },
    {
      cardHeader: "Size",
      cardSubtext:
        "The size prop affects the size of the Field's label, as well as form controls that support a size prop.",
      cardComponent: (
        <div>
          <Field label="Size small" size="sm">
            <Input size="sm" />
          </Field>
          <Field label="Size medium" size="md">
            <Input size="md" />
          </Field>
          <Field label="Size large" size="lg">
            <Input size="lg" />
          </Field>
        </div>
      ),
    },
    {
      cardHeader: "Validation Message",
      cardSubtext:
        "The validationMessage is used to give the user feedback about the value entered. Field does not do validation itself, but can be used to report the result of form validation.",
      cardComponent: (
        <div>
          <Field label="Success state" state="success" validationMessage="This is a success message.">
            <Input state="success" />
          </Field>
          <Field label="Warning state" state="warning" validationMessage="This is a warning message.">
            <Input state="warning" />
          </Field>
          <Field label="Error state" state="error" validationMessage="This is an error message.">
            <Input state="fail" />
          </Field>
          <Field label="Custom state" state="none" validationMessage="This is a custom message.">
            <Input state="neutral" />
          </Field>
        </div>
      ),
    },
    {
      cardHeader: "Hint",
      cardSubtext:
        "The hint provides additional descriptive information about the field. Hint text should be used sparingly.",
      cardComponent: (
        <Field label="Example with hint" hint="Sample hint text.">
          <Input />
        </Field>
      ),
    },
    {
      cardHeader: "Component Examples",
      cardSubtext:
        "Field can be used with any input components in this library. This story shows some examples. It can also be used to add a label or error text to components like ProgressBar.",
      cardComponent: (
        <div className="flex flex-col gap-3">
          <Field label="Toggle notifications">
            <Switch />
          </Field>
          <Field label="Search">
            <Input placeholder="Search..." />
          </Field>
        </div>
      ),
    },
    {
      cardHeader: "Third party controls a Field",
      cardSubtext:
        "Field uses context to associate its label and message text with its child form control. All of the form controls in this library support FieldContext.",
      cardComponent: (
        <Field label="Third party input" hint="Use a render function to properly associate the label with the control.">
          <Input />
        </Field>
      ),
    },
  ],
}
