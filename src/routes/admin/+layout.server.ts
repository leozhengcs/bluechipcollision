import { redirect } from "@sveltejs/kit";
import type { RequestEvent } from "@sveltejs/kit"
import type { PageServerLoad } from './$types';
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "$env/static/private";

export const load: PageServerLoad = async ({ cookies }: RequestEvent) => {
    const isAuthenticated = cookies.get('authenticated');

    if (!isAuthenticated) {
        throw redirect(303, '/login');
    }

    try {
        jwt.verify(isAuthenticated, JWT_SECRET);
    } catch {
        throw redirect(303, "/login");
    }
};