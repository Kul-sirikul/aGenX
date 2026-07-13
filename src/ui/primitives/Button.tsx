import clsx from "clsx";
import { Button as AriaButton, type ButtonProps as AriaButtonProps } from "react-aria-components";
import "./Button.css";

export type ButtonVariant =
  | "Primary"
  | "Primary dropdown"
  | "Secondary"
  | "Secondary dropdown"
  | "Ghost"
  | "Red";

export type ButtonProps = Omit<AriaButtonProps, "children"> & {
  size?: "S" | "M";
  variant?: ButtonVariant;
  leftIcon?: boolean;
  rightIcon?: boolean;
  children?: React.ReactNode;
};

const variantSlug: Record<ButtonVariant, string> = {
  Primary: "primary",
  "Primary dropdown": "primary-dropdown",
  Secondary: "secondary",
  "Secondary dropdown": "secondary-dropdown",
  Ghost: "ghost",
  Red: "red",
};

function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="agx-button__icon">
      <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowDownIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="agx-button__icon">
      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Button({
  size = "M",
  variant = "Primary",
  leftIcon = true,
  rightIcon = true,
  className,
  children = "Button",
  ...props
}: ButtonProps) {
  const isDropdown = variant === "Primary dropdown" || variant === "Secondary dropdown";

  return (
    <AriaButton
      {...props}
      className={clsx(
        "agx-button",
        `agx-button--${variantSlug[variant]}`,
        `agx-button--${size.toLowerCase()}`,
        isDropdown && "agx-button--dropdown",
        className,
      )}
    >
      <span className="agx-button__label">
        {leftIcon && <ArrowRightIcon />}
        <span className="agx-button__text">{children}</span>
        {!isDropdown && rightIcon && <ArrowRightIcon />}
      </span>
      {isDropdown && rightIcon && (
        <span className="agx-button__chevron">
          <ArrowDownIcon />
        </span>
      )}
    </AriaButton>
  );
}
