import figma from "@figma/code-connect";
import { CheckboxCard } from "primitives";

figma.connect(CheckboxCard, "https://www.figma.com/design/Pxm4oPgp8MxkUkh5NioGtJ/-aGenX--Design-System?node-id=6076-333033", {
  props: {
    size: figma.enum("size", {
      S: "S",
      M: "M",
    }),
    badge: figma.boolean("badge"),
    // `state` collapses into real states — Selected is driven by the checkbox
    // being checked, Hover is `:hover`.
    isSelected: figma.enum("state", {
      Default: false,
      Hover: false,
      Selected: true,
    }),
  },
  example: ({ size, badge, isSelected }) => (
    <CheckboxCard size={size} badge={badge} badgeLabel="Label" isSelected={isSelected} onChange={() => {}}>
      Setting
    </CheckboxCard>
  ),
});
