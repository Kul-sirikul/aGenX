import clsx from "clsx";
import { ToggleButton, type ToggleButtonProps } from "react-aria-components";
import "./Chip.css";

export type ChipColor = "Gray" | "Purple";
export type ChipSize = "S" | "M";

export type ChipProps = Omit<ToggleButtonProps, "children"> & {
  color?: ChipColor;
  size?: ChipSize;
  icon?: boolean;
  iconSwap?: React.ReactNode;
  alert?: boolean;
  children?: React.ReactNode;
};

// Exact vector paths exported from Figma "arrow-long-right" icon nodes (10001:75187, 10001:73871).
function ArrowIcon({ size }: { size: ChipSize }) {
  return size === "M" ? (
    <svg
      viewBox="0 0 10 8.5"
      fill="none"
      aria-hidden="true"
      className="agx-chip__icon"
      style={{ transform: "rotate(180deg)" }}
    >
      <path d="M4.25 0.5L0.5 4.25L4.25 8M0.5 4.25H9.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ) : (
    <svg
      viewBox="0 0 8.5 7.25"
      fill="none"
      aria-hidden="true"
      className="agx-chip__icon"
      style={{ transform: "rotate(180deg)" }}
    >
      <path d="M3.625 0.5L0.5 3.625L3.625 6.75M0.5 3.625H8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Exact vector paths exported from Figma "check" icon nodes (10002:82240, 10002:82254).
function CheckIcon({ size }: { size: ChipSize }) {
  return size === "M" ? (
    <svg viewBox="0 0 8.50005 7.75006" fill="none" aria-hidden="true" className="agx-chip__check">
      <path d="M0.5 4.25005L3.5 7.25005L8 0.500053" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ) : (
    <svg viewBox="0 0 7.25005 6.62506" fill="none" aria-hidden="true" className="agx-chip__check">
      <path d="M0.5 3.62505L3 6.12505L6.75 0.500053" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Exact vector path exported from Figma "exclaimation-solid" icon node (10001:75781).
function AlertIcon() {
  return (
    <svg viewBox="0 0 8.63249 7.81167" fill="none" aria-hidden="true" className="agx-chip__alert">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.23336 0.625C3.71461 -0.208333 4.91794 -0.208333 5.39878 0.625L8.46336 5.93667C8.94419 6.77 8.34253 7.81167 7.38044 7.81167H1.25169C0.289611 7.81167 -0.311639 6.77 0.169194 5.93667L3.23294 0.625H3.23336ZM4.31628 2.81125C4.39916 2.81125 4.47864 2.84417 4.53725 2.90278C4.59585 2.96138 4.62878 3.04087 4.62878 3.12375V4.68625C4.62878 4.76913 4.59585 4.84862 4.53725 4.90722C4.47864 4.96583 4.39916 4.99875 4.31628 4.99875C4.2334 4.99875 4.15391 4.96583 4.09531 4.90722C4.0367 4.84862 4.00378 4.76913 4.00378 4.68625V3.12375C4.00378 3.04087 4.0367 2.96138 4.09531 2.90278C4.15391 2.84417 4.2334 2.81125 4.31628 2.81125ZM4.31628 6.24875C4.39916 6.24875 4.47864 6.21583 4.53725 6.15722C4.59585 6.09862 4.62878 6.01913 4.62878 5.93625C4.62878 5.85337 4.59585 5.77388 4.53725 5.71528C4.47864 5.65667 4.39916 5.62375 4.31628 5.62375C4.2334 5.62375 4.15391 5.65667 4.09531 5.71528C4.0367 5.77388 4.00378 5.85337 4.00378 5.93625C4.00378 6.01913 4.0367 6.09862 4.09531 6.15722C4.15391 6.21583 4.2334 6.24875 4.31628 6.24875Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Chip({
  color = "Gray",
  size = "S",
  icon = true,
  iconSwap,
  alert = false,
  children = "Chips",
  className,
  ...props
}: ChipProps) {
  return (
    <ToggleButton
      {...props}
      className={clsx("agx-chip", `agx-chip--${color.toLowerCase()}`, `agx-chip--${size.toLowerCase()}`, className)}
    >
      {({ isSelected }) => (
        <>
          {alert && <AlertIcon />}
          {isSelected && <CheckIcon size={size} />}
          <span className="agx-chip__label">{children}</span>
          {icon && (iconSwap ?? <ArrowIcon size={size} />)}
        </>
      )}
    </ToggleButton>
  );
}
