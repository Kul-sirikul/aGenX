import type { Meta, StoryObj } from "@storybook/react";
import { COMMUNICATION_ICONS } from "icons";
import { IconGallery } from "./IconGallery";

const meta = {
  title: "Icon/Communication",
} satisfies Meta;

export default meta;

export const Default: StoryObj = {
  name: "All Communication",
  render: () => <IconGallery items={COMMUNICATION_ICONS} />,
};
