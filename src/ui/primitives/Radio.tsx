import clsx from "clsx";
import { Radio as AriaRadio, type RadioProps as AriaRadioProps } from "react-aria-components";
import "./Radio.css";

export type RadioProps = Omit<AriaRadioProps, "children"> & {
  children?: React.ReactNode;
};

type RadioBoxProps = {
  isSelected?: boolean;
  isDisabled?: boolean;
  isInvalid?: boolean;
};

// The 16px ring/dot indicator. Shared by Radio, RadioWithLabel and RadioCard
// so the indicator stays identical everywhere.
export function RadioBox({ isSelected = false, isDisabled = false, isInvalid = false }: RadioBoxProps) {
  return (
    <span
      className="agx-radio-box"
      aria-hidden="true"
      data-selected={isSelected || undefined}
      data-disabled={isDisabled || undefined}
      data-invalid={isInvalid || undefined}
    >
      {isSelected ? <span className="agx-radio-box__dot" /> : null}
    </span>
  );
}

export function Radio({ children, className, ...props }: RadioProps) {
  return (
    <AriaRadio {...props} className={clsx("agx-radio", className)}>
      {({ isSelected, isDisabled, isInvalid }) => (
        <>
          <RadioBox isSelected={isSelected} isDisabled={isDisabled} isInvalid={isInvalid} />
          {children != null && <span className="agx-radio__label">{children}</span>}
        </>
      )}
    </AriaRadio>
  );
}
