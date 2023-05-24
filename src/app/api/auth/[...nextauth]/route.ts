import NextAuth from "next-auth"
const handler = NextAuth({
    providers: [
        {
            id: "infojobs",
            name: "Infojobs",
            clientId: process.env.INFOJOBS_CLIENT_ID,
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
            profile(profile) {
                return {
                    id: profile.id ?? "info-profile",
                    name: 'infojob-profile',
                    email: 'test@test.com',
                    image: profile?.profile_image_url,
                    code: profile?.code
                }
            },
        }
    ]
})

export { handler as GET, handler as POST }