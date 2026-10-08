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
      "View+default": false,
      "View+filled": false,
    }),
    disabled: figma.enum("state", {
      Default: false,
      Typing: false,
      Filled: false,
      "Filled and hover": false,
      Error: false,
      Disable: true,
      "View+default": false,
      "View+filled": false,
    }),
    view: figma.enum("state", {
      Default: false,
      Typing: false,
      Filled: false,
      "Filled and hover": false,
      Error: false,
      Disable: false,
      "View+default": true,
      "View+filled": true,
    }),
  },
  example: ({ counter, iconButton, isInvalid, disabled, view }) => (
    <InputWithBadge counter={counter} iconButton={iconButton} isInvalid={isInvalid} disabled={disabled} view={view} />
  ),
});
