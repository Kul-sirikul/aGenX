import figma from "@figma/code-connect";
import { ListBox } from "react-aria-components";
import { DropdownList, DropdownItem } from "primitives";

const SAMPLE_ITEMS = [
  { id: "item-1", label: "text" },
  { id: "item-2", label: "text" },
  { id: "item-3", label: "text" },
  { id: "item-4", label: "text" },
  { id: "item-5", label: "text" },
];

figma.connect(DropdownList, "https://www.figma.com/design/Pxm4oPgp8MxkUkh5NioGtJ/-aGenX--Design-System?node-id=245-7028", {
  props: {
    // Figma's `headling` prop name is kept as-is — it's a typo for "heading"
    // in the source file, but renaming it would break the exact-name match.
    headling: figma.boolean("headling"),
    search: figma.boolean("search"),
  },
  example: ({ headling, search }) => (
    <DropdownList headling={headling} search={search}>
      <ListBox aria-label="Dropdown list" selectionMode="single" items={SAMPLE_ITEMS}>
        {(item) => <DropdownItem id={item.id}>{item.label}</DropdownItem>}
      </ListBox>
    </DropdownList>
  ),
});
