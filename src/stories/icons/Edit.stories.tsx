import type { Meta, StoryObj } from "@storybook/react";
import { EDIT_ICONS } from "icons";
import { IconGallery } from "./IconGallery";

const meta = {
  title: "Icon/Edit",
} satisfies Meta;

export default meta;

export const Default: StoryObj = {
  name: "All edit",
  render: () => <IconGallery items={EDIT_ICONS} />,
};
