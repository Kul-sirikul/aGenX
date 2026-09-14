import figma from "@figma/code-connect";
import { CheckboxWithLabel } from "primitives";

figma.connect(CheckboxWithLabel, "https://www.figma.com/design/Pxm4oPgp8MxkUkh5NioGtJ/-aGenX--Design-System?node-id=5140-40666", {
  props: {
    checkboxPosition: figma.enum("checkboxPosition", {
      Back: "Back",
      Front: "Front",
    }),
    description1: figma.boolean("description1", {
      true: "CYLOAN01",
      false: undefined,
    }),
    description2: figma.boolean("description2", {
      true: "Setting",
      false: undefined,
    }),
    icon: figma.boolean("icon"),
  },
  example: ({ checkboxPosition, description1, description2, icon }) => (
    <CheckboxWithLabel
      label="Setting"
      checkboxPosition={checkboxPosition}
      description1={description1}
      description2={description2}
      icon={icon}
      onChange={() => {}}
    />
  ),
});
