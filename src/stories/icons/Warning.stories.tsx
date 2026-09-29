import type { Meta, StoryObj } from "@storybook/react";
import { WARNING_ICONS } from "icons";
import { IconGallery } from "./IconGallery";

const meta = {
  title: "Icon/Warning",
} satisfies Meta;

export default meta;

export const Default: StoryObj = {
  name: "All warning",
  render: () => <IconGallery items={WARNING_ICONS} />,
};
