import type { Meta, StoryObj } from "@storybook/react";
import { INTERFACE_ICONS } from "icons";
import { IconGallery } from "./IconGallery";

const meta = {
  title: "Icon/Interface",
} satisfies Meta;

export default meta;

export const Default: StoryObj = {
  name: "All interface",
  render: () => <IconGallery items={INTERFACE_ICONS} />,
};
