import type { Meta, StoryObj } from "@storybook/react";
import { Chip, type ChipColor, type ChipSize } from "primitives";

const meta = {
  title: "Primitives/Chip",
  component: Chip,
  argTypes: {
    color: {
      control: "select",
      options: ["Gray", "Purple"] satisfies ChipColor[],
    },
    size: {
      control: "inline-radio",
      options: ["S", "M"] satisfies ChipSize[],
    },
    icon: {
      name: "Show icon",
      control: "boolean",
    },
    alert: {
      name: "Alert",
      control: "boolean",
    },
    defaultSelected: {
      name: "Selected",
      control: "boolean",
    },
    isDisabled: {
      name: "Disabled",
      control: "boolean",
    },
  },
  args: {
    color: "Gray",
    size: "S",
    icon: true,
    alert: false,
    defaultSelected: false,
    isDisabled: false,
    children: "Chips",
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
