import { headerState } from "../../stores/header.svelte";
import type { Slot } from '$lib/types/calendar';
import emailjs from 'emailjs-com';

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
            summary: slot.summary,
        }),
    });

    if (!res.ok) {
        throw new Error(`Failed to book slot: ${res.statusText}`);
    }

    const data = await res.json();
    return data;
};

export const sendNotify = async (name: string, recipient: string, startTime: string, endTime: string) => {
    try {
        const templateID = 'template_ms7apnd'; // Service ID from EmailJS
        const publicKey = 'dLmCzZJKlKbV1UctL'; // Template ID from EmailJS
        const serviceID = 'service_3br9lld'; // Public Key from EmailJS

        const templateParams = {
            name: name,
            to_email: recipient,
            startTime: startTime,
            endTime: endTime,
        };

        // Send email using EmailJS
        const response = await emailjs.send(serviceID, templateID, templateParams, publicKey);

        if (response.status !== 200) {
            throw new Error(`Error sending email ${response.text}.`)
        }
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

export const sendConfirm = async (name: string, recipient: string, startTime: string, endTime: string, date: string) => {
    try {
        const templateID = 'template_ms7apnd'; // Template ID from EmailJS
        const publicKey = 'dLmCzZJKlKbV1UctL'; // Public Key from EmailJS
        const serviceID = 'service_3br9lld'; // Service ID from EmailJS

        console.log(startTime);

        const templateParams = {
            to_name: name,
            to_email: recipient,
            startTime: startTime,
            endTime: endTime,
            date: date
        };

        // Send email using EmailJS
        const response = await emailjs.send(serviceID, templateID, templateParams, publicKey);
        if (response.status !== 200) {
            throw new Error(`Error sending email ${response.text}.`)
        }
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

export const sendContact = async (name: string, email: string, subject: string, content: string) => {
    try {
        const templateID = 'template_74cvcic'; // Template ID from EmailJS
        const publicKey = 'dLmCzZJKlKbV1UctL'; // Public Key from EmailJS
        const serviceID = 'service_3br9lld'; // Service ID from EmailJS

        const templateParams = {
            from_name: name,
            from_email: email,
            to_email: 'bluechipcollision@gmail.com',
            subject: subject,
            message: content,
        };

        // Send email using EmailJS
        const response = await emailjs.send(serviceID, templateID, templateParams, publicKey);
        if (response.status !== 200) {
            throw new Error(`Error sending email ${response.text}.`)
        }
        console.log(response);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}