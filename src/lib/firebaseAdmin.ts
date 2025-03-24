import admin from "firebase-admin";
import { FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY, FIREBASE_PROJECT_ID } from "$env/static/private";

// Ensure Firebase Admin SDK is initialized only once
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: FIREBASE_PROJECT_ID,
            clientEmail: FIREBASE_CLIENT_EMAIL,
            privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'), 
        }),
    });
}

export const adminDB = admin.firestore();
