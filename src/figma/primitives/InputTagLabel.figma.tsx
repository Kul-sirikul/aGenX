import figma from "@figma/code-connect";
import { InputTagLabel } from "primitives";

figma.connect(InputTagLabel, "https://www.figma.com/design/Pxm4oPgp8MxkUkh5NioGtJ/-aGenX--Design-System?node-id=12838-4157", {
  example: () => <InputTagLabel label="Tags" maxTags={5} defaultValue={["Team 1", "Agents"]} />,
});
