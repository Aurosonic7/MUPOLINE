import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginWorker } from "@/app/api/workers"; 

const handler = NextAuth ({
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      async authorize(credentials) {
        try {
          const response = await  loginWorker(credentials.email, credentials.password);
          if (response) {
            return response.worker;
          } else {
            throw new Error("Credenciales incorrectas");
          }
        } catch (error) {
          throw new Error(error.response ? error.response.data.message : error.message);
        }
      }
    })
  ],
  pages: {
    signOut: "/pages/login",
    error: "/pages/login",
  },
  session: {
    jwt: true,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.email = token.email;
        session.user.isAdmin = token.isAdmin;
      }
      return session;
    }
  },
});

export { handler as GET, handler as POST };

