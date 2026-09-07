import clsx from "clsx";
import { Tabs, TabList, type Key } from "react-aria-components";
import { TabItem, type TabItemVariant } from "./TabItem";
import "./TabContainer.css";

export type TabContainerVariant = TabItemVariant;

export type TabContainerItem = {
  id: string;
  label: React.ReactNode;
  count?: boolean;
  noti?: boolean;
  isDisabled?: boolean;
};

export type TabContainerProps = {
  variant?: TabContainerVariant;
  tabs: TabContainerItem[];
  selectedKey?: string;
  defaultSelectedKey?: string;
  onSelectionChange?: (key: string) => void;
  className?: string;
};

export function TabContainer({
  variant = "Container",
  tabs,
  selectedKey,
  defaultSelectedKey,
  onSelectionChange,
  className,
}: TabContainerProps) {
  return (
    <Tabs
      selectedKey={selectedKey}
      defaultSelectedKey={defaultSelectedKey ?? tabs[0]?.id}
      onSelectionChange={(key: Key) => onSelectionChange?.(String(key))}
    >
      <TabList className={clsx("agx-tab-container", `agx-tab-container--${variant.toLowerCase()}`, className)}>
        {tabs.map((tab) => (
          <TabItem key={tab.id} id={tab.id} variant={variant} count={tab.count} noti={tab.noti} isDisabled={tab.isDisabled}>
            {tab.label}
          </TabItem>
        ))}
      </TabList>
    </Tabs>
  );
}
