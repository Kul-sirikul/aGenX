import clsx from "clsx";
import "./DropdownList.css";

export type DropdownListProps = {
  /** Toggles the heading label above the items. Kept as `headling` to match the Figma property name (a typo for "heading" in the source file). */
  headling?: boolean;
  headingText?: string;
  search?: boolean;
  children?: React.ReactNode;
  className?: string;
};

export function DropdownList({
  headling = true,
  headingText = "headline",
  search = false,
  children,
  className,
}: DropdownListProps) {
  return (
    <div className={clsx("agx-dropdown-list", className)}>
      {search && (
        <div className="agx-dropdown-list__search">
          <input type="text" placeholder="Search" className="agx-dropdown-list__search-input" />
        </div>
      )}
      {headling && <p className="agx-dropdown-list__heading">{headingText}</p>}
      <div className="agx-dropdown-list__items">{children}</div>
    </div>
  );
}
