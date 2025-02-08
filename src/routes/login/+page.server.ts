import { redirect, fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { adminUser, adminPass, JWT_SECRET } from "$env/static/private";
import jwt from "jsonwebtoken";

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

        const token = jwt.sign(
            { username },
            JWT_SECRET,
            { expiresIn: "3h" }  // Token expiration
        );

        cookies.set('authenticated', token, {
            path: '/',
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 60 * 60 * 3,
        })
        throw redirect(303, '/admin');
    }
} satisfies Actions;
