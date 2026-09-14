import clsx from "clsx";
import { ListBoxItem, type ListBoxItemProps } from "react-aria-components";
import "./DropdownItem.css";

export type DropdownItemType = "Main" | "Sub";

export type DropdownItemProps = Omit<ListBoxItemProps, "children"> & {
  type?: DropdownItemType;
  checkbox?: boolean;
  leftIcon?: boolean;
  iconSwap?: React.ReactNode;
  rightIcon?: boolean;
  children?: React.ReactNode;
};

// Exact vector path exported from Figma "trash" icon node (245:7039).
function TrashIcon() {
  return (
    <svg viewBox="0 0 14 14" fill="none" aria-hidden="true" className="agx-dropdown-item__icon">
      <path
        d="M8.59833 5.2503L8.3965 10.5003M5.6035 10.5003L5.40167 5.2503M9.1875 3.14622C9.86636 3.19878 10.5431 3.27602 11.2163 3.3778C11.4158 3.40814 11.6142 3.44022 11.8125 3.47464M11.2163 3.3778L10.5933 11.4762C10.5679 11.8059 10.419 12.1139 10.1763 12.3385C9.93357 12.5632 9.61503 12.6879 9.28433 12.6878H4.71567C4.38497 12.6879 4.06643 12.5632 3.82374 12.3385C3.58105 12.1139 3.43209 11.8059 3.40667 11.4762L2.78367 3.3778M2.78367 3.3778C2.58417 3.40755 2.38583 3.43964 2.1875 3.47405M2.78367 3.3778C3.45691 3.27602 4.13364 3.19878 4.8125 3.14622M9.1875 3.14622V2.61189C9.1875 1.92355 8.65667 1.34955 7.96833 1.32797C7.32294 1.30734 6.67706 1.30734 6.03167 1.32797C5.34333 1.34955 4.8125 1.92414 4.8125 2.61189V3.14622M9.1875 3.14622C7.73134 3.03368 6.26866 3.03368 4.8125 3.14622"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Exact vector path exported from Figma "arrow-right" icon node (5124:112885).
function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 14 14" fill="none" aria-hidden="true" className="agx-dropdown-item__icon">
      <path d="M4.8125 2.625L9.1875 7L4.8125 11.375" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Exact vector path exported from Figma "check" icon node (49:2832), used inside the checkbox.
function CheckIcon() {
  return (
    <svg viewBox="0 0 12 12" fill="none" aria-hidden="true" className="agx-dropdown-item__checkbox-check">
      <path d="M2.25 6.375L5.25 9.375L9.75 2.625" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Exact vector path exported from Figma "check" icon node (245:7049), shown trailing on selected items.
function SelectedCheckIcon() {
  return (
    <svg viewBox="0 0 12 12" fill="none" aria-hidden="true" className="agx-dropdown-item__selected-check">
      <path d="M2.25 6.375L5.25 9.375L9.75 2.625" stroke="var(--icon-purple)" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ItemCheckbox({ checked }: { checked: boolean }) {
  return (
    <span className={clsx("agx-dropdown-item__checkbox", checked && "agx-dropdown-item__checkbox--checked")}>
      {checked && <CheckIcon />}
    </span>
  );
}

export function DropdownItem({
  type = "Main",
  checkbox = false,
  leftIcon = true,
  iconSwap,
  rightIcon = false,
  children = "text",
  className,
  ...props
}: DropdownItemProps) {
  return (
    <ListBoxItem
      {...props}
      textValue={typeof children === "string" ? children : props.textValue}
      className={clsx("agx-dropdown-item", `agx-dropdown-item--${type.toLowerCase()}`, className)}
    >
      {({ isSelected }) => (
        <>
          {checkbox && <ItemCheckbox checked={isSelected} />}
          {leftIcon && (iconSwap ?? <TrashIcon />)}
          <span className="agx-dropdown-item__label">{children}</span>
          {rightIcon && <ArrowRightIcon />}
          {!checkbox && isSelected && <SelectedCheckIcon />}
        </>
      )}
    </ListBoxItem>
  );
}
