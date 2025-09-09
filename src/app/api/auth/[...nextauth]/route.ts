import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoClient } from "mongodb";
import { connectToDatabase } from "../../../../lib/mongodb";
import { compare } from "bcryptjs";

// Extend the Session and User types to include 'id'
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  }
}

async function getUser(email: string) {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    // During build/static analysis the environment variable may be missing.
    // Return null so auth flows gracefully degrade instead of throwing.
    console.warn("MONGODB_URI not set; skipping DB lookup for user:", email);
    return null;
  }

  try {
    const client = await connectToDatabase();
    const db = client.db();
    const user = await db.collection("users").findOne({ email });
    return user;
  } catch (err) {
    console.warn("getUser DB error (auth):", err);
    return null;
  }
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        const user = await getUser(credentials.email);
        if (!user) return null;
        const isValid = await compare(credentials.password, user.password);
        if (!isValid) return null;
        return { id: user._id.toString(), email: user.email, name: user.name };
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) session.user.id = String(token.id);
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
});

export { handler as GET, handler as POST };
