import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Tabs, TabList } from "react-aria-components";
import { TabItem, TabContainer, type TabItemVariant, type TabContainerItem } from "primitives";

const meta = {
  title: "Navigation/Tab",
} satisfies Meta;

export default meta;

function TabItemDemo({
  children,
  variant,
  count,
  noti,
  isDisabled,
}: {
  children: string;
  variant: TabItemVariant;
  count: boolean;
  noti: boolean;
  isDisabled: boolean;
}) {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <Tabs selectedKey={isSelected ? "demo" : "unselected"}>
      <TabList aria-label="Tab demo">
        <TabItem
          id="demo"
          variant={variant}
          count={count}
          noti={noti}
          isDisabled={isDisabled}
          onPress={() => setIsSelected((selected) => !selected)}
        >
          {children}
        </TabItem>
      </TabList>
    </Tabs>
  );
}

export const Tab: StoryObj<typeof TabItemDemo> = {
  args: {
    children: "Title",
    variant: "Container",
    count: false,
    noti: false,
    isDisabled: false,
  },
  argTypes: {
    children: {
      control: "text",
    },
    variant: {
      control: "select",
      options: ["Container", "Ghost"] satisfies TabItemVariant[],
    },
    count: {
      control: "boolean",
    },
    noti: {
      control: "boolean",
    },
    isDisabled: {
      control: "boolean",
    },
  },
  render: (args) => <TabItemDemo {...args} />,
};

const CONTAINER_TABS: TabContainerItem[] = [
  { id: "overview", label: "Overview" },
  { id: "activity", label: "Activity", noti: true },
  { id: "settings", label: "Settings", count: true },
  { id: "archived", label: "Archived", isDisabled: true },
];

function TabContainerDemo({ variant }: { variant: TabItemVariant }) {
  const [selectedKey, setSelectedKey] = useState(CONTAINER_TABS[0].id);
  return (
    <TabContainer
      variant={variant}
      tabs={CONTAINER_TABS}
      selectedKey={selectedKey}
      onSelectionChange={setSelectedKey}
    />
  );
}

export const Container: StoryObj<typeof TabContainerDemo> = {
  name: "Tab container",
  args: {
    variant: "Container",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["Container", "Ghost"] satisfies TabItemVariant[],
    },
  },
  render: (args) => <TabContainerDemo {...args} />,
};
