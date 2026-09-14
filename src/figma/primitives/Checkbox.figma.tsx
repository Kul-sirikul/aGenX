import figma from "@figma/code-connect";
import { Checkbox } from "primitives";

figma.connect(Checkbox, "https://www.figma.com/design/Pxm4oPgp8MxkUkh5NioGtJ/-aGenX--Design-System?node-id=49-2828", {
  props: {
    // Figma's `check` / `indeterminate` variants map to react-aria's controlled
    // selection props; `state` collapses into the real interactive states
    // (`:hover`, `:focus-visible`, `isDisabled`).
    isSelected: figma.boolean("check"),
    isIndeterminate: figma.boolean("indeterminate"),
    isDisabled: figma.enum("state", {
      Default: false,
      Hover: false,
      Focus: false,
      Disable: true,
    }),
  },
  example: ({ isSelected, isIndeterminate, isDisabled }) => (
    <Checkbox
      isSelected={isSelected}
      isIndeterminate={isIndeterminate}
      isDisabled={isDisabled}
      onChange={() => {}}
      aria-label="Setting"
    />
  ),
});
