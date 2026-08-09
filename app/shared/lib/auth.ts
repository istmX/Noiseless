import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "@/app/(auth)/types";
import { prisma } from "./db";
import bcrypt from "bcryptjs";

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


        const user = await prisma.user.findUnique({
          where: { email: parsed.data.email },
        });

        if (!user) return null;

        const isValid = await bcrypt.compare(parsed.data.password, user.password);
        if (!isValid) return null;

        return { id: user.id, email: user.email, name: user.name, avatarUrl: user.avatarUrl, tier: user.tier };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.avatarUrl = (user as any).avatarUrl || null;
        token.tier = (user as any).tier || "FREE";
      }
      if (trigger === "update" && session) {
        token.name = session.name;
        token.email = session.email;
        token.avatarUrl = session.avatarUrl;
        token.tier = session.tier || token.tier;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).id = token.id as string;
        (session.user as any).avatarUrl = token.avatarUrl as string;
        (session.user as any).tier = token.tier as string;
      }
      return session;
    },
  },

  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
});
