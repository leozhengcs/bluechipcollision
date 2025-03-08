import { RECAPTCHA_SECRET } from '$env/static/private';
import { fail } from '@sveltejs/kit';

const verificationUrl = 'https://www.google.com/recaptcha/api/siteverify';

export const actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        const token = formData.get('token');

        const form = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            content: formData.get('content'),
        }

        if (!token) {
            return { success: false, error: 'No token provided', values: form }; 
        }

        try {
            const response = await fetch(verificationUrl, {
              method: 'POST',
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
              body: new URLSearchParams({
                secret: RECAPTCHA_SECRET,
                response: token.toString()
              })
            });

            const data = await response.json();
            console.log(data);

            if (data.success) {
                return { success: true, values: form};
            } else {
                return fail(400, {success: false, error: data['error-codes'], values: form });
            }
        } catch (error) {
            return fail(400,{ success: false, error: 'Captcha validation failed', values: form });
        }
    }
}