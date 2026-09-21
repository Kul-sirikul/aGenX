import type { Meta, StoryObj } from "@storybook/react";
import { Input, InputLabel, InputWithBadge, type InputSize } from "primitives";

const meta = {
  title: "Data entry/Input",
  component: Input,
  argTypes: {
    // Control config only — row order is set by key order in `args` below,
    // not here.
    placeholder: {
      control: "text",
    },
    label: {
      control: "text",
    },
    showLabel: {
      name: "Show label",
      control: "boolean",
    },
    size: {
      control: "inline-radio",
      options: ["S", "M"] satisfies InputSize[],
    },
    leftIcon: {
      name: "Show left icon",
      control: "boolean",
    },
    rightIcon: {
      name: "Show right icon",
      control: "boolean",
    },
    arrow: {
      control: "boolean",
    },
    unit: {
      control: "boolean",
    },
    helpText: {
      name: "Show help row",
      control: "boolean",
    },
    text: {
      name: "Show help text",
      control: "boolean",
    },
    count: {
      name: "Show counter",
      control: "boolean",
    },
    button: {
      name: "Show button",
      control: "boolean",
    },
    isInvalid: {
      name: "Error",
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
  } as Record<string, unknown>,
  args: {
    // `placeholder`, `label`, and `showLabel` are declared first (as keys,
    // not just in argTypes) — Storybook's Controls panel orders rows by
    // where each key first appears across meta.args + story args, not by
    // argTypes declaration order.
    placeholder: "Placeholder Text",
    label: "Label",
    showLabel: true,
    size: "M",
    leftIcon: false,
    rightIcon: false,
    arrow: false,
    unit: false,
    helpText: true,
    text: true,
    count: false,
    button: true,
    isInvalid: false,
    disabled: false,
  } as Record<string, unknown>,
} satisfies Meta<typeof Input>;

export default meta;

type InputStoryArgs = {
  size: InputSize;
  leftIcon: boolean;
  rightIcon: boolean;
  arrow: boolean;
  unit: boolean;
  helpText: boolean;
  text: boolean;
  count: boolean;
  button: boolean;
  isInvalid: boolean;
  disabled: boolean;
  placeholder: string;
  label: string;
  showLabel: boolean;
};

export const Default: StoryObj<{ args: InputStoryArgs }> = {
  name: "Input",
  render: (args) => {
    const { showLabel, label, ...inputArgs } = args as InputStoryArgs;
    return showLabel ? <InputLabel label={label} {...inputArgs} /> : <Input {...inputArgs} />;
  },
};

type InputWithBadgeArgs = {
  label: string;
  counter: boolean;
  iconButton: boolean;
  isInvalid: boolean;
  disabled: boolean;
  placeholder: string;
};

export const WithBadge: StoryObj<{ args: InputWithBadgeArgs }> = {
  name: "Input with Badge",
  args: {
    counter: true,
    iconButton: true,
    isInvalid: false,
    disabled: false,
  },
  argTypes: {
    counter: {
      name: "Show counter",
      control: "boolean",
    },
    iconButton: {
      name: "Show icon button",
      control: "boolean",
    },
    isInvalid: {
      name: "Error",
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
    // Hide Input's controls, inherited from `meta` — this story renders
    // InputWithBadge, a different component, and ignores them.
    showLabel: { table: { disable: true } },
    size: { table: { disable: true } },
    leftIcon: { table: { disable: true } },
    rightIcon: { table: { disable: true } },
    arrow: { table: { disable: true } },
    unit: { table: { disable: true } },
    helpText: { table: { disable: true } },
    text: { table: { disable: true } },
    count: { table: { disable: true } },
    button: { table: { disable: true } },
  } as Record<string, unknown>,
  render: (args) => {
    // Pass only InputWithBadge's own props — `args` also carries Input's
    // args inherited from `meta`, which would otherwise leak onto the
    // underlying <textarea> as invalid DOM attributes.
    const { label, counter, iconButton, isInvalid, disabled, placeholder } = args as InputWithBadgeArgs;
    return (
      <InputWithBadge
        label={label}
        counter={counter}
        iconButton={iconButton}
        isInvalid={isInvalid}
        disabled={disabled}
        placeholder={placeholder}
      />
    );
  },
};
