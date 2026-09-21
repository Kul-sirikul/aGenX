import figma from "@figma/code-connect";
import { ToggleWithLabel } from "primitives";

figma.connect(ToggleWithLabel, "https://www.figma.com/design/Pxm4oPgp8MxkUkh5NioGtJ/-aGenX--Design-System?node-id=10006-72755", {
  props: {
    type: figma.enum("type", {
      Default: "Default",
      BG: "BG",
    }),
    info: figma.boolean("info"),
  },
  example: ({ type, info }) => (
    <ToggleWithLabel label="Title" type={type} info={info} isSelected onChange={() => {}} />
  ),
});
