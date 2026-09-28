import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Checkbox, CheckboxCard, CheckboxWithLabel, type CheckboxCardSize } from "primitives";

const meta = {
  title: "Data entry/Checkbox",
  component: Checkbox,
} satisfies Meta<typeof Checkbox>;

export default meta;

/* -------------------------------- Checkboxs -------------------------------- */

type CheckboxStoryVariant = "With Label" | "Card";

function CheckboxWithLabelDemo({
  label,
  description,
  icon,
  isIndeterminate,
  isDisabled,
}: {
  label: string;
  description: string;
  icon: boolean;
  isIndeterminate: boolean;
  isDisabled: boolean;
}) {
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

function CheckboxCardDemo({
  children,
  description,
  size,
  badge,
  badgeLabel,
  isIndeterminate,
  isDisabled,
}: {
  children: string;
  description: string;
  size: CheckboxCardSize;
  badge: boolean;
  badgeLabel: string;
  isIndeterminate: boolean;
  isDisabled: boolean;
}) {
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

type CheckboxArgs = {
  variant: CheckboxStoryVariant;
  label: string;
  description: string;
  icon: boolean;
  size: CheckboxCardSize;
  badge: boolean;
  badgeLabel: string;
  isIndeterminate: boolean;
  isDisabled: boolean;
};

export const Default: StoryObj<{ args: CheckboxArgs }> = {
  name: "Checkboxs",
  parameters: { layout: "centered" },
  args: {
    variant: "With Label",
    label: "Setting",
    description: "",
    icon: false,
    size: "M",
    badge: false,
    badgeLabel: "Label",
    isIndeterminate: false,
    isDisabled: false,
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["With Label", "Card"] satisfies CheckboxStoryVariant[],
    },
    label: { control: "text" },
    description: { name: "Description", control: "text" },
    icon: { name: "Show icon", control: "boolean", if: { arg: "variant", eq: "With Label" } },
    size: { control: "inline-radio", options: ["S", "M"] satisfies CheckboxCardSize[], if: { arg: "variant", eq: "Card" } },
    badge: { name: "Show badge", control: "boolean", if: { arg: "variant", eq: "Card" } },
    badgeLabel: { name: "Label", control: "text", if: { arg: "variant", eq: "Card" } },
    isIndeterminate: { name: "Indeterminate", control: "boolean" },
    isDisabled: { name: "Disabled", control: "boolean" },
  } as Record<string, unknown>,
  render: (args) => {
    const a = args as CheckboxArgs;
    if (a.variant === "Card") {
      return (
        <CheckboxCardDemo
          description={a.description}
          size={a.size}
          badge={a.badge}
          badgeLabel={a.badgeLabel}
          isIndeterminate={a.isIndeterminate}
          isDisabled={a.isDisabled}
        >
          {a.label}
        </CheckboxCardDemo>
      );
    }
    return (
      <CheckboxWithLabelDemo
        label={a.label}
        description={a.description}
        icon={a.icon}
        isIndeterminate={a.isIndeterminate}
        isDisabled={a.isDisabled}
      />
    );
  },
};
