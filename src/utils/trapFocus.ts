export function trapFocus<T extends HTMLElement>(
  container: T,
  e: KeyboardEvent,
) {
  const isTabPressed = e.key === "Tab";

  if (!isTabPressed) return;

  const focusableQuery =
    "a[href]:not([disabled]), area[href]:not([disabled]), input:not([disabled]), select:not([disabled]), button:not([disabled]), textarea:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]";

  const focusableElements = Array.from(
    container.querySelectorAll<HTMLElement>(focusableQuery),
  );

  const filteredFocusableElements = focusableElements.filter(
    (focusableElement) => {
      const tabIndex = focusableElement.getAttribute("tabindex");

      if (tabIndex === "-1") return 0;

      if (focusableElement.offsetWidth > 0 && focusableElement.offsetHeight > 0)
        return 1;

      if (focusableElement.offsetParent == null) return 0;

      return 0;
    },
  );

  if (filteredFocusableElements.length === 0) {
    container.focus();

    e.preventDefault();

    return;
  }

  const firstFocusableElement = focusableElements[0];

  const lastfocusableElement = focusableElements[focusableElements.length - 1];

  if (isTabPressed) {
    if (e.shiftKey) {
      if (
        document.activeElement === firstFocusableElement ||
        document.activeElement === container
      ) {
        lastfocusableElement.focus();

        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastfocusableElement) {
        firstFocusableElement.focus();

        e.preventDefault();
      }
    }
  }

  return;
}
