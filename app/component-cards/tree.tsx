import {
  FlatTree,
  Tree,
  TreeItem,
  TreeItemLayout,
  TreeItemPersonaLayout,
} from "@/components/tree"
import { Avatar } from "@/components/avatar"

const flatItems = [
  {
    value: "parent",
    label: "Parent",
    children: [
      { value: "child-1", label: "Child 1" },
      { value: "child-2", label: "Child 2" },
    ],
  },
  { value: "standalone", label: "Standalone" },
]

export const tree_card = {
  header: "Tree",
  subText:
    "A hierarchical list structure component for displaying data in a collapsible and expandable way.",
  cards: [
    {
      cardComponent: (
        <Tree defaultOpenItems={["parent"]}>
          <TreeItem value="parent">
            <TreeItemLayout>Parent</TreeItemLayout>
            <TreeItem value="child-1">
              <TreeItemLayout>Child 1</TreeItemLayout>
            </TreeItem>
            <TreeItem value="child-2">
              <TreeItemLayout>Child 2</TreeItemLayout>
            </TreeItem>
          </TreeItem>
          <TreeItem value="standalone">
            <TreeItemLayout>Standalone</TreeItemLayout>
          </TreeItem>
        </Tree>
      ),
    },
    {
      cardHeader: "Guidelines",
      cardSubtext: "Navigation and selection patterns.",
      cardComponent: (
        <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground dark:text-slate-300">
          <li>Use icons sparingly to reduce visual clutter.</li>
          <li>Reserve selection for meaningful actions.</li>
          <li>Default open only the most relevant branches.</li>
        </ul>
      ),
    },
    {
      cardHeader: "Size",
      cardSubtext:
        "A tree can be displayed in a small or medium (default) size.",
      cardComponent: (
        <div className="flex flex-col gap-3">
          <Tree size="small" defaultOpenItems={["parent"]}>
            <TreeItem value="parent">
              <TreeItemLayout>Small tree</TreeItemLayout>
            </TreeItem>
          </Tree>
          <Tree size="medium" defaultOpenItems={["parent"]}>
            <TreeItem value="parent">
              <TreeItemLayout>Medium tree</TreeItemLayout>
            </TreeItem>
          </Tree>
        </div>
      ),
    },
    {
      cardHeader: "Appearance",
      cardSubtext: "A tree can have appearance variants.",
      cardComponent: (
        <div className="flex flex-col gap-3">
          <Tree appearance="subtle" defaultOpenItems={["parent"]}>
            <TreeItem value="parent">
              <TreeItemLayout>Subtle</TreeItemLayout>
            </TreeItem>
          </Tree>
          <Tree appearance="transparent" defaultOpenItems={["parent"]}>
            <TreeItem value="parent">
              <TreeItemLayout>Transparent</TreeItemLayout>
            </TreeItem>
          </Tree>
        </div>
      ),
    },
    {
      cardHeader: "Layouts",
      cardSubtext:
        "Tree items support two layout components: TreeItemLayout and TreeItemPersonaLayout.",
      cardComponent: (
        <Tree defaultOpenItems={["person"]}>
          <TreeItem value="person">
            <TreeItemPersonaLayout
              media={<Avatar size="sm" />}
              secondaryText="Designer"
            >
              Jamie Rivera
            </TreeItemPersonaLayout>
          </TreeItem>
        </Tree>
      ),
    },
    {
      cardHeader: "Default Open",
      cardSubtext:
        "Use the defaultOpenItems prop in the Tree component to set the default open or closed state for expandable tree item components.",
      cardComponent: (
        <Tree defaultOpenItems={["parent"]}>
          <TreeItem value="parent">
            <TreeItemLayout>Parent</TreeItemLayout>
            <TreeItem value="child-1">
              <TreeItemLayout>Child 1</TreeItemLayout>
            </TreeItem>
          </TreeItem>
        </Tree>
      ),
    },
    {
      cardHeader: "Flat Tree",
      cardSubtext: "The FlatTree component is a simplified version of Tree.",
      cardComponent: <FlatTree items={flatItems} />, // default
    },
    {
      cardHeader: "Selection",
      cardSubtext:
        "The tree component offers selectable functionality in both single and multi-selection modes.",
      cardComponent: (
        <Tree selectionMode="multiselect">
          <TreeItem value="item-1">
            <TreeItemLayout>Selectable 1</TreeItemLayout>
          </TreeItem>
          <TreeItem value="item-2">
            <TreeItemLayout>Selectable 2</TreeItemLayout>
          </TreeItem>
        </Tree>
      ),
    },
  ],
}
