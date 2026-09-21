import type { Meta, StoryObj } from "@storybook/react";
import { Chip, type ChipColor, type ChipSize } from "primitives";

const meta = {
  title: "Data entry/Chip",
  component: Chip,
  argTypes: {
    children: {
      control: "text",
    },
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
    isDisabled: {
      name: "Disabled",
      control: "boolean",
    },
    // Selected is clickable directly on the canvas — Chip's own
    // `defaultSelected` is uncontrolled, so no extra wiring is needed.
    defaultSelected: { table: { disable: true } },
    // No design-approved custom icon swap yet, so hide the auto-inferred
    // object control for it.
    iconSwap: { table: { disable: true } },
  },
  args: {
    children: "Chips",
    color: "Gray",
    size: "S",
    icon: true,
    alert: false,
    isDisabled: false,
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

// Named "Chips" rather than "Chip" — Storybook collapses a single-story
// group into one flat sidebar row whenever the lone story's name matches the
// folder title exactly. A distinct name keeps the "Chip" folder expandable,
// with no Docs entry needed.
export const Default: Story = {
  name: "Chips",
};
