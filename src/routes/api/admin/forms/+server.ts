import { adminDB } from '$lib/firebaseAdmin';
import { json } from '@sveltejs/kit';

export async function GET({ request }) {
    const authHeader = request.headers.get('authorization');
    if (!authHeader) return json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const snapshot = await adminDB.collection('forms').orderBy('timestamp', 'desc').get();
        const forms = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return json(forms);
    } catch (err) {
        return json({ error: 'Failed to fetch forms' }, { status: 500 });
    }
}
