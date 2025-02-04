import { getApps, initializeApp, type FirebaseOptions } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from '$env/static/private';
import { getFunctions } from "firebase/functions";

if (!firebaseConfig) {
    throw new Error("Missing Firebase Config");
}

const app = getApps().length === 0 ? initializeApp(JSON.parse(firebaseConfig) as FirebaseOptions) : getApps()[0];
export const db = getFirestore(app);

export const functions = getFunctions(app);
