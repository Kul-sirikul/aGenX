import clsx from "clsx";
import { useContext } from "react";
import {
  Select,
  SelectValue,
  Button,
  Popover,
  ListBox,
  SelectStateContext,
  type SelectProps,
} from "react-aria-components";
import { DropdownList } from "./DropdownList";
import "./Dropdown.css";

export type DropdownVariant = "Default" | "Ghost";
export type DropdownSize = "S" | "M";

export type DropdownProps<T extends object> = Omit<SelectProps<T>, "children" | "className"> & {
  variant?: DropdownVariant;
  size?: DropdownSize;
  leftIcon?: boolean;
  iconSwap?: React.ReactNode;
  badge?: boolean;
  /** Shows a clear button once a value is selected. Kept as `x` to match the Figma property name. */
  x?: boolean;
  errorMessage?: React.ReactNode;
  /** Shows a heading label above the list in the popover. Forwarded to `DropdownList`. */
  headling?: boolean;
  headingText?: string;
  /** Shows a search field above the list in the popover. Forwarded to `DropdownList`. */
  search?: boolean;
  items: Iterable<T>;
  children: (item: T) => React.ReactElement;
  className?: string;
};

// Exact vector path exported from Figma "trash" icon node (5112:93477).
function TrashIcon() {
  return (
    <svg viewBox="0 0 14 14" fill="none" aria-hidden="true" className="agx-dropdown__icon">
      <path
        d="M8.59833 5.2503L8.3965 10.5003M5.6035 10.5003L5.40167 5.2503M9.1875 3.14622C9.86636 3.19878 10.5431 3.27602 11.2163 3.3778C11.4158 3.40814 11.6142 3.44022 11.8125 3.47464M11.2163 3.3778L10.5933 11.4762C10.5679 11.8059 10.419 12.1139 10.1763 12.3385C9.93357 12.5632 9.61503 12.6879 9.28433 12.6878H4.71567C4.38497 12.6879 4.06643 12.5632 3.82374 12.3385C3.58105 12.1139 3.43209 11.8059 3.40667 11.4762L2.78367 3.3778M2.78367 3.3778C2.58417 3.40755 2.38583 3.43964 2.1875 3.47405M2.78367 3.3778C3.45691 3.27602 4.13364 3.19878 4.8125 3.14622M9.1875 3.14622V2.61189C9.1875 1.92355 8.65667 1.34955 7.96833 1.32797C7.32294 1.30734 6.67706 1.30734 6.03167 1.32797C5.34333 1.34955 4.8125 1.92414 4.8125 2.61189V3.14622M9.1875 3.14622C7.73134 3.03368 6.26866 3.03368 4.8125 3.14622"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Exact vector path exported from Figma "arrow-down" icon node (5112:93487), two sizes (S: 8px, M: 12px).
function ArrowDownIcon({ size }: { size: DropdownSize }) {
  return size === "S" ? (
    <svg viewBox="0 0 8 8" fill="none" aria-hidden="true" className="agx-dropdown__arrow">
      <path d="M6.5 2.75L4 5.25L1.5 2.75" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ) : (
    <svg viewBox="0 0 12 12" fill="none" aria-hidden="true" className="agx-dropdown__arrow">
      <path d="M9.75 4.125L6 7.875L2.25 4.125" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Exact vector path exported from Figma "x" icon node (10845:14623), two sizes (S: 8px, M: 14px).
function XIcon({ size }: { size: DropdownSize }) {
  return size === "S" ? (
    <svg viewBox="0 0 8 8" fill="none" aria-hidden="true" className="agx-dropdown__clear-icon">
      <path d="M1.66667 6.33333L6.33333 1.66667M1.66667 1.66667L6.33333 6.33333" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ) : (
    <svg viewBox="0 0 14 14" fill="none" aria-hidden="true" className="agx-dropdown__clear-icon">
      <path d="M2.91667 11.0833L11.0833 2.91667M2.91667 2.91667L11.0833 11.0833" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Exact vector path exported from Figma "circle" icon node (I12668:7574;9842:150749).
function CircleIcon() {
  return (
    <svg viewBox="0 0 4 4" fill="none" aria-hidden="true" className="agx-dropdown__badge-dot">
      <circle cx="2" cy="2" r="1.5" stroke="var(--icon-blue-light)" />
    </svg>
  );
}

// Rendered inside the trigger Button, so it can't be a real <button> (invalid
// nesting) — a span with a button role stands in, with press handling stopped
// from bubbling up to the trigger's own press handler.
function DropdownClearButton({ size }: { size: DropdownSize }) {
  const state = useContext(SelectStateContext);
  if (!state || state.selectedKey == null) return null;

  const clear = () => state.setSelectedKey(null);

  return (
    <span
      role="button"
      tabIndex={0}
      className="agx-dropdown__clear"
      aria-label="Clear selection"
      onPointerDown={(event) => event.stopPropagation()}
      onClick={(event) => {
        event.stopPropagation();
        clear();
      }}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          event.stopPropagation();
          clear();
        }
      }}
    >
      <XIcon size={size} />
    </span>
  );
}

export function Dropdown<T extends object>({
  variant = "Default",
  size = "M",
  leftIcon = false,
  iconSwap,
  badge = false,
  x = false,
  placeholder = "Placeholder Text",
  errorMessage,
  headling = false,
  headingText,
  search = false,
  items,
  children,
  className,
  ...props
}: DropdownProps<T>) {
  return (
    <Select
      {...props}
      placeholder={placeholder}
      className={clsx("agx-dropdown", `agx-dropdown--${variant.toLowerCase()}`, `agx-dropdown--${size.toLowerCase()}`, className)}
    >
      {({ isInvalid }) => (
        <>
          <Button className="agx-dropdown__field">
            {leftIcon && (iconSwap ?? <TrashIcon />)}
            <SelectValue
              className={({ isPlaceholder }) => clsx("agx-dropdown__value", isPlaceholder && "agx-dropdown__value--placeholder")}
            >
              {({ isPlaceholder, selectedText }) => (isPlaceholder ? placeholder : selectedText)}
            </SelectValue>
            {badge && (
              <span className="agx-dropdown__badge">
                <CircleIcon />
                Test
              </span>
            )}
            {x && <DropdownClearButton size={size} />}
            <ArrowDownIcon size={size} />
          </Button>
          {isInvalid && errorMessage && <p className="agx-dropdown__help">{errorMessage}</p>}
          <Popover className="agx-dropdown__popover" placement="bottom" shouldFlip={false}>
            <DropdownList headling={headling} headingText={headingText} search={search}>
              <ListBox items={items} className="agx-dropdown__listbox">
                {children}
              </ListBox>
            </DropdownList>
          </Popover>
        </>
      )}
    </Select>
  );
}
