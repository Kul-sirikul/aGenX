import type { Meta, StoryObj } from "@storybook/react";
import { FILE_ICONS } from "icons";
import { IconGallery } from "./IconGallery";

const meta = {
  title: "Icon/File",
} satisfies Meta;

export default meta;

export const Default: StoryObj = {
  name: "All file",
  render: () => <IconGallery items={FILE_ICONS} />,
};
