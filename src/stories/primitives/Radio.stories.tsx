import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Radio, RadioCard, RadioWithLabel, type RadioCardSize } from "primitives";

const meta = {
  title: "Data entry/Radio",
  component: Radio,
} satisfies Meta<typeof Radio>;

export default meta;

/* ------------------------------- Radio with Label -------------------------------- */

type WithLabelArgs = {
  label: string;
  description: string;
  icon: boolean;
  isDisabled: boolean;
};

function RadioWithLabelDemo({ label, description, icon, isDisabled }: WithLabelArgs) {
  const [selected, setSelected] = useState(false);
  return (
    <div style={{ width: 418 }}>
      <RadioWithLabel
        label={label}
        radioPosition="Front"
        description2={description || undefined}
        icon={icon}
        isSelected={selected}
        isDisabled={isDisabled}
        onChange={setSelected}
      />
    </div>
  );
}

export const WithLabel: StoryObj<{ args: WithLabelArgs }> = {
  name: "Radio with Label",
  args: {
    label: "Setting",
    description: "",
    icon: false,
    isDisabled: false,
  },
  argTypes: {
    label: { control: "text" },
    description: { name: "Description", control: "text" },
    icon: { name: "Show icon", control: "boolean" },
    isDisabled: { name: "Disabled", control: "boolean" },
  } as Record<string, unknown>,
  render: (args) => <RadioWithLabelDemo {...(args as WithLabelArgs)} />,
};

/* ----------------------------------- Radio card ----------------------------------- */

type CardArgs = {
  children: string;
  description: string;
  size: RadioCardSize;
  badge: boolean;
  badgeLabel: string;
  isDisabled: boolean;
};

function RadioCardDemo({ children, description, size, badge, badgeLabel, isDisabled }: CardArgs) {
  const [selected, setSelected] = useState(false);
  return (
    <div style={{ width: 438 }}>
      <RadioCard
        size={size}
        description={description || undefined}
        badge={badge}
        badgeLabel={badgeLabel}
        isSelected={selected}
        isDisabled={isDisabled}
        onChange={setSelected}
      >
        {children}
      </RadioCard>
    </div>
  );
}

export const Card: StoryObj<{ args: CardArgs }> = {
  name: "Radio card",
  args: {
    children: "Setting",
    description: "",
    size: "M",
    badge: false,
    badgeLabel: "Label",
    isDisabled: false,
  },
  argTypes: {
    children: { control: "text" },
    description: { name: "Description", control: "text" },
    size: { control: "inline-radio", options: ["S", "M"] satisfies RadioCardSize[] },
    badge: { name: "Show badge", control: "boolean" },
    badgeLabel: { name: "Label", control: "text" },
    isDisabled: { name: "Disabled", control: "boolean" },
  } as Record<string, unknown>,
  render: (args) => <RadioCardDemo {...(args as CardArgs)} />,
};
