import { adminDB } from '$lib/firebaseAdmin';
import type { PageServerLoad, Actions } from './$types';
import { createClient } from "@supabase/supabase-js";
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import { PRIVATE_SUPABASE_SECRET } from '$env/static/private';

const supabase = createClient(PUBLIC_SUPABASE_URL, PRIVATE_SUPABASE_SECRET);

/**
 * Creates a new temp signed URL that references the insurance form of the user that
 * @param filePath Name of the image file
 * @param expiresIn Number of seconds before the link expires, deflt 10 minutes
 * @returns  The URL or error if something went wrong.
 */
async function getSignedUrl(filePath: string, expiresIn: number = 60 * 10) {
    const { data, error } = await supabase.storage
        .from("insurance-forms")
        .createSignedUrl(filePath, expiresIn);

    if (error) {
        console.error("Error getting signed URL: ", error);
    }
    return { data, error };
}

export const load: PageServerLoad = async ({ url }) => {
    const documentId = url.searchParams.get('id');

    if (!documentId) {
        throw new Error("No document ID");
    }

    try {
        const docRef = adminDB.collection('forms').doc(documentId);
        const docSnap = await docRef.get();

        if (docSnap.exists) {
            const formData = docSnap.data();
            const formURL = await getSignedUrl(formData?.insuranceForm);
            return { id: docSnap.id, imageURL: formURL.data?.signedUrl, ...docSnap.data() as FormData };
        } else {
            // Document does not exist
            console.error(`No document found with ID: ${documentId}`);
            return null;
        }
    } catch (error) {
        console.error('Error fetching document:', error);
        throw error;
    }
};

export const actions = {
    default: async ({ request }) => {
        try {
            const data = await request.formData();
            const docId = data.get('docId');
            const carMake = data.get('carMake');
            const name = data.get('name');
            const phoneNum = data.get('phoneNum');
            const email = data.get('email');
            const vin = data.get('vin');

            if (!docId || typeof docId !== 'string') {
                throw new Error('docId is required and must be a valid string');
            }

            const docRef = adminDB.collection('forms').doc(docId);
            await docRef.update({ carMake, name, phoneNum, email, vin });

            console.log("Document Updated");
        } catch (error) {
            console.error("Error updating document:", error);
            console.log("Failed to update document. Check the console for more details.");
        }
    }
} satisfies Actions;