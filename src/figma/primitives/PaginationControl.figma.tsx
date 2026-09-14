import figma from "@figma/code-connect";
import { PaginationControl } from "primitives";

figma.connect(
  PaginationControl,
  "https://www.figma.com/design/Pxm4oPgp8MxkUkh5NioGtJ/-aGenX--Design-System?node-id=485-43695",
  {
    props: {
      variant: figma.enum("type", {
        Previous: "Previous",
        Next: "Next",
        Page: "Page",
        "...": "...",
      }),
      page: figma.string("page"),
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
    example: ({ variant, page, isSelected, isDisabled }) => (
      <PaginationControl variant={variant} page={page} isSelected={isSelected} isDisabled={isDisabled} />
    ),
  },
);
