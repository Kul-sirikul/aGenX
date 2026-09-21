import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Checkbox, CheckboxCard, CheckboxWithLabel, type CheckboxCardSize } from "primitives";

const meta = {
  title: "Data entry/Checkbox",
  component: Checkbox,
} satisfies Meta<typeof Checkbox>;

export default meta;

/* ------------------------------ Checkbox with Label ----------------------------- */

type WithLabelArgs = {
  label: string;
  description: string;
  icon: boolean;
  isIndeterminate: boolean;
  isDisabled: boolean;
};

function CheckboxWithLabelDemo({ label, description, icon, isIndeterminate, isDisabled }: WithLabelArgs) {
  const [selected, setSelected] = useState(false);
  return (
    <div style={{ width: 418 }}>
      <CheckboxWithLabel
        label={label}
        checkboxPosition="Front"
        description2={description || undefined}
        icon={icon}
        isSelected={selected}
        isIndeterminate={isIndeterminate}
        isDisabled={isDisabled}
        onChange={setSelected}
      />
    </div>
  );
}

export const WithLabel: StoryObj<{ args: WithLabelArgs }> = {
  name: "Checkbox with Label",
  args: {
    label: "Setting",
    description: "",
    icon: false,
    isIndeterminate: false,
    isDisabled: false,
  },
  argTypes: {
    label: { control: "text" },
    description: { name: "Description", control: "text" },
    icon: { name: "Show icon", control: "boolean" },
    isIndeterminate: { name: "Indeterminate", control: "boolean" },
    isDisabled: { name: "Disabled", control: "boolean" },
  } as Record<string, unknown>,
  render: (args) => <CheckboxWithLabelDemo {...(args as WithLabelArgs)} />,
};

/* --------------------------------- Checkbox card -------------------------------- */

type CardArgs = {
  children: string;
  description: string;
  size: CheckboxCardSize;
  badge: boolean;
  badgeLabel: string;
  isIndeterminate: boolean;
  isDisabled: boolean;
};

function CheckboxCardDemo({ children, description, size, badge, badgeLabel, isIndeterminate, isDisabled }: CardArgs) {
  const [selected, setSelected] = useState(false);
  return (
    <div style={{ width: 438 }}>
      <CheckboxCard
        size={size}
        description={description || undefined}
        badge={badge}
        badgeLabel={badgeLabel}
        isSelected={selected}
        isIndeterminate={isIndeterminate}
        isDisabled={isDisabled}
        onChange={setSelected}
      >
        {children}
      </CheckboxCard>
    </div>
  );
}

export const Card: StoryObj<{ args: CardArgs }> = {
  name: "Checkbox card",
  args: {
    children: "Setting",
    description: "",
    size: "M",
    badge: false,
    badgeLabel: "Label",
    isIndeterminate: false,
    isDisabled: false,
  },
  argTypes: {
    children: { control: "text" },
    description: { name: "Description", control: "text" },
    size: { control: "inline-radio", options: ["S", "M"] satisfies CheckboxCardSize[] },
    badge: { name: "Show badge", control: "boolean" },
    badgeLabel: { name: "Label", control: "text" },
    isIndeterminate: { name: "Indeterminate", control: "boolean" },
    isDisabled: { name: "Disabled", control: "boolean" },
  } as Record<string, unknown>,
  render: (args) => <CheckboxCardDemo {...(args as CardArgs)} />,
};
