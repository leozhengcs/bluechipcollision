export interface Slot {
    start: string;
    end: string;
    summary: string;
}

export type SlotsByDate = Record<string, Slot[]>;