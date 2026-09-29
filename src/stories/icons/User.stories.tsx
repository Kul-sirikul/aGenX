import type { Meta, StoryObj } from "@storybook/react";
import { USER_ICONS } from "icons";
import { IconGallery } from "./IconGallery";

const meta = {
  title: "Icon/User",
} satisfies Meta;

export default meta;

export const Default: StoryObj = {
  name: "All user",
  render: () => <IconGallery items={USER_ICONS} />,
};
