import type { Meta, StoryObj } from "@storybook/react";
import { MEDIA_ICONS } from "icons";
import { IconGallery } from "./IconGallery";

const meta = {
  title: "Foundation/Icon",
} satisfies Meta;

export default meta;

export const Media: StoryObj = {
  name: "Media",
  render: () => <IconGallery items={MEDIA_ICONS} />,
};
