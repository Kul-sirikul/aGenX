import figma from "@figma/code-connect";
import { InputTag } from "primitives";

figma.connect(InputTag, "https://www.figma.com/design/Pxm4oPgp8MxkUkh5NioGtJ/-aGenX--Design-System?node-id=12967-72454", {
  // Figma's `state` (Default/Filled/Filled vertical/Typing) collapses into
  // real behavior — flex-wrap handles single- vs multi-line tags, and
  // "Typing" is just `:focus-within`. There's nothing left to map as a prop.
  example: () => <InputTag defaultValue={["Tag", "Tag", "Tag"]} />,
});
