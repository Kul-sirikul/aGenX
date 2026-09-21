import figma from "@figma/code-connect";
import { Badge } from "primitives";

figma.connect(Badge, "https://www.figma.com/design/Pxm4oPgp8MxkUkh5NioGtJ/-aGenX--Design-System?node-id=12992-650", {
  props: {
    color: figma.enum("color", {
      Gray: "Gray",
      "Light gray": "Light gray",
      Purple: "Purple",
      Green: "Green",
      Red: "Red",
      Orange: "Orange",
      Blue: "Blue",
      White: "White",
      Black: "Black",
    }),
    size: figma.enum("size", {
      S: "S",
      M: "M",
    }),
    circle: figma.boolean("circle"),
    icon: figma.boolean("icon"),
  },
  example: ({ color, size, circle, icon }) => (
    <Badge color={color} size={size} circle={circle} icon={icon}>
      Label
    </Badge>
  ),
});
