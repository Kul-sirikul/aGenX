import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ToggleWithLabel, type ToggleWithLabelType } from "primitives";

const meta = {
  title: "Data entry/Toggle",
} satisfies Meta;

export default meta;

type WithLabelArgs = {
  label: string;
  type: ToggleWithLabelType;
  info: boolean;
  isDisabled: boolean;
};

function ToggleWithLabelDemo({ label, type, info, isDisabled }: WithLabelArgs) {
  const [selected, setSelected] = useState(true);
  return (
    <ToggleWithLabel
      label={label}
      type={type}
      info={info}
      isSelected={selected}
      isDisabled={isDisabled}
      onChange={setSelected}
    />
  );
}

export const WithLabel: StoryObj<{ args: WithLabelArgs }> = {
  name: "Toggle with Label",
  args: {
    label: "Title",
    type: "Default",
    info: true,
    isDisabled: false,
  },
  argTypes: {
    label: { control: "text" },
    type: { control: "inline-radio", options: ["Default", "BG"] satisfies ToggleWithLabelType[] },
    info: { name: "Show info", control: "boolean" },
    isDisabled: { name: "Disabled", control: "boolean" },
  } as Record<string, unknown>,
  render: (args) => <ToggleWithLabelDemo {...(args as WithLabelArgs)} />,
};
