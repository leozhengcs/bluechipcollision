import { writable } from 'svelte/store';

const storedFiles = sessionStorage.getItem('fileDamages');
const initialValue: File[] = storedFiles ? JSON.parse(storedFiles) : [];

export const fileDamages = writable<File[]>(initialValue);

fileDamages.subscribe((value) => {
  sessionStorage.setItem('fileDamages', JSON.stringify(value));
});
