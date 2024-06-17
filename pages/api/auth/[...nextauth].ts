import NextAuth, {
  Awaitable,
  NextAuthOptions,
  RequestInternal,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import api from "../../../libs/api";
import { AuthUser } from "../../../types/AuthUser";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  // Configure one or more authentication providers
  providers: [
    // ...add more providers here
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "E-mail", type: "text" },
        password: { label: "Senha", type: "password" },
      },
      authorize: async (credentials, req) => {
        if (credentials && credentials?.email && credentials?.password) {
          const user = await api.getOneUserByEmail(credentials.email, req);
          if (user) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            };
          }
        }
        return null;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
    async session({ session, token }) {
      //workarround
      if (token) session.user = token.user as AuthUser;
      return session;
    },
  },
};

export default NextAuth(authOptions);
