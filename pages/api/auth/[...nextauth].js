import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";

export default async function auth(req, res) {
  const providers = [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // const res = await fetch("/your/endpoint", {
        //   method: "POST",
        //   body: JSON.stringify(credentials),
        //   headers: { "Content-Type": "application/json" },
        // });
        // const user = await res.json();

        // If no error and we have user data, return it
        //if (res.ok && user)
        const user = { id: 1, name: "J Smith", email: "jsmith@example.com" };
        if (user) {
          return user;
        }

        return null;
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ];
  return await NextAuth(req, res, {
    providers,
    adapter: MongoDBAdapter(clientPromise),
    session: {
      strategy: "jwt",
    },
    callbacks: {
      async signIn({ user, account, profile, email, credentials }) {
        return true;
      },
      async redirect({ url, baseUrl }) {
        if (url.startsWith("/")) return `${baseUrl}${url}`;
        // Allows callback URLs on the same origin
        else if (new URL(url).origin === baseUrl) return url;
        return baseUrl;
      },
      async session({ session, token, user }) {
        return session;
      },
      async jwt({ token, user, account, profile, isNewUser }) {
        return token;
      },
    },
    pages: {
      signIn: "/auth/signin",
      signOut: "/",
    },
  });
}
