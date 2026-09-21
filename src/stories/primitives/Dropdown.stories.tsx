import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ListBox, type Key } from "react-aria-components";
import { Dropdown, DropdownItem, DropdownList, type DropdownVariant, type DropdownSize, type DropdownItemType } from "primitives";

const meta = {
  title: "Data entry/Dropdown",
  component: DropdownItem,
  argTypes: {
    type: {
      control: "select",
      options: ["Main"] satisfies DropdownItemType[],
    },
  },
  args: {
    type: "Main",
    checkbox: false,
    leftIcon: true,
    rightIcon: false,
    children: "text",
  },
} satisfies Meta<typeof DropdownItem>;

export default meta;

const ITEMS = [
  { id: "item-1", label: "Item 1" },
  { id: "item-2", label: "Item 2" },
  { id: "item-3", label: "Item 3" },
  { id: "item-4", label: "Item 4" },
  { id: "item-5", label: "Item 5" },
];

const PLAYGROUND_ITEMS = ITEMS.slice(0, 3);

type PlaygroundArgs = {
  placeholder: string;
  showLeftIcon: boolean;
  variant: DropdownVariant;
  size: DropdownSize;
  badge: boolean;
  x: boolean;
  isDisabled: boolean;
  isInvalid: boolean;
  errorMessage: string;
  headling: boolean;
  search: boolean;
};

function DropdownPlaygroundDemo(args: PlaygroundArgs) {
  const [selectedKey, setSelectedKey] = useState<Key | null>(null);

  return (
    <Dropdown
      variant={args.variant}
      size={args.size}
      leftIcon={args.showLeftIcon}
      badge={args.badge}
      x={args.x}
      isDisabled={args.isDisabled}
      isInvalid={args.isInvalid}
      errorMessage={args.errorMessage}
      placeholder={args.placeholder}
      headling={args.headling}
      search={args.search}
      items={PLAYGROUND_ITEMS}
      selectedKey={selectedKey}
      onSelectionChange={setSelectedKey}
    >
      {(item) => <DropdownItem id={item.id}>{item.label}</DropdownItem>}
    </Dropdown>
  );
}

export const Default: StoryObj<{ args: PlaygroundArgs }> = {
  name: "Dropdown",
  args: {
    placeholder: "Placeholder Text",
    showLeftIcon: false,
    variant: "Default",
    size: "M",
    badge: false,
    x: true,
    isDisabled: false,
    isInvalid: false,
    errorMessage: "Help text",
    headling: false,
    search: false,
  },
  argTypes: {
    placeholder: {
      control: "text",
    },
    showLeftIcon: {
      name: "Show left icon",
      control: "boolean",
    },
    variant: {
      control: "select",
      options: ["Default", "Ghost"] satisfies DropdownVariant[],
    },
    size: {
      control: "inline-radio",
      options: ["S", "M"] satisfies DropdownSize[],
    },
    badge: {
      control: "boolean",
    },
    x: {
      name: "Clearable",
      control: "boolean",
    },
    isDisabled: {
      name: "Disabled",
      control: "boolean",
    },
    isInvalid: {
      name: "Error",
      control: "boolean",
    },
    errorMessage: {
      name: "Help text",
      control: "text",
    },
    headling: {
      name: "Show list heading",
      control: "boolean",
    },
    search: {
      name: "Show search",
      control: "boolean",
    },
    // Hide DropdownItem's controls, inherited from `meta` — this story renders
    // its own DropdownPlaygroundDemo and ignores them. `leftIcon` is
    // superseded by `showLeftIcon` above (a distinct args key, so it isn't
    // pinned to `leftIcon`'s inherited position at the top of Controls).
    type: { table: { disable: true } },
    checkbox: { table: { disable: true } },
    leftIcon: { table: { disable: true } },
    rightIcon: { table: { disable: true } },
    children: { table: { disable: true } },
  } as Record<string, unknown>,
  render: (args) => <DropdownPlaygroundDemo {...(args as PlaygroundArgs)} />,
};

type ListStoryArgs = {
  headling: boolean;
  headingText: string;
  search: boolean;
};

export const List: StoryObj<{ args: ListStoryArgs }> = {
  args: {
    headling: true,
    headingText: "headline",
    search: false,
  },
  argTypes: {
    headling: {
      name: "Show heading",
      control: "boolean",
    },
    headingText: {
      name: "Heading text",
      control: "text",
    },
    search: {
      name: "Show search",
      control: "boolean",
    },
    // Hide DropdownItem's controls, inherited from `meta` — this story renders
    // its own DropdownList with a fixed set of items.
    type: { table: { disable: true } },
    checkbox: { table: { disable: true } },
    leftIcon: { table: { disable: true } },
    rightIcon: { table: { disable: true } },
    children: { table: { disable: true } },
  } as Record<string, unknown>,
  render: (args) => {
    const { headling, headingText, search } = args as ListStoryArgs;
    return (
      <DropdownList headling={headling} headingText={headingText} search={search}>
        <ListBox aria-label="Dropdown list preview" selectionMode="single" items={ITEMS}>
          {(item) => <DropdownItem id={item.id}>{item.label}</DropdownItem>}
        </ListBox>
      </DropdownList>
    );
  },
};

type ItemStoryArgs = {
  type: DropdownItemType;
  checkbox: boolean;
  leftIcon: boolean;
  rightIcon: boolean;
  isSelected: boolean;
  isDisabled: boolean;
  children: string;
};

export const Item: StoryObj<{ args: ItemStoryArgs }> = {
  args: {
    isSelected: false,
    isDisabled: false,
  },
  argTypes: {
    isSelected: {
      name: "Selected",
      control: "boolean",
    },
    isDisabled: {
      name: "Disabled",
      control: "boolean",
    },
    checkbox: { table: { disable: true } },
  } as Record<string, unknown>,
  render: (args) => {
    const { isSelected, isDisabled, ...itemArgs } = args as ItemStoryArgs;
    return (
      <ListBox
        aria-label="Dropdown item preview"
        selectionMode="single"
        disabledKeys={isDisabled ? ["preview"] : []}
        selectedKeys={isSelected ? ["preview"] : []}
        style={{ width: 180 }}
      >
        <DropdownItem id="preview" {...itemArgs} />
      </ListBox>
    );
  },
};
