import clsx from "clsx";
import { useLayoutEffect, useRef, useState } from "react";
import "./InputWithBadge.css";

function resizeToFitContent(el: HTMLTextAreaElement) {
  el.style.height = "auto";
  el.style.height = `${el.scrollHeight}px`;
}

export type InputWithBadgeProps = Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "children"> & {
  counter?: boolean;
  iconButton?: boolean;
  label?: string;
  isInvalid?: boolean;
};

// Exact vector path exported from Figma "filter" icon node (I11424:19403;752:26939).
function FilterIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="agx-input-badge__icon-button-icon">
      <path
        d="M4 9V2.5M4 9C4.26522 9 4.51957 9.10536 4.70711 9.29289C4.89464 9.48043 5 9.73478 5 10C5 10.2652 4.89464 10.5196 4.70711 10.7071C4.51957 10.8946 4.26522 11 4 11M4 9C3.73478 9 3.48043 9.10536 3.29289 9.29289C3.10536 9.48043 3 9.73478 3 10C3 10.2652 3.10536 10.5196 3.29289 10.7071C3.48043 10.8946 3.73478 11 4 11M4 11V13.5M12 9V2.5M12 9C12.2652 9 12.5196 9.10536 12.7071 9.29289C12.8946 9.48043 13 9.73478 13 10C13 10.2652 12.8946 10.5196 12.7071 10.7071C12.5196 10.8946 12.2652 11 12 11M12 9C11.7348 9 11.4804 9.10536 11.2929 9.29289C11.1054 9.48043 11 9.73478 11 10C11 10.2652 11.1054 10.5196 11.2929 10.7071C11.4804 10.8946 11.7348 11 12 11M12 11V13.5M8 5V2.5M8 5C8.26522 5 8.51957 5.10536 8.70711 5.29289C8.89464 5.48043 9 5.73478 9 6C9 6.26522 8.89464 6.51957 8.70711 6.70711C8.51957 6.89464 8.26522 7 8 7M8 5C7.73478 5 7.48043 5.10536 7.29289 5.29289C7.10536 5.48043 7 5.73478 7 6C7 6.26522 7.10536 6.51957 7.29289 6.70711C7.48043 6.89464 7.73478 7 8 7M8 7V13.5"
        stroke="currentColor"
        strokeWidth="0.888889"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function InputWithBadge({
  counter = true,
  iconButton = true,
  label = "Label",
  isInvalid = false,
  placeholder = "Placeholder Text",
  className,
  rows = 1,
  maxLength = 1000,
  value,
  defaultValue,
  onChange,
  ...props
}: InputWithBadgeProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [uncontrolledLength, setUncontrolledLength] = useState(() => String(defaultValue ?? "").length);
  const currentLength = value !== undefined ? String(value).length : uncontrolledLength;

  useLayoutEffect(() => {
    if (textareaRef.current) resizeToFitContent(textareaRef.current);
  }, []);

  return (
    <div className={clsx("agx-input-badge", isInvalid && "agx-input-badge--invalid", className)}>
      <div className="agx-input-badge__field">
        <div className="agx-input-badge__header">
          <span className="agx-input-badge__badge">{label}</span>
          {iconButton && (
            <button type="button" className="agx-input-badge__icon-button" aria-label="Filter">
              <FilterIcon />
            </button>
          )}
        </div>
        <textarea
          ref={textareaRef}
          placeholder={placeholder}
          rows={rows}
          maxLength={maxLength}
          value={value}
          defaultValue={defaultValue}
          className="agx-input-badge__control"
          onChange={(event) => {
            resizeToFitContent(event.currentTarget);
            setUncontrolledLength(event.currentTarget.value.length);
            onChange?.(event);
          }}
          {...props}
        />
      </div>
      {isInvalid ? (
        <div className="agx-input-badge__help-row">
          <span className="agx-input-badge__help-text">Help text</span>
          {counter && (
            <span className="agx-input-badge__counter">
              {currentLength}/{maxLength}
            </span>
          )}
        </div>
      ) : (
        counter && (
          <p className="agx-input-badge__counter agx-input-badge__counter--standalone">
            {currentLength}/{maxLength}
          </p>
        )
      )}
    </div>
  );
}
