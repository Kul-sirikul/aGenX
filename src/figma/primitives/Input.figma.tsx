import figma from "@figma/code-connect";
import { Input } from "primitives";

figma.connect(Input, "https://www.figma.com/design/Pxm4oPgp8MxkUkh5NioGtJ/-aGenX--Design-System?node-id=45-2173", {
  props: {
    size: figma.enum("size", {
      S: "S",
      M: "M",
    }),
    leftIcon: figma.boolean("leftIcon"),
    rightIcon: figma.boolean("rightIcon"),
    arrow: figma.boolean("arrow"),
    unit: figma.boolean("unit"),
    helpText: figma.boolean("helpText"),
    text: figma.boolean("text"),
    count: figma.boolean("count"),
    button: figma.boolean("button"),
    isInvalid: figma.enum("state", {
      Default: false,
      Focus: false,
      Typing: false,
      Filled: false,
      "Filled+hover": false,
      Error: true,
      Disable: false,
    }),
    disabled: figma.enum("state", {
      Default: false,
      Focus: false,
      Typing: false,
      Filled: false,
      "Filled+hover": false,
      Error: false,
      Disable: true,
    }),
  },
  example: ({ size, leftIcon, rightIcon, arrow, unit, helpText, text, count, button, isInvalid, disabled }) => (
    <Input
      size={size}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      arrow={arrow}
      unit={unit}
      helpText={helpText}
      text={text}
      count={count}
      button={button}
      isInvalid={isInvalid}
      disabled={disabled}
    />
  ),
});
