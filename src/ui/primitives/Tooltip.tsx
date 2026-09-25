import clsx from "clsx";
import { Focusable, OverlayArrow, Tooltip as AriaTooltip, TooltipTrigger } from "react-aria-components";
import "./Tooltip.css";

export type TooltipPlacement = "top" | "bottom" | "left" | "right";

export type TooltipProps = {
  // A plain host element (e.g. <span>, <button>) — see the note below.
  children: React.ReactElement<React.HTMLAttributes<HTMLElement>, string>;
  content: React.ReactNode;
  placement?: TooltipPlacement;
  delay?: number;
  offset?: number;
  className?: string;
};

// A single 9×6 triangle rotated via CSS transform for left/right looked
// visibly thin and slightly detached from the tooltip body — rotating a
// non-square shape 90° swaps its visual footprint (6×9) without resizing
// its actual layout box, which is a losing battle against sub-pixel
// rounding. Figma's own tooltip asset doesn't rotate one shape either — it
// exports four separate arrow polygons, one drawn natively per direction.
// Matching that (rather than fighting the CSS transform) is what actually
// renders crisp and flush in every placement.
const ARROW_SHAPES: Record<TooltipPlacement, { width: number; height: number; d: string }> = {
  top: { width: 9, height: 6, d: "M4.5 6L0 0H9L4.5 6Z" },
  bottom: { width: 9, height: 6, d: "M4.5 0L0 6H9L4.5 0Z" },
  left: { width: 6, height: 9, d: "M0 0L6 4.5L0 9Z" },
  right: { width: 6, height: 9, d: "M6 0L0 4.5L6 9Z" },
};

// A generic hover/focus tooltip built on react-aria-components.
//
// `children` must be a plain host element (e.g. <span>, <button>) — it's
// wrapped in `Focusable`, which is how TooltipTrigger injects its
// hover/focus/ref props onto a trigger that doesn't already forward them
// (most of this project's own components don't). A trigger also needs an
// interactive ARIA role (e.g. `role="button"`) or Focusable won't attach.
export function Tooltip({ children, content, placement = "top", delay = 200, offset = 8, className }: TooltipProps) {
  const arrow = ARROW_SHAPES[placement];
  return (
    <TooltipTrigger delay={delay}>
      <Focusable>{children}</Focusable>
      <AriaTooltip className={clsx("agx-tooltip", className)} placement={placement} offset={offset}>
        <OverlayArrow className="agx-tooltip__arrow">
          <svg width={arrow.width} height={arrow.height} viewBox={`0 0 ${arrow.width} ${arrow.height}`} aria-hidden="true">
            <path d={arrow.d} fill="currentColor" />
          </svg>
        </OverlayArrow>
        {content}
      </AriaTooltip>
    </TooltipTrigger>
  );
}
