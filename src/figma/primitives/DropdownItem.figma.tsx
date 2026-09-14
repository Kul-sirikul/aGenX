import figma from "@figma/code-connect";
import { ListBox } from "react-aria-components";
import { DropdownItem } from "primitives";

figma.connect(DropdownItem, "https://www.figma.com/design/Pxm4oPgp8MxkUkh5NioGtJ/-aGenX--Design-System?node-id=245-7036", {
  props: {
    type: figma.enum("type", {
      Main: "Main",
      Sub: "Sub",
    }),
    checkbox: figma.boolean("checkbox"),
    leftIcon: figma.boolean("leftIcon"),
    rightIcon: figma.boolean("rightIcon"),
    text: figma.string("text"),
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
  // DropdownItem only becomes "selected" when its id matches the parent
  // ListBox's selectedKeys — there's no standalone isSelected prop on the component.
  example: ({ type, checkbox, leftIcon, rightIcon, text, isSelected, isDisabled }) => (
    <ListBox aria-label="Dropdown" selectionMode="single" selectedKeys={isSelected ? ["item"] : []}>
      <DropdownItem id="item" type={type} checkbox={checkbox} leftIcon={leftIcon} rightIcon={rightIcon} isDisabled={isDisabled}>
        {text}
      </DropdownItem>
    </ListBox>
  ),
});
