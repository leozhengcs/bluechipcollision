import { adminDB } from '$lib/firebaseAdmin';
import type { PageServerLoad } from './$types';

async function getForms() {
    const formsCollection = adminDB.collection('forms');
    const formsSnapshot = await formsCollection.get();
    
    return formsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
}

export const load: PageServerLoad = async () => {
    try {
        const forms = await getForms();
        return { forms };
    } catch (error) {
        console.error("Error fetching forms:", error);
        return { forms: [] };
    }
};