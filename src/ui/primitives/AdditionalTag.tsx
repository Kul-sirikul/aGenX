import clsx from "clsx";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { Tag } from "./Tag";
import "./AdditionalTag.css";

export type AdditionalTagProps = {
  label?: string;
  value?: string[];
  defaultValue?: string[];
  onChange?: (tags: string[]) => void;
  className?: string;
};

// Exact vector path exported from Figma "plus" icon node (I12967:72933;6416:68802).
function PlusIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="agx-additional-tag__add-icon">
      <path d="M8 2.66667V13.3333M13.3333 8H2.66667" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Figma's `state` (Empty/Added) collapses into real behavior — whether any
// tags exist. Clicking "+" reveals an inline text field; Enter commits it as
// a tag and keeps the field open for the next one, so any number can be
// added in one sitting.
export function AdditionalTag({
  label = "Additional tags",
  value,
  defaultValue = [],
  onChange,
  className,
}: AdditionalTagProps) {
  const [uncontrolledTags, setUncontrolledTags] = useState(defaultValue);
  const tags = value ?? uncontrolledTags;
  const [isAdding, setIsAdding] = useState(false);
  const [draft, setDraft] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isAdding) inputRef.current?.focus();
  }, [isAdding]);

  function commitDraft() {
    const text = draft.trim();
    if (text) {
      const next = [...tags, text];
      if (value === undefined) setUncontrolledTags(next);
      onChange?.(next);
    }
    setDraft("");
  }

  function removeTag(index: number) {
    const next = tags.filter((_, i) => i !== index);
    if (value === undefined) setUncontrolledTags(next);
    onChange?.(next);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      commitDraft();
    } else if (event.key === "Escape") {
      setDraft("");
      setIsAdding(false);
    }
  }

  const hasTags = tags.length > 0;

  return (
    <div className={clsx("agx-additional-tag", className)}>
      <div className="agx-additional-tag__header">
        <span className="agx-additional-tag__title">{hasTags ? `${label} (${tags.length})` : label}</span>
        <button
          type="button"
          className="agx-additional-tag__add"
          aria-label="Add tag"
          onClick={() => setIsAdding(true)}
        >
          <PlusIcon />
        </button>
      </div>
      {(hasTags || isAdding) && (
        <div className="agx-additional-tag__list">
          {tags.map((tag, index) => (
            <Tag key={`${tag}-${index}`} size="M" type="Default" x onRemove={() => removeTag(index)}>
              {tag}
            </Tag>
          ))}
          {isAdding && (
            <input
              ref={inputRef}
              className="agx-additional-tag__input"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={() => {
                commitDraft();
                setIsAdding(false);
              }}
              placeholder="Add tag"
            />
          )}
        </div>
      )}
    </div>
  );
}
