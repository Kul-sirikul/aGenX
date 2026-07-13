import figma from "@figma/code-connect";
import { Button } from "primitives";

figma.connect(
  Button,
  "https://www.figma.com/design/Pxm4oPgp8MxkUkh5NioGtJ/-aGenX--Design-System?node-id=45-1917",
  {
    props: {
      size: figma.enum("size", { S: "S", M: "M" }),
      variant: figma.enum("type", {
        Primary: "Primary",
        "Primary dropdown": "Primary dropdown",
        Secondary: "Secondary",
        "Secondary dropdown": "Secondary dropdown",
        Ghost: "Ghost",
        Red: "Red",
      }),
      leftIcon: figma.boolean("leftIcon"),
      rightIcon: figma.boolean("rightIcon"),
      isDisabled: figma.enum("state", {
        Default: false,
        Hover: false,
        Focus: false,
        Disabled: true,
      }),
    },
    example: ({ size, variant, leftIcon, rightIcon, isDisabled }) => (
      <Button size={size} variant={variant} leftIcon={leftIcon} rightIcon={rightIcon} isDisabled={isDisabled}>
        Button
      </Button>
    ),
  },
);
