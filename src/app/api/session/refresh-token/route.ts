import axios, { AxiosError } from 'axios';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
interface InfojobResponse {
    data: {
        access_token: string;
        refresh_token: string
    },
}
export async function GET(request: Request) {
    const refreshCookie = cookies().get('refreshToken')
    if (refreshCookie) {
        try {
            const { value: refreshToken } = refreshCookie
            const client_id = process.env.INFOJOBS_CLIENT_ID;
            const client_secret = process.env.INFOJOBS_SECRET_DECODED;
            const redirect_uri = process.env.REDIRECT_URL;
            const response: InfojobResponse = await axios.post(`https://www.infojobs.net/oauth/authorize?grant_type=refresh_token&client_id=${client_id}&client_secret=${client_secret}&refresh_token=${refreshToken}&redirect_uri=${redirect_uri}`, { headers: request.headers })
            const { access_token, refresh_token } = response.data
            cookies().set({
                name: 'accessToken',
                value: access_token,
            });
            cookies().set({
                name: 'refreshToken',
                value: refresh_token,
            });

            return NextResponse.json({ isSuccess: true, message: 'New access token generated' });
        } catch (error) {
            const errorDetail = error as AxiosError
            return new Response(JSON.stringify({ isSuccess: false, message: 'Something went wrong', error: errorDetail }), { status: 500 });
        }
    } else {
        return NextResponse.json({ isSuccess: false, message: 'No valid session founded!' }, { status: 401 });
    }

}