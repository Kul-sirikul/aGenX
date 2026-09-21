import clsx from "clsx";
import { Focusable, OverlayArrow, Tooltip, TooltipTrigger } from "react-aria-components";
import { Tag } from "./Tag";
import "./TagGroup.css";

export type TagGroupProps = {
  tags: string[];
  max?: number;
  className?: string;
};

// Figma's overflow indicator ("+2") is itself styled like a Tag, so it's a
// plain span carrying Tag's own classes rather than the Tag component (which
// doesn't forward a ref/rest props). TooltipTrigger needs a `Focusable`
// wrapper to inject its hover/focus/ref props onto a plain host element like
// this — without it, the trigger never opens the tooltip.
export function TagGroup({ tags, max = 2, className }: TagGroupProps) {
  const visible = tags.slice(0, max);
  const hidden = tags.slice(max);

  return (
    <div className={clsx("agx-tag-group", className)}>
      {visible.map((tag, index) => (
        <Tag key={`${tag}-${index}`} size="M" type="Capital">
          {tag}
        </Tag>
      ))}
      {hidden.length > 0 && (
        <TooltipTrigger delay={200}>
          <Focusable>
            <span
              className="agx-tag agx-tag--m agx-tag--capital agx-tag-group__more"
              role="button"
              tabIndex={0}
              aria-label={`${hidden.length} more tag${hidden.length === 1 ? "" : "s"}`}
            >
              <span className="agx-tag__label">{`+${hidden.length}`}</span>
            </span>
          </Focusable>
          <Tooltip className="agx-tag-group__tooltip" placement="top" offset={8}>
            <OverlayArrow className="agx-tag-group__tooltip-arrow">
              <svg width="10" height="8" viewBox="0 0 10 8" aria-hidden="true">
                <path d="M5 8L0 0H10L5 8Z" fill="currentColor" />
              </svg>
            </OverlayArrow>
            <div className="agx-tag-group__tooltip-tags">
              {hidden.map((tag, index) => (
                <Tag key={`${tag}-${index}`} size="M" type="Capital">
                  {tag}
                </Tag>
              ))}
            </div>
          </Tooltip>
        </TooltipTrigger>
      )}
    </div>
  );
}
