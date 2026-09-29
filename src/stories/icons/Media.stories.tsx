import type { Meta, StoryObj } from "@storybook/react";
import { MEDIA_ICONS } from "icons";
import { IconGallery } from "./IconGallery";

const meta = {
  title: "Icon/Media",
} satisfies Meta;

export default meta;

export const Default: StoryObj = {
  name: "All media",
  render: () => <IconGallery items={MEDIA_ICONS} />,
};
