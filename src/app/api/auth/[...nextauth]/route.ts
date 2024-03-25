import { config } from "@/utils/config";
import NextAuth, { DefaultSession } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

//to get userId from next auth
//reflink -----> https://stackoverflow.com/questions/70409219/get-user-id-from-session-in-next-auth-client
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
    } & DefaultSession['user'];
  }
}
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: config.googleClientId,
      clientSecret: config.googleClientSecret,
    }),
    GitHubProvider({
    clientId: config.githubId,
    clientSecret: config.githubSecret
  })
  ],
  //add callback fun after user login or signUp success to get userID
  callbacks: {
    session: async ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub,
      },
    })
  }
})

export { handler as GET, handler as POST };
