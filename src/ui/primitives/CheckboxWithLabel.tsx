import clsx from "clsx";
import { Checkbox as AriaCheckbox, type CheckboxProps as AriaCheckboxProps } from "react-aria-components";
import { CheckboxBox } from "./Checkbox";
import "./CheckboxWithLabel.css";

export type CheckboxPosition = "Back" | "Front";

export type CheckboxWithLabelProps = Omit<AriaCheckboxProps, "children"> & {
  label?: React.ReactNode;
  checkboxPosition?: CheckboxPosition;
  description1?: React.ReactNode;
  description2?: React.ReactNode;
  icon?: boolean;
};

// Exact vector path exported from Figma "arrow-long-rightup" icon node (I8126:95525;9865:144086).
function ArrowIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="agx-checkbox-with-label__icon-svg">
      <path d="M3 13L13 3M13 10.5V3H5.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CheckboxWithLabel({
  label = "Setting",
  checkboxPosition = "Front",
  description1,
  description2,
  icon = false,
  className,
  ...props
}: CheckboxWithLabelProps) {
  return (
    <AriaCheckbox
      {...props}
      className={clsx(
        "agx-checkbox-with-label",
        `agx-checkbox-with-label--${checkboxPosition.toLowerCase()}`,
        className,
      )}
    >
      {({ isSelected, isIndeterminate, isDisabled }) => (
        <>
          <span className="agx-checkbox-with-label__row">
            <CheckboxBox isSelected={isSelected} isIndeterminate={isIndeterminate} isDisabled={isDisabled} />
            <span className="agx-checkbox-with-label__text">{label}</span>
            {description1 ? <span className="agx-checkbox-with-label__desc1">{description1}</span> : null}
            {icon ? (
              <span className="agx-checkbox-with-label__icon" aria-hidden="true">
                <ArrowIcon />
              </span>
            ) : null}
          </span>
          {description2 ? <span className="agx-checkbox-with-label__desc2">{description2}</span> : null}
        </>
      )}
    </AriaCheckbox>
  );
}
