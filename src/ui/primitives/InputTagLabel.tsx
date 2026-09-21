import clsx from "clsx";
import { useState } from "react";
import { InputTag, type InputTagProps } from "./InputTag";
import "./InputTagLabel.css";

export type InputTagLabelProps = Omit<InputTagProps, "value" | "defaultValue" | "onChange"> & {
  label?: string;
  maxTags?: number;
  value?: string[];
  defaultValue?: string[];
  onChange?: (tags: string[]) => void;
};

export function InputTagLabel({
  label = "Tags",
  maxTags,
  value,
  defaultValue = [],
  onChange,
  className,
  ...inputTagProps
}: InputTagLabelProps) {
  const [uncontrolledTags, setUncontrolledTags] = useState(defaultValue);
  const tags = value ?? uncontrolledTags;

  function handleChange(next: string[]) {
    if (value === undefined) setUncontrolledTags(next);
    onChange?.(next);
  }

  return (
    <div className={clsx("agx-input-tag-label", className)}>
      <div className="agx-input-tag-label__row">
        <span className="agx-input-tag-label__text">{label}</span>
        {maxTags != null && (
          <span className="agx-input-tag-label__count">
            {tags.length}/{maxTags}
          </span>
        )}
      </div>
      <InputTag {...inputTagProps} value={tags} onChange={handleChange} />
    </div>
  );
}
