import clsx from "clsx";
import "./Badge.css";

export type BadgeColor = "Gray" | "Light gray" | "Purple" | "Green" | "Red" | "Orange" | "Blue" | "White" | "Black";
export type BadgeSize = "S" | "M";

export type BadgeProps = {
  children?: React.ReactNode;
  color?: BadgeColor;
  size?: BadgeSize;
  circle?: boolean;
  icon?: boolean;
  iconSwap?: React.ReactNode;
  action?: boolean;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
};

// Exact vector path exported from Figma "exclaimation" icon nodes — identical
// shape at every color/size (the S export is this same path scaled by 2/3),
// so one viewBox is reused and just resized per `size` via CSS.
function WarningIcon() {
  return (
    <svg viewBox="0 0 12 12" fill="none" aria-hidden="true" className="agx-badge__icon">
      <path
        d="M6 4.5V6.375M1.3485 8.063C0.9155 8.813 1.457 9.75 2.3225 9.75H9.6775C10.5425 9.75 11.084 8.813 10.6515 8.063L6.9745 1.689C6.5415 0.939 5.4585 0.939 5.0255 1.689L1.3485 8.063ZM6 7.875H6.0035V7.879H6V7.875Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Exact vector path exported from Figma "refresh" icon node (7168:97027).
function RefreshIcon() {
  return (
    <svg viewBox="0 0 10 10" fill="none" aria-hidden="true" className="agx-badge-action__icon">
      <path
        d="M6.67641 3.89559H8.75641L7.43099 2.56934C7.00427 2.14262 6.47274 1.83575 5.88983 1.67959C5.30691 1.52343 4.69316 1.52347 4.11027 1.67972C3.52738 1.83597 2.99589 2.14291 2.56924 2.5697C2.14259 2.99648 1.83581 3.52806 1.67974 4.111M3.32391 6.10559H1.24391V8.18558M1.24391 6.10559L2.56891 7.43183C2.99562 7.85856 3.52715 8.16542 4.11007 8.32158C4.69298 8.47774 5.30674 8.4777 5.88963 8.32145C6.47252 8.1652 7.004 7.85826 7.43066 7.43147C7.85731 7.00469 8.16409 6.47311 8.32016 5.89017M8.75641 1.81559V3.89475"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Badge({
  children = "Label",
  color = "Gray",
  size = "S",
  circle = true,
  icon = true,
  iconSwap,
  action = false,
  actionLabel = "Resend",
  onAction,
  className,
}: BadgeProps) {
  const pill = (
    <span
      className={clsx(
        "agx-badge",
        `agx-badge--${color.toLowerCase().replace(" ", "-")}`,
        `agx-badge--${size.toLowerCase()}`,
        !action && className,
      )}
    >
      {circle && <span className="agx-badge__circle" aria-hidden="true" />}
      {icon && <span className="agx-badge__icon-slot">{iconSwap ?? <WarningIcon />}</span>}
      <span className="agx-badge__label">{children}</span>
    </span>
  );

  if (!action) return pill;

  return (
    <span className={clsx("agx-badge-group", className)}>
      {pill}
      <button type="button" className="agx-badge-action" onClick={onAction}>
        <RefreshIcon />
        <span className="agx-badge-action__label">{actionLabel}</span>
      </button>
    </span>
  );
}
