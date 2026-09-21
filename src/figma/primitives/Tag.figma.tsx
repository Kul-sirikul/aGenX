import figma from "@figma/code-connect";
import { Tag } from "primitives";

figma.connect(Tag, "https://www.figma.com/design/Pxm4oPgp8MxkUkh5NioGtJ/-aGenX--Design-System?node-id=6076-323841", {
  props: {
    size: figma.enum("size", {
      S: "S",
      M: "M",
      L: "L",
    }),
    type: figma.enum("type", {
      Capital: "Capital",
      Default: "Default",
    }),
    x: figma.boolean("x"),
    // `state` collapses into real states — Hover is `:hover`, Selected is a
    // real prop since it persists rather than depending on the pointer.
    isSelected: figma.enum("state", {
      Default: false,
      Hover: false,
      Selected: true,
    }),
  },
  example: ({ size, type, x, isSelected }) => (
    <Tag size={size} type={type} x={x} isSelected={isSelected} onRemove={x ? () => {} : undefined}>
      Tag
    </Tag>
  ),
});
