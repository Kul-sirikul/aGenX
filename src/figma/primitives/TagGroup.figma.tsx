import figma from "@figma/code-connect";
import { TagGroup } from "primitives";

figma.connect(TagGroup, "https://www.figma.com/design/Pxm4oPgp8MxkUkh5NioGtJ/-aGenX--Design-System?node-id=12971-73054", {
  example: () => <TagGroup tags={["Team 1", "Agents", "Knowledge Base", "Almo"]} max={2} />,
});
