import type { Meta, StoryObj } from "@storybook/react";
import { MENU_ICONS, buildMenuSvgMarkup } from "icons";
import { IconGallery } from "./IconGallery";

const meta = {
  title: "Foundation/Icon",
} satisfies Meta;

export default meta;

const items = MENU_ICONS.map((icon) => ({
  name: icon.name,
  Icon: icon.Icon,
  svg: buildMenuSvgMarkup(icon.path, icon.fill),
}));

export const Menu: StoryObj = {
  name: "Menu",
  render: () => <IconGallery items={items} />,
};
