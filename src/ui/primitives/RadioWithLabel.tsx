import clsx from "clsx";
import { Radio as AriaRadio, RadioGroup } from "react-aria-components";
import { useRadioToggle } from "hooks";
import { RadioBox } from "./Radio";
import "./RadioWithLabel.css";

export type RadioPosition = "Back" | "Front";

export type RadioWithLabelProps = {
  label?: React.ReactNode;
  radioPosition?: RadioPosition;
  description1?: React.ReactNode;
  description2?: React.ReactNode;
  icon?: boolean;
  isSelected?: boolean;
  isDisabled?: boolean;
  isInvalid?: boolean;
  onChange?: (isSelected: boolean) => void;
  className?: string;
};

// Exact vector path exported from Figma "arrow-long-rightup" icon node (I8126:95525;9865:144086)
// — reused from CheckboxWithLabel's icon slot.
function ArrowIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="agx-radio-with-label__icon-svg">
      <path d="M3 13L13 3M13 10.5V3H5.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// A radio only makes sense inside a RadioGroup, so this wraps a single Radio
// in its own group and exposes a Checkbox-shaped isSelected/onChange API.
// Clicking selects it like a native radio; useRadioToggle adds
// click-to-deselect on top, so a lone demo radio can be switched off too.
export function RadioWithLabel({
  label = "Setting",
  radioPosition = "Front",
  description1,
  description2,
  icon = false,
  isSelected = false,
  isDisabled,
  isInvalid,
  onChange,
  className,
}: RadioWithLabelProps) {
  const toggleRef = useRadioToggle<HTMLDivElement>(isSelected, onChange);
  return (
    // Native click listener above RadioGroup — see useRadioToggle for why
    // click-to-deselect needs it instead of a plain onClick prop.
    <div ref={toggleRef} style={{ display: "contents" }}>
      <RadioGroup
        value={isSelected ? "on" : null}
        onChange={(value) => onChange?.(value === "on")}
        isDisabled={isDisabled}
        isInvalid={isInvalid}
        aria-label={typeof label === "string" ? label : "Radio"}
      >
        <AriaRadio
          value="on"
          className={clsx(
            "agx-radio-with-label",
            `agx-radio-with-label--${radioPosition.toLowerCase()}`,
            className,
          )}
        >
          {({ isSelected: selected, isDisabled: disabled, isInvalid: invalid }) => (
            <>
              <span className="agx-radio-with-label__row">
                <RadioBox isSelected={selected} isDisabled={disabled} isInvalid={invalid} />
                <span className="agx-radio-with-label__text">{label}</span>
                {description1 ? <span className="agx-radio-with-label__desc1">{description1}</span> : null}
                {icon ? (
                  <span className="agx-radio-with-label__icon" aria-hidden="true">
                    <ArrowIcon />
                  </span>
                ) : null}
              </span>
              {description2 ? <span className="agx-radio-with-label__desc2">{description2}</span> : null}
            </>
          )}
        </AriaRadio>
      </RadioGroup>
    </div>
  );
}
