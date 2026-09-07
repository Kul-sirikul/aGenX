import figma from "@figma/code-connect";
import { TabContainer } from "primitives";

figma.connect(
  TabContainer,
  "https://www.figma.com/design/Pxm4oPgp8MxkUkh5NioGtJ/-aGenX--Design-System?node-id=1646-88983",
  {
    props: {
      variant: figma.enum("type", {
        Ghost: "Ghost",
        Container: "Container",
      }),
    },
    example: ({ variant }) => (
      <TabContainer
        variant={variant}
        tabs={[
          { id: "tab-1", label: "Title" },
          { id: "tab-2", label: "Title" },
          { id: "tab-3", label: "Title" },
          { id: "tab-4", label: "Title" },
        ]}
        defaultSelectedKey="tab-1"
      />
    ),
  },
);
