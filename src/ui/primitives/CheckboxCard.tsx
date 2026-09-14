import clsx from "clsx";
import { Checkbox as AriaCheckbox, type CheckboxProps as AriaCheckboxProps } from "react-aria-components";
import { CheckboxBox } from "./Checkbox";
import "./CheckboxCard.css";

export type CheckboxCardSize = "S" | "M";

export type CheckboxCardProps = Omit<AriaCheckboxProps, "children"> & {
  children?: React.ReactNode;
  description?: React.ReactNode;
  size?: CheckboxCardSize;
  badge?: boolean;
  badgeLabel?: React.ReactNode;
};

export function CheckboxCard({
  children = "Setting",
  description,
  size = "M",
  badge = false,
  badgeLabel = "Label",
  className,
  ...props
}: CheckboxCardProps) {
  return (
    <AriaCheckbox
      {...props}
      className={clsx("agx-checkbox-card", `agx-checkbox-card--${size.toLowerCase()}`, className)}
    >
      {({ isSelected, isIndeterminate, isDisabled }) => (
        <>
          <span className="agx-checkbox-card__content">
            <CheckboxBox isSelected={isSelected} isIndeterminate={isIndeterminate} isDisabled={isDisabled} />
            <span className="agx-checkbox-card__text-col">
              <span className="agx-checkbox-card__text">{children}</span>
              {description ? <span className="agx-checkbox-card__description">{description}</span> : null}
            </span>
          </span>
          {badge ? <span className="agx-checkbox-card__badge">{badgeLabel}</span> : null}
        </>
      )}
    </AriaCheckbox>
  );
}
