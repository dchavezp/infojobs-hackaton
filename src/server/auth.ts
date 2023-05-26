import {
    type NextAuthOptions,
} from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        {
            id: "infojobs",
            name: "Infojobs",
            clientId: process.env.INFOJOBS_CLIENT_ID,
            clientSecret: process.env.INFOJOBS_SECRET,
            authorization: {
                url: 'https://www.infojobs.net/api/oauth/user-authorize/index.xhtml',
                params: {
                    scope: "MY_APPLICATIONS,CANDIDATE_PROFILE_WITH_EMAIL,CANDIDATE_READ_CURRICULUM_SKILLS,CV",
                    state: "OPTIONAL_CLIENT_LOCAL_STATE",
                    redirect_uri: process.env.REDIRECT_URL,
                    response_type: "code",
                    client_id: process.env.INFOJOBS_CLIENT_ID
                }
            },
            type: 'oauth',
            profileUrl: '/api/profile',
            profile(profile) {
                return {
                    id: profile?.id,
                    name: 'infojob-profile',
                    email: '',
                    image: profile?.profile_image_url,
                }
            },

        },
    ],

}
