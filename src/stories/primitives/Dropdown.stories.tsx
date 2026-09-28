import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ListBox, type Key } from "react-aria-components";
import { Dropdown, DropdownItem, DropdownList, Tooltip, type DropdownVariant, type DropdownSize } from "primitives";

const meta = {
  title: "Data entry/Dropdown",
} satisfies Meta;

export default meta;

const ITEMS = [
  { id: "item-1", label: "Item 1" },
  { id: "item-2", label: "Item 2" },
  { id: "item-3", label: "Item 3" },
  { id: "item-4", label: "Item 4" },
  { id: "item-5", label: "Item 5" },
];

const PLAYGROUND_ITEMS = ITEMS.slice(0, 3);

// Exact vector path exported from the Figma "info" icon node — the same
// info affordance reused next to labels elsewhere (Date picker, Tooltip).
function InfoIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M7.5 7.5L7.52733 7.48667C7.61282 7.44396 7.70875 7.42664 7.80378 7.43677C7.8988 7.4469 7.98893 7.48404 8.0635 7.54381C8.13806 7.60357 8.19394 7.68345 8.22451 7.77399C8.25508 7.86453 8.25907 7.96193 8.236 8.05467L7.764 9.94533C7.74076 10.0381 7.74463 10.1356 7.77513 10.2263C7.80563 10.3169 7.86149 10.3969 7.93609 10.4568C8.01069 10.5166 8.10089 10.5538 8.196 10.564C8.2911 10.5741 8.38712 10.5568 8.47267 10.514L8.5 10.5M14 8C14 8.78793 13.8448 9.56815 13.5433 10.2961C13.2417 11.0241 12.7998 11.6855 12.2426 12.2426C11.6855 12.7998 11.0241 13.2417 10.2961 13.5433C9.56815 13.8448 8.78793 14 8 14C7.21207 14 6.43185 13.8448 5.7039 13.5433C4.97595 13.2417 4.31451 12.7998 3.75736 12.2426C3.20021 11.6855 2.75825 11.0241 2.45672 10.2961C2.15519 9.56815 2 8.78793 2 8C2 6.4087 2.63214 4.88258 3.75736 3.75736C4.88258 2.63214 6.4087 2 8 2C9.5913 2 11.1174 2.63214 12.2426 3.75736C13.3679 4.88258 14 6.4087 14 8ZM8 5.5H8.00533V5.50533H8V5.5Z"
        stroke="var(--icon-gray)"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Label row above the dropdown field, matching Figma node 12530:49931
// ("Input label"): the label text, an optional "Optional" hint, and an
// info icon with the same tooltip affordance used elsewhere.
const fieldStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "var(--spacing-4)",
  width: 241,
};

const labelRowStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "var(--spacing-2)",
};

const labelTextRowStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "baseline",
  gap: "var(--spacing-4)",
};

// The label scales with the dropdown's own size: 14pt for M, 12pt for S
// (matching the field's own text size at each size, rather than a fixed 14pt).
function getLabelStyle(size: DropdownSize): React.CSSProperties {
  return {
    margin: 0,
    fontFamily: "var(--font-family-noto-sans-thai), sans-serif",
    fontWeight: "var(--weight-regular)",
    fontSize: size === "S" ? "var(--size-12)" : "var(--size-14)",
    lineHeight: size === "S" ? "var(--line-height-16)" : "var(--line-height-20)",
    color: "var(--text-primary)",
    whiteSpace: "nowrap",
  };
}

const optionalStyle: React.CSSProperties = {
  margin: 0,
  fontFamily: "var(--font-family-noto-sans-thai), sans-serif",
  fontSize: "var(--size-12)",
  lineHeight: "var(--line-height-16)",
  color: "var(--text-tertiary)",
  whiteSpace: "nowrap",
};

const infoTriggerStyle: React.CSSProperties = {
  display: "inline-flex",
  padding: "var(--spacing-2)",
  borderRadius: "var(--radius-6-small)",
  cursor: "default",
};

type PlaygroundArgs = {
  showLabel: boolean;
  label: string;
  optional: boolean;
  showInfoIcon: boolean;
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
    <div style={fieldStyle}>
      {args.showLabel && (
        <div style={labelRowStyle}>
          <div style={labelTextRowStyle}>
            <p style={getLabelStyle(args.size)}>{args.label}</p>
            {args.optional && <p style={optionalStyle}>Optional</p>}
          </div>
          {args.showInfoIcon && (
            <Tooltip content="Test Playground">
              <span role="button" tabIndex={0} aria-label="More information" style={infoTriggerStyle}>
                <InfoIcon />
              </span>
            </Tooltip>
          )}
        </div>
      )}
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
    </div>
  );
}

export const Default: StoryObj<{ args: PlaygroundArgs }> = {
  name: "Dropdown",
  // Pushed up (not vertically centered) like the Date picker story — the
  // popover opens downward, so it needs room below to test without the
  // canvas scrolling or the popover getting clipped.
  decorators: [
    (Story) => (
      <div style={{ alignSelf: "flex-start", justifySelf: "center", marginTop: "48px" }}>
        <Story />
      </div>
    ),
  ],
  args: {
    showLabel: true,
    label: "Agent",
    optional: true,
    showInfoIcon: true,
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
    showLabel: {
      name: "Show label",
      control: "boolean",
    },
    label: {
      control: "text",
      if: { arg: "showLabel" },
    },
    optional: {
      name: "Show 'Optional'",
      control: "boolean",
      if: { arg: "showLabel" },
    },
    showInfoIcon: {
      name: "Show info icon",
      control: "boolean",
      if: { arg: "showLabel" },
    },
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
