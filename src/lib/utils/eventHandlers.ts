import { headerState } from "../../stores/header.svelte";
import type { Slot } from '$lib/types/calendar';

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
  headerState.currentPath = newPath;
}

export const bookSlot = async (slot: Slot, fetchFn: typeof fetch) => {
  const res = await fetchFn('/book', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
          start: slot.start,
          end: slot.end,
          summary: 'User Booking',
      }),
  });

  if (!res.ok) {
      throw new Error(`Failed to book slot: ${res.statusText}`);
  }

  const data = await res.json();
  return data;
};