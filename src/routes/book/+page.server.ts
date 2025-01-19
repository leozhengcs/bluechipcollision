import type { Actions } from './$types';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '$lib/firebase';
import { redirect } from '@sveltejs/kit';

export const actions = {
    default: async ({ request }) => {
        try {
            const data = await request.formData();
            const carMake = data.get('carMake');
            const name = data.get('name');
            const phoneNum = data.get('phoneNum');
            const email = data.get('email');
            const vin = data.get('vin');
            const responsePref = data.get('respondPref');
            const status = 'pending';

            console.log("trying to add doc")
            const docRef = await addDoc(collection(db, 'forms'), {
                carMake,
                name,
                phoneNum,
                email,
                vin,
                responsePref,
                status,
            });
            console.log("Added doc");
        } catch (error) {
            console.error("Error updating document:", error);
        }
        throw redirect(303, '/confirm');
    }
} satisfies Actions;

