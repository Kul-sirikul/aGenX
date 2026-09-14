import figma from "@figma/code-connect";
import { StepGroup } from "primitives";

figma.connect(
  StepGroup,
  "https://www.figma.com/design/Pxm4oPgp8MxkUkh5NioGtJ/-aGenX--Design-System?node-id=10002-97849",
  {
    props: {
      direction: figma.enum("direction", {
        Vertical: "Vertical",
        Horizontal: "Horizontal",
      }),
    },
    example: ({ direction }) => (
      <StepGroup
        direction={direction}
        steps={[
          { id: "step-1", label: "Step" },
          { id: "step-2", label: "Step" },
          { id: "step-3", label: "Step" },
          { id: "step-4", label: "Step" },
        ]}
      />
    ),
  },
);
