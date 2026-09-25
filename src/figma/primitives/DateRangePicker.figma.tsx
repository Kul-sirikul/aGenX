import figma from "@figma/code-connect";
import { DateRangePicker } from "primitives";

figma.connect(
  DateRangePicker,
  "https://www.figma.com/design/Pxm4oPgp8MxkUkh5NioGtJ/-aGenX--Design-System?node-id=13084-2073",
  {
    example: () => <DateRangePicker label="Effective period" />,
  },
);
