import { db } from '$lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
    const { name, email, message } = await request.json();

    try {
        await addDoc(collection(db, 'forms'), { name, email, message, timestamp: new Date() });
        return json({ message: 'Form submitted successfully!' });
    } catch (err) {
        return json({ error: 'Failed to save form' }, { status: 500 });
    }
}