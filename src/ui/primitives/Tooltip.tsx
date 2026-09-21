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
  className?: string;
};

// A generic hover/focus tooltip built on react-aria-components.
//
// `children` must be a plain host element (e.g. <span>, <button>) — it's
// wrapped in `Focusable`, which is how TooltipTrigger injects its
// hover/focus/ref props onto a trigger that doesn't already forward them
// (most of this project's own components don't). A trigger also needs an
// interactive ARIA role (e.g. `role="button"`) or Focusable won't attach.
export function Tooltip({ children, content, placement = "top", delay = 200, className }: TooltipProps) {
  return (
    <TooltipTrigger delay={delay}>
      <Focusable>{children}</Focusable>
      <AriaTooltip className={clsx("agx-tooltip", className)} placement={placement} offset={8}>
        <OverlayArrow className="agx-tooltip__arrow">
          <svg width="9" height="6" viewBox="0 0 9 6" aria-hidden="true">
            <path d="M4.5 6L0 0H9L4.5 6Z" fill="currentColor" />
          </svg>
        </OverlayArrow>
        {content}
      </AriaTooltip>
    </TooltipTrigger>
  );
}
