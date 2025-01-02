export function handleClickOutside(
    event: MouseEvent,
    className: string,
    clickOutsideAction: () => void
) {
    const target = event.target as HTMLElement;
    if (!target.closest(className)) {
        clickOutsideAction();
    }
}