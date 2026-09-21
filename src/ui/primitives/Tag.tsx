import clsx from "clsx";
import "./Tag.css";

export type TagSize = "S" | "M" | "L";
export type TagType = "Capital" | "Default";

export type TagProps = {
  children?: React.ReactNode;
  size?: TagSize;
  type?: TagType;
  x?: boolean;
  isSelected?: boolean;
  onClick?: () => void;
  onRemove?: () => void;
  onMoreActions?: () => void;
  className?: string;
};

// Exact vector path exported from Figma "x" icon node (6076:323844 / 10378:26987).
function RemoveIcon() {
  return (
    <svg viewBox="0 0 12 12" fill="none" aria-hidden="true" className="agx-tag__icon">
      <path d="M2.5 9.5L9.5 2.5M2.5 2.5L9.5 9.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Exact vector path exported from Figma "ellipsis" icon node (6076:323848 / 10378:27004).
function MoreIcon() {
  return (
    <svg viewBox="0 0 12 12" fill="none" aria-hidden="true" className="agx-tag__icon">
      <path
        d="M3.375 6C3.375 6.09946 3.33549 6.19484 3.26517 6.26516C3.19484 6.33549 3.09946 6.375 3 6.375C2.90054 6.375 2.80516 6.33549 2.73483 6.26516C2.66451 6.19484 2.625 6.09946 2.625 6C2.625 5.90054 2.66451 5.80516 2.73483 5.73484C2.80516 5.66451 2.90054 5.625 3 5.625C3.09946 5.625 3.19484 5.66451 3.26517 5.73484C3.33549 5.80516 3.375 5.90054 3.375 6ZM6.375 6C6.375 6.09946 6.33549 6.19484 6.26516 6.26516C6.19484 6.33549 6.09946 6.375 6 6.375C5.90054 6.375 5.80516 6.33549 5.73484 6.26516C5.66451 6.19484 5.625 6.09946 5.625 6C5.625 5.90054 5.66451 5.80516 5.73484 5.73484C5.80516 5.66451 5.90054 5.625 6 5.625C6.09946 5.625 6.19484 5.66451 6.26516 5.73484C6.33549 5.80516 6.375 5.90054 6.375 6ZM9.375 6C9.375 6.09946 9.33549 6.19484 9.26517 6.26516C9.19484 6.33549 9.09946 6.375 9 6.375C8.90054 6.375 8.80516 6.33549 8.73483 6.26516C8.66451 6.19484 8.625 6.09946 8.625 6C8.625 5.90054 8.66451 5.80516 8.73483 5.73484C8.80516 5.66451 8.90054 5.625 9 5.625C9.09946 5.625 9.19484 5.66451 9.26517 5.73484C9.33549 5.80516 9.375 5.90054 9.375 6Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Tag({
  children = "Tag",
  size = "M",
  type = "Capital",
  x = false,
  isSelected = false,
  onClick,
  onRemove,
  onMoreActions,
  className,
}: TagProps) {
  return (
    <span
      className={clsx(
        "agx-tag",
        `agx-tag--${size.toLowerCase()}`,
        `agx-tag--${type.toLowerCase()}`,
        onClick && "agx-tag--clickable",
        className,
      )}
      data-selected={isSelected || undefined}
      data-removable={x || undefined}
      onClick={onClick}
    >
      <span className="agx-tag__label">{children}</span>
      {onRemove && (
        <button
          type="button"
          className="agx-tag__remove"
          aria-label="Remove"
          onClick={(event) => {
            event.stopPropagation();
            onRemove();
          }}
        >
          <RemoveIcon />
        </button>
      )}
      {onMoreActions && (
        <button
          type="button"
          className="agx-tag__more"
          aria-label="More actions"
          onClick={(event) => {
            event.stopPropagation();
            onMoreActions();
          }}
        >
          <MoreIcon />
        </button>
      )}
    </span>
  );
}
