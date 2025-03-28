export const isEmpty = (str: string) => {
    return !str.trim();
}

export const convertTo24Hours = (str: string) => {
    const [time, modifier] = str.split(' ');
    let [hours, minutes] = time.split(':').map(Number);

    if (modifier === 'PM' && hours !== 12) {
        hours += 12;
    }
    if (modifier === 'AM' && hours === 12) {
        hours = 0;
    }

    const hourStr = hours.toString().padStart(2, '0');
    const minuteStr = minutes.toString().padStart(2, '0');

    return `${hourStr}:${minuteStr}`;
}