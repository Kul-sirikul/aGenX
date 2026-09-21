import figma from "@figma/code-connect";
import { Toast } from "primitives";

figma.connect(Toast, "https://www.figma.com/design/Pxm4oPgp8MxkUkh5NioGtJ/-aGenX--Design-System?node-id=13035-313", {
  props: {
    state: figma.enum("state", {
      Default: "Default",
      Failed: "Failed",
    }),
    showButtonText: figma.boolean("showButtonText"),
  },
  example: ({ state, showButtonText }) => (
    <Toast state={state} showButtonText={showButtonText}>
      Place holder
    </Toast>
  ),
});
