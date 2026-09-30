import type { Meta, StoryObj } from "@storybook/react";
import { EDIT_ICONS } from "icons";
import { IconGallery } from "./IconGallery";

const meta = {
  title: "Foundation/Icon",
} satisfies Meta;

export default meta;

export const Edit: StoryObj = {
  name: "Edit",
  render: () => <IconGallery items={EDIT_ICONS} />,
};
