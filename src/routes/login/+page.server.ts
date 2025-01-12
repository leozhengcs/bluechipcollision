import { redirect, fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { adminUser, adminPass } from '$env/static/private';

export const actions = {
	default: async ({ request, cookies }) => {
        const data = await request.formData();
        const username = data.get("username");
        const password = data.get("password");

        if (!username || !password) {
            return fail(400, { error: 'Both fields are required.' });
        }

        const isValidUser = username === adminUser && password === adminPass;
        if (!isValidUser) {
            return fail(401, { error: 'Invalid username or password' });
        }

        //TODO: Add cookie logic here!
        cookies.set('authenticated', '', {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 60 * 60 * 3,
        })
        throw redirect(303, '/admin');
    }
} satisfies Actions;
