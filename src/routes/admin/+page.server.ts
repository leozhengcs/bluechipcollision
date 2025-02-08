import { db } from '$lib/firebase';
import type { Firestore } from 'firebase/firestore';
import { collection, getDocs } from 'firebase/firestore';
import type { PageServerLoad } from './$types';

async function getForms(db: Firestore) {
    const formsCollection = collection(db, 'forms');
    const formsSnapshot = await getDocs(formsCollection);
    return formsSnapshot.docs.map(doc => ({id: doc.id, data: doc.data()}));
}

export const load: PageServerLoad = async () => {
    const forms = await getForms(db);
    return {
        forms,
    };
};