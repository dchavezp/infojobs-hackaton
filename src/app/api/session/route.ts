import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import axios from 'axios';
interface InfojobResponse {
    data: {
        access_token: string;
        refresh_token: string
    }
}
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');

    if (code) {
        try {
            const client_id = process.env.INFOJOBS_CLIENT_ID;
            const client_secret = process.env.INFOJOBS_SECRET_DECODED;
            const redirect_uri = process.env.REDIRECT_URL;
            const response: InfojobResponse = await axios.post(`https://www.infojobs.net/oauth/authorize?grant_type=authorization_code&client_id=${client_id}&client_secret=${client_secret}&code=${code}&redirect_uri=${redirect_uri}`)
            const { access_token, refresh_token } = response.data
            cookies().set({
                name: 'accessToken',
                value: access_token,
            });
            cookies().set({
                name: 'refreshToken',
                value: refresh_token,
            });
        } catch (error) {
            return new Response(JSON.stringify({ message: 'Something went wrong', error: error }), { status: 500 })
        }
    }
    // Set a cookie to hide the banner

    return NextResponse.redirect(new URL('/', request.url));
}