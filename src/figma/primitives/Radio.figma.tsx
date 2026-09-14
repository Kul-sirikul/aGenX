import figma from "@figma/code-connect";
import { RadioGroup } from "react-aria-components";
import { Radio } from "primitives";

figma.connect(Radio, "https://www.figma.com/design/Pxm4oPgp8MxkUkh5NioGtJ/-aGenX--Design-System?node-id=6371-40115", {
  props: {
    // Figma's `check` variant maps to react-aria's selection prop; `state`
    // collapses into the real interactive states (`:hover`, `:focus-visible`,
    // `isDisabled`, `isInvalid`).
    isSelected: figma.boolean("check"),
    isDisabled: figma.enum("state", {
      Default: false,
      Hover: false,
      Focus: false,
      Disable: true,
      Error: false,
    }),
    isInvalid: figma.enum("state", {
      Default: false,
      Hover: false,
      Focus: false,
      Disable: false,
      Error: true,
    }),
  },
  // A Radio only makes sense inside a RadioGroup, which owns selection.
  example: ({ isSelected, isDisabled, isInvalid }) => (
    <RadioGroup
      value={isSelected ? "on" : null}
      isDisabled={isDisabled}
      isInvalid={isInvalid}
      aria-label="Setting"
    >
      <Radio value="on" aria-label="Setting" />
    </RadioGroup>
  ),
});
