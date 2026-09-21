import type { Meta, StoryObj } from "@storybook/react";
import { Badge, type BadgeColor, type BadgeSize } from "primitives";

const meta = {
  title: "Data display/Badge",
} satisfies Meta;

export default meta;

type BadgeArgs = {
  label: string;
  color: BadgeColor;
  size: BadgeSize;
  circle: boolean;
  icon: boolean;
  action: boolean;
  actionLabel: string;
};

// No "iconSwap" control — no design-approved custom icon set yet, so the
// default warning icon is the only one exposed here.
export const Default: StoryObj<{ args: BadgeArgs }> = {
  name: "Badges",
  args: {
    label: "Label",
    color: "Gray",
    size: "S",
    circle: true,
    icon: false,
    action: false,
    actionLabel: "Resend",
  },
  argTypes: {
    label: { control: "text" },
    color: {
      control: "select",
      options: [
        "Gray",
        "Light gray",
        "Purple",
        "Green",
        "Red",
        "Orange",
        "Blue",
        "White",
        "Black",
      ] satisfies BadgeColor[],
    },
    size: { control: "inline-radio", options: ["S", "M"] satisfies BadgeSize[] },
    circle: { name: "Show circle", control: "boolean" },
    icon: { name: "Show icon", control: "boolean" },
    action: { name: "Show action", control: "boolean" },
    actionLabel: { name: "Action text", control: "text" },
  } as Record<string, unknown>,
  render: (args) => {
    const { label, color, size, circle, icon, action, actionLabel } = args as BadgeArgs;
    return (
      <Badge color={color} size={size} circle={circle} icon={icon} action={action} actionLabel={actionLabel}>
        {label}
      </Badge>
    );
  },
};
