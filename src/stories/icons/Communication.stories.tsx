import type { Meta, StoryObj } from "@storybook/react";
import { COMMUNICATION_ICONS } from "icons";
import { IconGallery } from "./IconGallery";

const meta = {
  title: "Foundation/Icon",
} satisfies Meta;

export default meta;

export const Communication: StoryObj = {
  name: "Communication",
  render: () => <IconGallery items={COMMUNICATION_ICONS} />,
};
