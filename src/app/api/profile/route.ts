import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import axios from 'axios';
import { Profile } from '@/model/profile';

interface ProfileInfoJobsResponse {
    data: Profile
}
export async function GET(request: Request) {
    const basicAuth = process.env.AUTHORIZATION_INFOJOBS
    const bearerToken = cookies().get('accessToken')?.value
    const { data }: ProfileInfoJobsResponse = await axios.get('https://api.infojobs.net/api/6/candidate', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${basicAuth},Bearer ${bearerToken}`,
        }
    })
    return NextResponse.json({ profile: data });
}