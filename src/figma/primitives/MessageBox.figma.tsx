import figma from "@figma/code-connect";
import { MessageBox } from "primitives";

figma.connect(MessageBox, "https://www.figma.com/design/Pxm4oPgp8MxkUkh5NioGtJ/-aGenX--Design-System?node-id=13035-2843", {
  props: {
    type: figma.enum("type", {
      Default: "Default",
      Information: "Information",
      Warning: "Warning",
      Success: "Success",
      Error: "Error",
    }),
    icon: figma.boolean("icon"),
    rightIcon: figma.boolean("rightIcon"),
    viewDetail: figma.boolean("viewDetail"),
  },
  example: ({ type, icon, rightIcon, viewDetail }) => (
    <MessageBox type={type} icon={icon} rightIcon={rightIcon} viewDetail={viewDetail}>
      Message box
    </MessageBox>
  ),
});
