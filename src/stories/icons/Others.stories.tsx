import type { Meta, StoryObj } from "@storybook/react";
import { OTHERS_ICONS } from "icons";
import { IconGallery } from "./IconGallery";

const meta = {
  title: "Icon/Others",
} satisfies Meta;

export default meta;

export const Default: StoryObj = {
  name: "All other",
  render: () => <IconGallery items={OTHERS_ICONS} />,
};
