import type { Meta, StoryObj } from "@storybook/react";
import { TIME_ICONS } from "icons";
import { IconGallery } from "./IconGallery";

const meta = {
  title: "Foundation/Icon",
} satisfies Meta;

export default meta;

export const Time: StoryObj = {
  name: "Time",
  render: () => <IconGallery items={TIME_ICONS} />,
};
