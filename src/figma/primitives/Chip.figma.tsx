import figma from "@figma/code-connect";
import { Chip } from "primitives";

figma.connect(Chip, "https://www.figma.com/design/Pxm4oPgp8MxkUkh5NioGtJ/-aGenX--Design-System?node-id=9431-79043", {
  props: {
    color: figma.enum("color", {
      Gray: "Gray",
      Purple: "Purple",
    }),
    size: figma.enum("size", {
      S: "S",
      M: "M",
    }),
    icon: figma.boolean("icon"),
    alert: figma.boolean("alert"),
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
  example: ({ color, size, icon, alert, isSelected, isDisabled }) => (
    <Chip color={color} size={size} icon={icon} alert={alert} isSelected={isSelected} onChange={() => {}} isDisabled={isDisabled}>
      Chips
    </Chip>
  ),
});
