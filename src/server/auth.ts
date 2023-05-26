import {
    type NextAuthOptions,
    type DefaultSession,
} from "next-auth";

declare module "next-auth" {
    interface Session extends DefaultSession {
        user: {
            id: string;
            // ...other properties
            // role: UserRole;
        } & DefaultSession["user"];
    }

    // interface User {
    //   // ...other properties
    //   // role: UserRole;
    // }
}
export const authOptions: NextAuthOptions = {
    callbacks: {
        async signIn() {
            return true
        },
    },
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
