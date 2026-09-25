import type { Meta, StoryObj } from "@storybook/react";
import { Tag, Tooltip, type TooltipPlacement } from "primitives";
import tooltipExampleImage from "./assets/tooltip-example.png";

const meta = {
  title: "Data display/Tooltip",
} satisfies Meta;

export default meta;

// Exact vector path exported from the Figma "info" icon node (13026:538).
function InfoIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M7.5 7.5L7.52733 7.48667C7.61282 7.44396 7.70875 7.42664 7.80378 7.43677C7.8988 7.4469 7.98893 7.48404 8.0635 7.54381C8.13806 7.60357 8.19394 7.68345 8.22451 7.77399C8.25508 7.86453 8.25907 7.96193 8.236 8.05467L7.764 9.94533C7.74076 10.0381 7.74463 10.1356 7.77513 10.2263C7.80563 10.3169 7.86149 10.3969 7.93609 10.4568C8.01069 10.5166 8.10089 10.5538 8.196 10.564C8.2911 10.5741 8.38712 10.5568 8.47267 10.514L8.5 10.5M14 8C14 8.78793 13.8448 9.56815 13.5433 10.2961C13.2417 11.0241 12.7998 11.6855 12.2426 12.2426C11.6855 12.7998 11.0241 13.2417 10.2961 13.5433C9.56815 13.8448 8.78793 14 8 14C7.21207 14 6.43185 13.8448 5.7039 13.5433C4.97595 13.2417 4.31451 12.7998 3.75736 12.2426C3.20021 11.6855 2.75825 11.0241 2.45672 10.2961C2.15519 9.56815 2 8.78793 2 8C2 6.4087 2.63214 4.88258 3.75736 3.75736C4.88258 2.63214 6.4087 2 8 2C9.5913 2 11.1174 2.63214 12.2426 3.75736C13.3679 4.88258 14 6.4087 14 8ZM8 5.5H8.00533V5.50533H8V5.5Z"
        stroke="var(--icon-gray)"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// The trigger's style — an info icon, matching Figma node 13026:535/13026:538.
// Inlined at each usage (rather than wrapped in its own component) because
// Tooltip's Focusable needs its direct child to be a plain host element.
const infoTriggerStyle: React.CSSProperties = {
  display: "inline-flex",
  padding: "var(--spacing-2)",
  borderRadius: "var(--radius-6-small)",
  cursor: "default",
};

// "Playground" label + info icon row, matching Figma node 13026:535.
const playgroundRowStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "var(--spacing-6)",
};

const playgroundTextStyle: React.CSSProperties = {
  fontFamily: "var(--font-family-noto-sans-thai), sans-serif",
  fontWeight: "var(--weight-semibold)",
  fontSize: "var(--size-16)",
  lineHeight: "var(--line-height-24)",
  color: "var(--text-primary)",
  whiteSpace: "nowrap",
};

// Tags row, matching Figma node 13026:546 ("Tags wrapper").
const tagRowStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "var(--spacing-4)",
};

const tagMoreStyle: React.CSSProperties = {
  cursor: "default",
  outline: "none",
};

/* ----------------------------------- Tooltip ----------------------------------- */

type TooltipArgs = {
  text: string;
  placement: TooltipPlacement;
};

export const Default: StoryObj<{ args: TooltipArgs }> = {
  name: "Tooltip",
  args: {
    text: "tooltips",
    placement: "top",
  },
  argTypes: {
    text: { control: "text" },
    placement: {
      control: "inline-radio",
      options: ["top", "bottom", "left", "right"] satisfies TooltipPlacement[],
    },
  } as Record<string, unknown>,
  render: (args) => {
    const { text, placement } = args as TooltipArgs;
    return (
      <div style={playgroundRowStyle}>
        <p style={playgroundTextStyle}>Playground</p>
        {/* `offset` is the gap from the trigger to the tooltip's own content
            box — it doesn't know about the arrow, which then extends 6px
            further out from that box toward the trigger (the arrow's own
            thickness, from its 6-unit-tall triangle). offset={0} therefore
            puts the *box* flush against the trigger, which pushes the arrow
            6px past it, overlapping the trigger instead of touching it.
            Setting offset to that same 6px is what actually makes the
            arrow's own tip land flush with zero gap. */}
        <Tooltip content={text} placement={placement} offset={6}>
          <span role="button" tabIndex={0} aria-label="More information" style={infoTriggerStyle}>
            <InfoIcon />
          </span>
        </Tooltip>
      </div>
    );
  },
};

/* --------------------------------- Tooltip Tag ---------------------------------- */

export const WithTags: StoryObj = {
  name: "Tooltip Tag",
  render: () => (
    <div style={tagRowStyle}>
      <Tag size="M" type="Capital">
        Team 1
      </Tag>
      <Tag size="M" type="Capital">
        Agents
      </Tag>
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
        {/* Figma's overflow indicator ("+2") is itself styled like a Tag, so
            it's a plain span carrying Tag's own classes rather than the Tag
            component — Focusable needs a plain host element as its child. */}
        <span role="button" tabIndex={0} aria-label="2 more tags" className="agx-tag agx-tag--m agx-tag--capital" style={tagMoreStyle}>
          <span className="agx-tag__label">+2</span>
        </span>
      </Tooltip>
    </div>
  ),
};

/* -------------------------------- Tooltip image --------------------------------- */

export const WithImage: StoryObj = {
  name: "Tooltip image",
  render: () => (
    <div style={playgroundRowStyle}>
      <p style={playgroundTextStyle}>Playground</p>
      <Tooltip
        placement="bottom"
        className="agx-tooltip--image"
        content={
          <>
            <img className="agx-tooltip__image" src={tooltipExampleImage} alt="" />
            Tags appear at the bottom of the character card to help you easily filter and find characters.
          </>
        }
      >
        <span role="button" tabIndex={0} aria-label="More information" style={infoTriggerStyle}>
          <InfoIcon />
        </span>
      </Tooltip>
    </div>
  ),
};
