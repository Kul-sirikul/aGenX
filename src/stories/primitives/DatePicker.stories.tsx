import type { Meta, StoryObj } from "@storybook/react";
import { DatePicker, DateRangePicker } from "primitives";

type DatePickerVariant = "Single" | "Date and time" | "Range";

type DatePickersArgs = {
  variant: DatePickerVariant;
  showInfoIcon: boolean;
};

const meta = {
  title: "Data entry/Date picker",
  // Shifted up (not flush with the top) so the calendar popover — tallest
  // for the Range variant's two-month grid — has room to open below without
  // overlapping the Controls panel.
  decorators: [
    (Story) => (
      <div style={{ alignSelf: "flex-start", justifySelf: "center", marginTop: "48px" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta;

export default meta;

export const DatePickers: StoryObj<{ args: DatePickersArgs }> = {
  name: "Date pickers",
  args: {
    variant: "Single",
    showInfoIcon: true,
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["Single", "Date and time", "Range"] satisfies DatePickerVariant[],
    },
    showInfoIcon: { name: "Show Tooltip info", control: "boolean" },
  } as Record<string, unknown>,
  render: (args) => {
    const { variant, showInfoIcon } = args as DatePickersArgs;
    if (variant === "Range") {
      return <DateRangePicker label="Effective period" showInfoIcon={showInfoIcon} />;
    }
    if (variant === "Date and time") {
      return <DatePicker label="Effective date" showTime showInfoIcon={showInfoIcon} />;
    }
    return <DatePicker label="Label" showInfoIcon={showInfoIcon} />;
  },
};
