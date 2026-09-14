import figma from "@figma/code-connect";
import { Dropdown, DropdownItem } from "primitives";

const SAMPLE_ITEMS = [
  { id: "item-1", label: "Placeholder Text" },
  { id: "item-2", label: "Placeholder Text" },
];

figma.connect(Dropdown, "https://www.figma.com/design/Pxm4oPgp8MxkUkh5NioGtJ/-aGenX--Design-System?node-id=5112-93475", {
  props: {
    // Figma's `type` prop is renamed to `variant` — `type` collides with the
    // native button `type` attribute.
    variant: figma.enum("type", {
      Default: "Default",
      Ghost: "Ghost",
    }),
    size: figma.enum("size", {
      S: "S",
      M: "M",
    }),
    leftIcon: figma.boolean("leftIcon"),
    badge: figma.boolean("badge"),
    x: figma.boolean("x"),
    isInvalid: figma.enum("state", {
      Default: false,
      Hover: false,
      Focus: false,
      Selected: false,
      "Selected+Focus": false,
      Error: true,
      Disabled: false,
    }),
    isDisabled: figma.enum("state", {
      Default: false,
      Hover: false,
      Focus: false,
      Selected: false,
      "Selected+Focus": false,
      Error: false,
      Disabled: true,
    }),
  },
  example: ({ variant, size, leftIcon, badge, x, isInvalid, isDisabled }) => (
    <Dropdown
      variant={variant}
      size={size}
      leftIcon={leftIcon}
      badge={badge}
      x={x}
      isInvalid={isInvalid}
      isDisabled={isDisabled}
      errorMessage="Help text"
      items={SAMPLE_ITEMS}
    >
      {(item) => <DropdownItem id={item.id}>{item.label}</DropdownItem>}
    </Dropdown>
  ),
});
