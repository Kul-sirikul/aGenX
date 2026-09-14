import clsx from "clsx";
import { useRef } from "react";
import "./Input.css";

export type InputSize = "S" | "M";

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> & {
  size?: InputSize;
  leftIcon?: boolean;
  rightIcon?: boolean;
  arrow?: boolean;
  unit?: boolean;
  helpText?: boolean;
  text?: boolean;
  count?: boolean;
  button?: boolean;
  isInvalid?: boolean;
};

// Exact vector path exported from Figma "search" icon node (45:2175); reused
// at 14px for the S size — the shape scales identically via the viewBox.
function SearchIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="agx-input__icon">
      <path
        d="M13.9999 14.0005L10.5352 10.5359M10.5352 10.5359C11.4729 9.59814 11.9997 8.32632 11.9997 7.00019C11.9997 5.67406 11.4729 4.40224 10.5352 3.46452C9.59749 2.5268 8.32567 2 6.99954 2C5.6734 2 4.40159 2.5268 3.46387 3.46452C2.52615 4.40224 1.99935 5.67406 1.99935 7.00019C1.99935 8.32632 2.52615 9.59814 3.46387 10.5359C4.40159 11.4736 5.6734 12.0004 6.99954 12.0004C8.32567 12.0004 9.59749 11.4736 10.5352 10.5359Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Exact vector path exported from Figma "arrow-down" icon node (10846:15251).
function ArrowDownIcon() {
  return (
    <svg viewBox="0 0 14 14" fill="none" aria-hidden="true" className="agx-input__arrow">
      <path d="M11.375 4.8125L7 9.1875L2.625 4.8125" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Exact vector path exported from Figma "x" icon node (6410:61585).
function ClearIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="agx-input__clear-icon">
      <path d="M3.33333 12.6667L12.6667 3.33333M3.33333 3.33333L12.6667 12.6667" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Input({
  size = "M",
  leftIcon = false,
  rightIcon = false,
  arrow = false,
  unit = false,
  helpText = true,
  text = true,
  count = false,
  button = true,
  isInvalid = false,
  placeholder = "Placeholder Text",
  className,
  ...props
}: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleClear() {
    const input = inputRef.current;
    if (!input) return;
    const setValue = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set;
    setValue?.call(input, "");
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.focus();
  }

  return (
    <div className={clsx("agx-input", `agx-input--${size.toLowerCase()}`, isInvalid && "agx-input--invalid", className)}>
      <div className="agx-input__field">
        {leftIcon && (
          <span className="agx-input__icon-slot">
            <SearchIcon />
          </span>
        )}
        <input ref={inputRef} type="text" placeholder={placeholder} className="agx-input__control" {...props} />
        {rightIcon && (
          <span className="agx-input__icon-slot">
            <SearchIcon />
          </span>
        )}
        {unit && <span className="agx-input__unit">Unit</span>}
        {arrow && <ArrowDownIcon />}
        <button
          type="button"
          className="agx-input__clear"
          aria-label="Clear input"
          tabIndex={-1}
          onMouseDown={(event) => event.preventDefault()}
          onClick={handleClear}
        >
          <ClearIcon />
        </button>
      </div>
      {helpText && (
        <div className="agx-input__help-row">
          {text && <span className="agx-input__help-text">Help text</span>}
          {count && <span className="agx-input__help-count">0/1000</span>}
          {button && (
            <button type="button" className="agx-input__help-button">
              Button
            </button>
          )}
        </div>
      )}
    </div>
  );
}
