import { redirect } from "@sveltejs/kit";
import { db } from '$lib/firebase';
import type { Firestore } from 'firebase/firestore';
import { collection, getDocs } from 'firebase/firestore';
import type { PageServerLoad } from './$types';
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "$env/static/private";

async function getForms(db: Firestore) {
    const formsCollection = collection(db, 'forms');
    const formsSnapshot = await getDocs(formsCollection);
    return formsSnapshot.docs.map(doc => ({id: doc.id, data: doc.data()}));
}

export const load: PageServerLoad = async ({ cookies }) => {
    const isAuthenticated = cookies.get('authenticated');

    if (!isAuthenticated) {
        throw redirect(303, '/login');
    }

    try {
        const decoded = jwt.verify(isAuthenticated, JWT_SECRET);
        const forms = await getForms(db);
        return {
            forms,
        };
    } catch {
        throw redirect(303, "/login");
    }
};
