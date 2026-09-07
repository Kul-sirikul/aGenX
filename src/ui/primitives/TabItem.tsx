import clsx from "clsx";
import { Tab, type TabProps } from "react-aria-components";
import "./TabItem.css";

export type TabItemVariant = "Ghost" | "Container";

export type TabItemProps = Omit<TabProps, "children"> & {
  variant?: TabItemVariant;
  count?: boolean;
  noti?: boolean;
  children?: React.ReactNode;
};

export function TabItem({
  variant = "Container",
  count = false,
  noti = false,
  children = "Title",
  className,
  ...props
}: TabItemProps) {
  return (
    <Tab
      {...props}
      className={clsx("agx-tab-item", `agx-tab-item--${variant.toLowerCase()}`, className)}
    >
      {noti && <span className="agx-tab-item__noti" />}
      <span className="agx-tab-item__label">{children}</span>
      {count && <span className="agx-tab-item__badge">5</span>}
    </Tab>
  );
}
