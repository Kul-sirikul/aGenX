import type { Meta, StoryObj } from "@storybook/react";
import { TIME_ICONS } from "icons";
import { IconGallery } from "./IconGallery";

const meta = {
  title: "Icon/Time",
} satisfies Meta;

export default meta;

export const Default: StoryObj = {
  name: "All time",
  render: () => <IconGallery items={TIME_ICONS} />,
};
