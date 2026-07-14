import type { Meta, StoryObj } from "@storybook/react";
import { ButtonIcon } from "primitives";

const meta = {
  title: "Primitives/Button icon",
  component: ButtonIcon,
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
  },
  args: {
    bg: true,
    size: "36",
    error: false,
    isDisabled: false,
  },
} satisfies Meta<typeof ButtonIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Icon: Story = {
  name: "Button icon",
  args: {
    error: false,
  },
  argTypes: {
    error: {
      table: { disable: true },
    },
  },
};

export const IconError: Story = {
  name: "Button icon error",
  args: {
    error: true,
  },
  argTypes: {
    error: {
      table: { disable: true },
    },
  },
};
