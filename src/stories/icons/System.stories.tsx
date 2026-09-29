import type { Meta, StoryObj } from "@storybook/react";
import { SYSTEM_ICONS } from "icons";
import { IconGallery } from "./IconGallery";

const meta = {
  title: "Icon/System",
} satisfies Meta;

export default meta;

export const Default: StoryObj = {
  name: "All system",
  render: () => <IconGallery items={SYSTEM_ICONS} />,
};
