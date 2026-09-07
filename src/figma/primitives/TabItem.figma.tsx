import figma from "@figma/code-connect";
import { Tabs, TabList } from "react-aria-components";
import { TabItem } from "primitives";

figma.connect(
  TabItem,
  "https://www.figma.com/design/Pxm4oPgp8MxkUkh5NioGtJ/-aGenX--Design-System?node-id=262-6678",
  {
    props: {
      variant: figma.enum("type", {
        Ghost: "Ghost",
        Container: "Container",
      }),
      noti: figma.boolean("noti"),
      count: figma.boolean("count"),
      isSelected: figma.enum("state", {
        Default: false,
        Hover: false,
        Selected: true,
        Disable: false,
      }),
      isDisabled: figma.enum("state", {
        Default: false,
        Hover: false,
        Selected: false,
        Disable: true,
      }),
    },
    // TabItem only becomes "selected" when its id matches the parent Tabs'
    // selectedKey — there's no standalone isSelected prop on the component.
    example: ({ variant, noti, count, isSelected, isDisabled }) => (
      <Tabs selectedKey={isSelected ? "tab" : undefined}>
        <TabList aria-label="Tabs">
          <TabItem id="tab" variant={variant} noti={noti} count={count} isDisabled={isDisabled}>
            Title
          </TabItem>
        </TabList>
      </Tabs>
    ),
  },
);
