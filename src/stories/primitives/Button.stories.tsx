import type { Meta, StoryObj } from "@storybook/react";
import { Button, type ButtonVariant } from "primitives";

const allVariants: ButtonVariant[] = [
  "Primary",
  "Secondary",
  "Ghost",
  "Red",
  "Primary dropdown",
  "Secondary dropdown",
];

const primaryOrSecondary: ButtonVariant[] = ["Primary", "Secondary"];

const dropdownVariants: ButtonVariant[] = ["Primary dropdown", "Secondary dropdown"];
const dropdownVariantLabels: Record<string, string> = {
  "Primary dropdown": "Primary with arrow button",
  "Secondary dropdown": "Secondary with arrow button",
};

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
  title: "Primitives/Button",
  component: Button,
  argTypes: {
    variant: {
      control: "select",
      options: allVariants,
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

export const Playground: Story = {
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

export const Primary: Story = {
  args: {
    variant: "Primary",
  },
  argTypes: {
    variant: {
      control: "select",
      options: primaryOrSecondary,
    },
  },
};

export const Ghost: Story = {
  args: {
    variant: "Ghost",
  },
  argTypes: {
    variant: {
      table: { disable: true },
    },
  },
};

export const PrimaryWithArrow: Story = {
  name: "Primary with arrow",
  args: {
    variant: "Primary dropdown",
    leftIcon: true,
    rightIcon: true,
  },
  argTypes: {
    variant: {
      control: {
        type: "select",
        labels: dropdownVariantLabels,
      },
      options: dropdownVariants,
    },
  },
};

export const Red: Story = {
  args: {
    variant: "Red",
  },
  argTypes: {
    variant: {
      table: { disable: true },
    },
  },
};
