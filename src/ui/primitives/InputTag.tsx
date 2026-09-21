import clsx from "clsx";
import { useState, type KeyboardEvent } from "react";
import { Tag } from "./Tag";
import "./InputTag.css";

export type InputTagProps = {
  value?: string[];
  defaultValue?: string[];
  onChange?: (tags: string[]) => void;
  placeholder?: string;
  className?: string;
};

// A "Filled"/"Filled vertical" state in Figma is just this same layout with
// tags present — flex-wrap handles both single- and multi-line automatically,
// there's no separate code path. "Typing" is real `:focus-within`.
export function InputTag({ value, defaultValue = [], onChange, placeholder = "Tag", className }: InputTagProps) {
  const [uncontrolledTags, setUncontrolledTags] = useState(defaultValue);
  const tags = value ?? uncontrolledTags;
  const [draft, setDraft] = useState("");

  function commitDraft() {
    const text = draft.trim();
    if (!text) return;
    const next = [...tags, text];
    if (value === undefined) setUncontrolledTags(next);
    onChange?.(next);
    setDraft("");
  }

  function removeTag(index: number) {
    const next = tags.filter((_, i) => i !== index);
    if (value === undefined) setUncontrolledTags(next);
    onChange?.(next);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      commitDraft();
    } else if (event.key === "Backspace" && draft === "" && tags.length > 0) {
      removeTag(tags.length - 1);
    }
  }

  return (
    <div className={clsx("agx-input-tag", className)}>
      {tags.map((tag, index) => (
        <Tag key={`${tag}-${index}`} size="M" type="Capital" onRemove={() => removeTag(index)}>
          {tag}
        </Tag>
      ))}
      <input
        className="agx-input-tag__control"
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={commitDraft}
        placeholder={tags.length === 0 ? placeholder : undefined}
      />
    </div>
  );
}
