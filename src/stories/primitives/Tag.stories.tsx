import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Tag, TagGroup, InputTagLabel, AdditionalTag, type TagSize, type TagType } from "primitives";

const meta = {
  title: "Data display/Tag",
} satisfies Meta;

export default meta;

/* -------------------------------------- Tag ------------------------------------- */

type TagArgs = {
  label: string;
  size: TagSize;
  type: TagType;
};

// No "Removable" / "Selected" controls — hover (or select) the tag directly
// on the canvas to reveal remove/more, and click the tag body to toggle
// selected, matching how the other primitives' playgrounds work now.
function TagDemo({ label, size, type }: TagArgs) {
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

export const Default: StoryObj<{ args: TagArgs }> = {
  name: "Tag",
  args: {
    label: "Tag",
    size: "M",
    type: "Capital",
  },
  argTypes: {
    label: { control: "text" },
    size: { control: "inline-radio", options: ["S", "M", "L"] satisfies TagSize[] },
    type: { control: "inline-radio", options: ["Capital", "Default"] satisfies TagType[] },
  } as Record<string, unknown>,
  render: (args) => <TagDemo {...(args as TagArgs)} />,
};

/* ----------------------------------- Input Tag ----------------------------------- */

type InputTagArgs = {
  label: string;
  placeholder: string;
};

// Tags are removable by hovering them directly on the canvas (the × reveals
// on hover), no separate control for it.
function InputTagDemo({ label, placeholder }: InputTagArgs) {
  return (
    <div style={{ width: 326 }}>
      <InputTagLabel label={label} maxTags={5} placeholder={placeholder} defaultValue={["Team 1", "Agents"]} />
    </div>
  );
}

export const WithInput: StoryObj<{ args: InputTagArgs }> = {
  name: "Input Tag",
  args: {
    label: "Tags",
    placeholder: "Tag",
  },
  argTypes: {
    label: { control: "text" },
    placeholder: { control: "text" },
  } as Record<string, unknown>,
  render: (args) => <InputTagDemo {...(args as InputTagArgs)} />,
};

/* ----------------------------------- Tag Group ----------------------------------- */

type TagGroupArgs = {
  tags: string;
  max: number;
};

// Hover (or keyboard-focus) the "+N" chip on the canvas to see the tooltip
// listing the rest of the tags.
function TagGroupDemo({ tags, max }: TagGroupArgs) {
  const list = tags
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
  return <TagGroup tags={list} max={max} />;
}

export const Group: StoryObj<{ args: TagGroupArgs }> = {
  name: "Tag Group",
  args: {
    tags: "Team 1, Agents, Knowledge Base, Almo",
    max: 2,
  },
  argTypes: {
    tags: { name: "Tags (comma-separated)", control: "text" },
    max: { name: "Visible before overflow", control: "number" },
  } as Record<string, unknown>,
  render: (args) => <TagGroupDemo {...(args as TagGroupArgs)} />,
};

/* --------------------------------- Additional tag --------------------------------- */

type AdditionalTagArgs = {
  label: string;
};

// No tag-list control — click "+" on the canvas to reveal the input, type a
// name and press Enter to add it, unlimited times.
function AdditionalTagDemo({ label }: AdditionalTagArgs) {
  return (
    <div style={{ width: 460 }}>
      <AdditionalTag label={label} />
    </div>
  );
}

export const Additional: StoryObj<{ args: AdditionalTagArgs }> = {
  name: "Additional tag",
  args: {
    label: "Additional tags",
  },
  argTypes: {
    label: { control: "text" },
  } as Record<string, unknown>,
  render: (args) => <AdditionalTagDemo {...(args as AdditionalTagArgs)} />,
};
