import type { Meta, StoryObj } from "@storybook/react";
import { WARNING_ICONS } from "icons";
import { IconGallery } from "./IconGallery";

const meta = {
  title: "Foundation/Icon",
} satisfies Meta;

export default meta;

export const Warning: StoryObj = {
  name: "Warning",
  render: () => <IconGallery items={WARNING_ICONS} />,
};
