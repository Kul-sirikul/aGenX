import figma from "@figma/code-connect";
import { ButtonIcon } from "primitives";

figma.connect(
  ButtonIcon,
  "https://www.figma.com/design/Pxm4oPgp8MxkUkh5NioGtJ/-aGenX--Design-System?node-id=45-2113",
  {
    props: {
      size: figma.enum("size", { "20": "20", "24": "24", "28": "28", "36": "36" }),
      bg: figma.boolean("bg"),
      error: figma.boolean("error"),
      isSelected: figma.enum("state", {
        Default: false,
        Hover: false,
        Selected: true,
        Disabled: false,
      }),
      isDisabled: figma.enum("state", {
        Default: false,
        Hover: false,
        Selected: false,
        Disabled: true,
      }),
    },
    example: ({ size, bg, error, isSelected, isDisabled }) => (
      <ButtonIcon size={size} bg={bg} error={error} isSelected={isSelected} isDisabled={isDisabled} />
    ),
  },
);
