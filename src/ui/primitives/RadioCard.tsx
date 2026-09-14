import clsx from "clsx";
import { Radio as AriaRadio, RadioGroup } from "react-aria-components";
import { useRadioToggle } from "hooks";
import { RadioBox } from "./Radio";
import "./RadioCard.css";

export type RadioCardSize = "S" | "M";

export type RadioCardProps = {
  children?: React.ReactNode;
  description?: React.ReactNode;
  size?: RadioCardSize;
  badge?: boolean;
  badgeLabel?: React.ReactNode;
  isSelected?: boolean;
  isDisabled?: boolean;
  onChange?: (isSelected: boolean) => void;
  className?: string;
};

// A radio only makes sense inside a RadioGroup, so this wraps a single Radio
// in its own group and exposes a Checkbox-shaped isSelected/onChange API.
// Clicking selects it like a native radio; useRadioToggle adds
// click-to-deselect on top, so a lone demo radio can be switched off too.
export function RadioCard({
  children = "Setting",
  description,
  size = "M",
  badge = false,
  badgeLabel = "Label",
  isSelected = false,
  isDisabled,
  onChange,
  className,
}: RadioCardProps) {
  const toggleRef = useRadioToggle<HTMLDivElement>(isSelected, onChange);
  return (
    // Native click listener above RadioGroup — see useRadioToggle for why
    // click-to-deselect needs it instead of a plain onClick prop.
    <div ref={toggleRef} style={{ display: "contents" }}>
      <RadioGroup
        value={isSelected ? "on" : null}
        onChange={(value) => onChange?.(value === "on")}
        isDisabled={isDisabled}
        aria-label={typeof children === "string" ? children : "Radio card"}
      >
        <AriaRadio
          value="on"
          className={clsx("agx-radio-card", `agx-radio-card--${size.toLowerCase()}`, className)}
        >
          {({ isSelected: selected, isDisabled: disabled }) => (
            <>
              <span className="agx-radio-card__content">
                <RadioBox isSelected={selected} isDisabled={disabled} />
                <span className="agx-radio-card__text-col">
                  <span className="agx-radio-card__text">{children}</span>
                  {description ? <span className="agx-radio-card__description">{description}</span> : null}
                </span>
              </span>
              {badge ? <span className="agx-radio-card__badge">{badgeLabel}</span> : null}
            </>
          )}
        </AriaRadio>
      </RadioGroup>
    </div>
  );
}
