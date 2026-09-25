import figma from "@figma/code-connect";
import { Banner } from "primitives";

figma.connect(Banner, "https://www.figma.com/design/Pxm4oPgp8MxkUkh5NioGtJ/-aGenX--Design-System?node-id=12370-6167", {
  props: {
    type: figma.enum("state", {
      Default: "Default",
      Information: "Information",
      Warning: "Warning",
      Success: "Success",
      Error: "Error",
    }),
    showTitle: figma.boolean("title"),
    showButton: figma.boolean("button"),
    icon: figma.boolean("icon"),
    x: figma.boolean("x"),
  },
  example: ({ type, showTitle, showButton, icon, x }) => (
    <Banner type={type} showTitle={showTitle} showButton={showButton} icon={icon} x={x}>
      Description
    </Banner>
  ),
});
