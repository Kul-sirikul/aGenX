import figma from "@figma/code-connect";
import { InputWithBadge } from "primitives";

figma.connect(InputWithBadge, "https://www.figma.com/design/Pxm4oPgp8MxkUkh5NioGtJ/-aGenX--Design-System?node-id=58-2074", {
  props: {
    counter: figma.boolean("counter"),
    iconButton: figma.boolean("iconButton"),
    isInvalid: figma.enum("state", {
      Default: false,
      Typing: false,
      Filled: false,
      "Filled and hover": false,
      Error: true,
      Disable: false,
    }),
    disabled: figma.enum("state", {
      Default: false,
      Typing: false,
      Filled: false,
      "Filled and hover": false,
      Error: false,
      Disable: true,
    }),
  },
  example: ({ counter, iconButton, isInvalid, disabled }) => (
    <InputWithBadge counter={counter} iconButton={iconButton} isInvalid={isInvalid} disabled={disabled} />
  ),
});
