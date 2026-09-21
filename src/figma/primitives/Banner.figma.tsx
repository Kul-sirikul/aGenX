import figma from "@figma/code-connect";
import { Banner } from "primitives";

figma.connect(Banner, "https://www.figma.com/design/Pxm4oPgp8MxkUkh5NioGtJ/-aGenX--Design-System?node-id=12370-6167", {
  props: {
    showTitle: figma.boolean("title"),
    showButton: figma.boolean("button"),
    icon: figma.boolean("icon"),
    x: figma.boolean("x"),
  },
  example: ({ showTitle, showButton, icon, x }) => (
    <Banner showTitle={showTitle} showButton={showButton} icon={icon} x={x}>
      Description
    </Banner>
  ),
});
