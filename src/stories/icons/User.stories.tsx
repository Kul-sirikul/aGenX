import type { Meta, StoryObj } from "@storybook/react";
import { USER_ICONS } from "icons";
import { IconGallery } from "./IconGallery";

const meta = {
  title: "Foundation/Icon",
} satisfies Meta;

export default meta;

export const User: StoryObj = {
  name: "User",
  render: () => <IconGallery items={USER_ICONS} />,
};
