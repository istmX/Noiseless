import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "@/app/(auth)/types";
// In a full implementation, we will query Neon Postgres here.
// For now, we mock the user check as per the slice build approach.

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = LoginSchema.safeParse(credentials);
        if (!parsed.success) return null;

        
        if (parsed.data.email === "test@example.com" && parsed.data.password === "password123") {
          return { id: "1", email: "test@example.com", name: "Test User" };
        }
        
        return null; 
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
});
