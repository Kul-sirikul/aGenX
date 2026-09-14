import figma from "@figma/code-connect";
import { Step } from "primitives";

figma.connect(
  Step,
  "https://www.figma.com/design/Pxm4oPgp8MxkUkh5NioGtJ/-aGenX--Design-System?node-id=6318-166970",
  {
    props: {
      status: figma.enum("step", {
        Default: "Default",
        Current: "Current",
        Finished: "Finished",
        "Current+Finished": "Current+Finished",
      }),
      title: figma.boolean("title"),
      alert: figma.boolean("alert"),
      resend: figma.boolean("resend"),
    },
    example: ({ status, title, alert, resend }) => (
      <Step status={status} title={title} alert={alert} resend={resend}>
        Step
      </Step>
    ),
  },
);
