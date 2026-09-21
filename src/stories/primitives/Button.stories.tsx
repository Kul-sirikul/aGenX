import type { Meta, StoryObj } from "@storybook/react";
import { Button, ButtonIcon, type ButtonVariant } from "primitives";

const playgroundVariants: ButtonVariant[] = [
  "Primary",
  "Secondary",
  "Red",
  "Ghost",
  "Primary dropdown",
  "Secondary dropdown",
];
const playgroundVariantLabels: Record<string, string> = {
  Primary: "Primary button",
  Secondary: "Secondary button",
  Red: "Red button",
  Ghost: "Ghost button",
  "Primary dropdown": "Primary with arrow button",
  "Secondary dropdown": "Secondary with arrow button",
};

const meta = {
  title: "Foundation/Button",
  component: Button,
  argTypes: {
    variant: {
      control: "select",
      options: playgroundVariants,
    },
    size: {
      control: "radio",
      options: ["S", "M"],
    },
    isDisabled: {
      name: "Disabled",
      control: "boolean",
    },
  },
  args: {
    children: "Button",
    size: "M",
    leftIcon: true,
    rightIcon: true,
    isDisabled: false,
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Button",
  args: {
    variant: "Primary",
  },
  argTypes: {
    variant: {
      control: {
        type: "select",
        labels: playgroundVariantLabels,
      },
      options: playgroundVariants,
    },
  },
};

type ButtonIconArgs = {
  bg: boolean;
  size: "20" | "24" | "28" | "36";
  error: boolean;
  isDisabled: boolean;
};

export const Icon: StoryObj<{ args: ButtonIconArgs }> = {
  name: "Button icon",
  args: {
    bg: true,
    size: "36",
    error: false,
    isDisabled: false,
  },
  argTypes: {
    bg: {
      name: "Variant",
      control: {
        type: "select",
        labels: {
          true: "Button icon have BG",
          false: "Button icon no BG",
        },
      },
      options: [true, false],
    },
    size: {
      control: "inline-radio",
      options: ["20", "24", "28", "36"],
    },
    error: {
      name: "Error",
      control: "boolean",
    },
    isDisabled: {
      name: "Disabled",
      control: "boolean",
    },
    // Hide Button's controls, inherited from `meta` — this story renders
    // ButtonIcon, a different component, and ignores them.
    variant: { table: { disable: true } },
    children: { table: { disable: true } },
    leftIcon: { table: { disable: true } },
    rightIcon: { table: { disable: true } },
  } as Record<string, unknown>,
  render: (args) => {
    const { bg, size, error, isDisabled } = args as ButtonIconArgs;
    return <ButtonIcon bg={bg} size={size} error={error} isDisabled={isDisabled} />;
  },
};
