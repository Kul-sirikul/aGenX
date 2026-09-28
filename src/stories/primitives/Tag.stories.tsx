import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Tag, TagGroup, InputTagLabel, AdditionalTag, type TagSize, type TagType } from "primitives";

const meta = {
  title: "Data display/Tag",
} satisfies Meta;

export default meta;

/* -------------------------------------- Tag ------------------------------------- */

type TagStoryVariant = "Tag" | "Input Tag" | "Tag Group" | "Additional tag";

// No "Removable" / "Selected" controls — hover (or select) the tag directly
// on the canvas to reveal remove/more, and click the tag body to toggle
// selected, matching how the other primitives' playgrounds work now.
function TagDemo({ label, size, type }: { label: string; size: TagSize; type: TagType }) {
  const [selected, setSelected] = useState(false);
  const [removed, setRemoved] = useState(false);
  if (removed) return null;
  return (
    <Tag
      size={size}
      type={type}
      isSelected={selected}
      onClick={() => setSelected((value) => !value)}
      onRemove={() => setRemoved(true)}
      onMoreActions={() => {}}
    >
      {label}
    </Tag>
  );
}

// Tags are removable by hovering them directly on the canvas (the × reveals
// on hover), no separate control for it.
function InputTagDemo({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <div style={{ width: 326 }}>
      <InputTagLabel label={label} maxTags={5} placeholder={placeholder} defaultValue={["Team 1", "Agents"]} />
    </div>
  );
}

// Hover (or keyboard-focus) the "+N" chip on the canvas to see the tooltip
// listing the rest of the tags.
function TagGroupDemo({ tags, max }: { tags: string; max: number }) {
  const list = tags
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
  return <TagGroup tags={list} max={max} />;
}

// No tag-list control — click "+" on the canvas to reveal the input, type a
// name and press Enter to add it, unlimited times.
function AdditionalTagDemo({ label }: { label: string }) {
  return (
    <div style={{ width: 460 }}>
      <AdditionalTag label={label} />
    </div>
  );
}

type TagArgs = {
  variant: TagStoryVariant;
  label: string;
  size: TagSize;
  type: TagType;
  inputLabel: string;
  placeholder: string;
  tags: string;
  max: number;
  additionalLabel: string;
};

export const Default: StoryObj<{ args: TagArgs }> = {
  name: "Tags",
  args: {
    variant: "Tag",
    label: "Tag",
    size: "M",
    type: "Capital",
    inputLabel: "Tags",
    placeholder: "Tag",
    tags: "Team 1, Agents, Knowledge Base, Almo",
    max: 2,
    additionalLabel: "Additional tags",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["Tag", "Input Tag", "Tag Group", "Additional tag"] satisfies TagStoryVariant[],
    },
    label: { control: "text", if: { arg: "variant", eq: "Tag" } },
    size: { control: "inline-radio", options: ["S", "M", "L"] satisfies TagSize[], if: { arg: "variant", eq: "Tag" } },
    type: { control: "inline-radio", options: ["Capital", "Default"] satisfies TagType[], if: { arg: "variant", eq: "Tag" } },
    inputLabel: { name: "Label", control: "text", if: { arg: "variant", eq: "Input Tag" } },
    placeholder: { control: "text", if: { arg: "variant", eq: "Input Tag" } },
    tags: { name: "Tags (comma-separated)", control: "text", if: { arg: "variant", eq: "Tag Group" } },
    max: { name: "Visible before overflow", control: "number", if: { arg: "variant", eq: "Tag Group" } },
    additionalLabel: { name: "Label", control: "text", if: { arg: "variant", eq: "Additional tag" } },
  } as Record<string, unknown>,
  render: (args) => {
    const a = args as TagArgs;
    switch (a.variant) {
      case "Input Tag":
        return <InputTagDemo label={a.inputLabel} placeholder={a.placeholder} />;
      case "Tag Group":
        return <TagGroupDemo tags={a.tags} max={a.max} />;
      case "Additional tag":
        return <AdditionalTagDemo label={a.additionalLabel} />;
      default:
        return <TagDemo label={a.label} size={a.size} type={a.type} />;
    }
  },
};
