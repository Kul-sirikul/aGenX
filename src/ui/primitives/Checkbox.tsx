import clsx from "clsx";
import { Checkbox as AriaCheckbox, type CheckboxProps as AriaCheckboxProps } from "react-aria-components";
import "./Checkbox.css";

export type CheckboxProps = Omit<AriaCheckboxProps, "children"> & {
  children?: React.ReactNode;
};

// Exact vector path exported from Figma "check" icon node (49:2832).
function CheckIcon() {
  return (
    <svg viewBox="0 0 12 12" fill="none" aria-hidden="true" className="agx-checkbox-box__icon">
      <path d="M2.25 6.375L5.25 9.375L9.75 2.625" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Exact vector path exported from Figma "dash" icon node (49:2840).
function DashIcon() {
  return (
    <svg viewBox="0 0 12 12" fill="none" aria-hidden="true" className="agx-checkbox-box__icon">
      <path d="M2.5 6L9.5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

type CheckboxBoxProps = {
  isSelected?: boolean;
  isIndeterminate?: boolean;
  isDisabled?: boolean;
};

// The 16px checked/unchecked/indeterminate square. Shared by Checkbox,
// CheckboxWithLabel and CheckboxCard so the indicator is identical everywhere.
export function CheckboxBox({ isSelected = false, isIndeterminate = false, isDisabled = false }: CheckboxBoxProps) {
  return (
    <span
      className="agx-checkbox-box"
      aria-hidden="true"
      data-selected={isSelected || undefined}
      data-indeterminate={isIndeterminate || undefined}
      data-disabled={isDisabled || undefined}
    >
      {isIndeterminate ? <DashIcon /> : isSelected ? <CheckIcon /> : null}
    </span>
  );
}

export function Checkbox({ children, className, ...props }: CheckboxProps) {
  return (
    <AriaCheckbox {...props} className={clsx("agx-checkbox", className)}>
      {({ isSelected, isIndeterminate, isDisabled }) => (
        <>
          <CheckboxBox isSelected={isSelected} isIndeterminate={isIndeterminate} isDisabled={isDisabled} />
          {children != null && <span className="agx-checkbox__label">{children}</span>}
        </>
      )}
    </AriaCheckbox>
  );
}
