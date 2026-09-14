import figma from "@figma/code-connect";
import { InputLabel } from "primitives";

figma.connect(InputLabel, "https://www.figma.com/design/Pxm4oPgp8MxkUkh5NioGtJ/-aGenX--Design-System?node-id=6609-231865", {
  props: {
    size: figma.enum("size", {
      S: "S",
      M: "M",
    }),
    infoIcon: figma.boolean("infoIcon"),
    optional: figma.boolean("optional"),
  },
  example: ({ size, infoIcon, optional }) => <InputLabel size={size} infoIcon={infoIcon} optional={optional} />,
});
