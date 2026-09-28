import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Radio, RadioCard, RadioWithLabel, type RadioCardSize } from "primitives";

const meta = {
  title: "Data entry/Radio button",
  component: Radio,
} satisfies Meta<typeof Radio>;

export default meta;

/* ---------------------------------- Radio ---------------------------------- */

type RadioStoryVariant = "With Label" | "Card";

function RadioWithLabelDemo({ label, description, icon, isDisabled }: { label: string; description: string; icon: boolean; isDisabled: boolean }) {
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

function RadioCardDemo({
  children,
  description,
  size,
  badge,
  badgeLabel,
  isDisabled,
}: {
  children: string;
  description: string;
  size: RadioCardSize;
  badge: boolean;
  badgeLabel: string;
  isDisabled: boolean;
}) {
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

type RadioArgs = {
  variant: RadioStoryVariant;
  label: string;
  description: string;
  icon: boolean;
  size: RadioCardSize;
  badge: boolean;
  badgeLabel: string;
  isDisabled: boolean;
};

export const Default: StoryObj<{ args: RadioArgs }> = {
  name: "Radio",
  args: {
    variant: "With Label",
    label: "Setting",
    description: "",
    icon: false,
    size: "M",
    badge: false,
    badgeLabel: "Label",
    isDisabled: false,
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["With Label", "Card"] satisfies RadioStoryVariant[],
    },
    label: { control: "text" },
    description: { name: "Description", control: "text" },
    icon: { name: "Show icon", control: "boolean", if: { arg: "variant", eq: "With Label" } },
    size: { control: "inline-radio", options: ["S", "M"] satisfies RadioCardSize[], if: { arg: "variant", eq: "Card" } },
    badge: { name: "Show badge", control: "boolean", if: { arg: "variant", eq: "Card" } },
    badgeLabel: { name: "Label", control: "text", if: { arg: "variant", eq: "Card" } },
    isDisabled: { name: "Disabled", control: "boolean" },
  } as Record<string, unknown>,
  render: (args) => {
    const a = args as RadioArgs;
    if (a.variant === "Card") {
      return (
        <RadioCardDemo
          description={a.description}
          size={a.size}
          badge={a.badge}
          badgeLabel={a.badgeLabel}
          isDisabled={a.isDisabled}
        >
          {a.label}
        </RadioCardDemo>
      );
    }
    return <RadioWithLabelDemo label={a.label} description={a.description} icon={a.icon} isDisabled={a.isDisabled} />;
  },
};
