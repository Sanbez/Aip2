import type { NextAuthConfig } from "next-auth";

// Edge-compatible config — NO Prisma, NO bcrypt, NO Node.js-only modules.
// Used in middleware (proxy.ts) which runs in the Edge Runtime.
export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const PUBLIC = ["/login", "/register", "/api/auth"];
      const isPublic = PUBLIC.some((p) => nextUrl.pathname.startsWith(p));
      if (isPublic) return true;
      return isLoggedIn;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        // @ts-expect-error — role is added in full auth.ts config
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        // @ts-expect-error — role is extended in auth.ts
        session.user.role = token.role;
      }
      return session;
    },
  },
  providers: [], // providers are added in auth.ts
} satisfies NextAuthConfig;
