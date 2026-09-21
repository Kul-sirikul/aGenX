import figma from "@figma/code-connect";
import { AdditionalTag } from "primitives";

figma.connect(AdditionalTag, "https://www.figma.com/design/Pxm4oPgp8MxkUkh5NioGtJ/-aGenX--Design-System?node-id=12967-72929", {
  props: {
    // `state` collapses into real behavior — whether any tags exist.
    defaultValue: figma.enum("state", {
      Empty: [],
      Added: ["SCB Wealth - SCB", "SCB Wallet - SCB", "SCBX - SCB"],
    }),
  },
  example: ({ defaultValue }) => <AdditionalTag defaultValue={defaultValue} />,
});
