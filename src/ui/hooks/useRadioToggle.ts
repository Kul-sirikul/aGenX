import { useEffect, useRef } from "react";

// A native radio only ever *selects* on click — clicking an already-selected
// radio fires no change event, so a lone demo radio can't be switched back
// off. This adds click-to-deselect on top.
//
// react-aria's own press handling stops the synthetic click from bubbling to
// an ancestor's `onClick` prop, so a plain JSX handler never sees it. Attach
// the returned ref to a wrapping element instead — a real native listener
// still receives the click regardless.
export function useRadioToggle<T extends HTMLElement>(isSelected: boolean, onChange?: (isSelected: boolean) => void) {
  const wasSelectedRef = useRef(isSelected);
  wasSelectedRef.current = isSelected;

  const elementRef = useRef<T>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    function handleClick() {
      if (wasSelectedRef.current) onChange?.(false);
    }

    element.addEventListener("click", handleClick);
    return () => element.removeEventListener("click", handleClick);
  }, [onChange]);

  return elementRef;
}
