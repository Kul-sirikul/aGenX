import clsx from "clsx";
import { Switch as AriaSwitch, type SwitchProps as AriaSwitchProps } from "react-aria-components";
import "./Toggle.css";

export type ToggleSize = "S" | "M";

export type ToggleProps = Omit<AriaSwitchProps, "children"> & {
  size?: ToggleSize;
  children?: React.ReactNode;
};

export function Toggle({ size = "M", children, className, ...props }: ToggleProps) {
  return (
    <AriaSwitch {...props} className={clsx("agx-toggle", `agx-toggle--${size.toLowerCase()}`, className)}>
      <span className="agx-toggle__track">
        <span className="agx-toggle__knob" />
      </span>
      {children != null && <span className="agx-toggle__label">{children}</span>}
    </AriaSwitch>
  );
}
