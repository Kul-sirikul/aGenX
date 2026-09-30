import type { Meta, StoryObj } from "@storybook/react";
import { OTHERS_ICONS } from "icons";
import { IconGallery } from "./IconGallery";

const meta = {
  title: "Foundation/Icon",
} satisfies Meta;

export default meta;

export const Others: StoryObj = {
  name: "Others",
  render: () => <IconGallery items={OTHERS_ICONS} />,
};
