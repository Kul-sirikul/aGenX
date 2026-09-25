import figma from "@figma/code-connect";
import { DatePicker } from "primitives";

figma.connect(DatePicker, "https://www.figma.com/design/Pxm4oPgp8MxkUkh5NioGtJ/-aGenX--Design-System?node-id=13084-1690", {
  example: () => <DatePicker label="Label" helpText="Help text" />,
});

figma.connect(DatePicker, "https://www.figma.com/design/Pxm4oPgp8MxkUkh5NioGtJ/-aGenX--Design-System?node-id=13084-1865", {
  example: () => <DatePicker label="Effective date" showTime />,
});
