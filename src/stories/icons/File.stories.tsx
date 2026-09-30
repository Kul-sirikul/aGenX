import type { Meta, StoryObj } from "@storybook/react";
import { FILE_ICONS } from "icons";
import { IconGallery } from "./IconGallery";

const meta = {
  title: "Foundation/Icon",
} satisfies Meta;

export default meta;

export const File: StoryObj = {
  name: "File",
  render: () => <IconGallery items={FILE_ICONS} />,
};
