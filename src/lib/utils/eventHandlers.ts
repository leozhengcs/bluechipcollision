import { path } from "../../stores/header.svelte";

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

export const handleNavigation = (newPath: string) => {
    path.currentPath = newPath;
}