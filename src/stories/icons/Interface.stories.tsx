import type { Meta, StoryObj } from "@storybook/react";
import { INTERFACE_ICONS } from "icons";
import { IconGallery } from "./IconGallery";

const meta = {
  title: "Foundation/Icon",
} satisfies Meta;

export default meta;

export const Interface: StoryObj = {
  name: "Interface",
  render: () => <IconGallery items={INTERFACE_ICONS} />,
};
