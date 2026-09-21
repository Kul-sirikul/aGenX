import figma from "@figma/code-connect";
import { Tag, Tooltip } from "primitives";

// Figma's `direction` names the arrow's own side, which is the opposite of
// where the tooltip sits — e.g. an arrow pointing "Top" means the tooltip is
// below the trigger. It maps onto our `placement` (where the tooltip sits)
// inverted: Top→bottom, Down→top, Left→right, Right→left.
figma.connect(Tooltip, "https://www.figma.com/design/Pxm4oPgp8MxkUkh5NioGtJ/-aGenX--Design-System?node-id=115-3276", {
  props: {
    placement: figma.enum("direction", {
      Top: "bottom",
      Down: "top",
      Left: "right",
      Right: "left",
    }),
  },
  example: ({ placement }) => (
    <Tooltip content="tooltips" placement={placement}>
      <span role="button" tabIndex={0}>
        Hover me
      </span>
    </Tooltip>
  ),
});

figma.connect(Tooltip, "https://www.figma.com/design/Pxm4oPgp8MxkUkh5NioGtJ/-aGenX--Design-System?node-id=11730-7298", {
  example: () => (
    <Tooltip
      placement="top"
      className="agx-tooltip--tags"
      content={
        <>
          <Tag size="M" type="Capital">
            Team 1
          </Tag>
          <Tag size="M" type="Capital">
            Agents
          </Tag>
        </>
      }
    >
      <span role="button" tabIndex={0}>
        Hover me
      </span>
    </Tooltip>
  ),
});

figma.connect(Tooltip, "https://www.figma.com/design/Pxm4oPgp8MxkUkh5NioGtJ/-aGenX--Design-System?node-id=11766-1466", {
  example: () => (
    <Tooltip
      placement="bottom"
      className="agx-tooltip--image"
      content={
        <>
          {/* Swap in the real image for your use case. */}
          <img className="agx-tooltip__image" src="/path/to/image.png" alt="" />
          Tags appear at the bottom of the character card to help you easily filter and find characters.
        </>
      }
    >
      <span role="button" tabIndex={0}>
        Hover me
      </span>
    </Tooltip>
  ),
});
