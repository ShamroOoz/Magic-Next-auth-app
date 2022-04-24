import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import EmailProvider from "next-auth/providers/email";
import nodemailer from "nodemailer";
import Handlebars from "handlebars";
import { readFileSync } from "fs";
import path from "path";
import bcrypt from "bcrypt";

//DB
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import connectDB from "@/lib/connectDB";
import clientPromise from "@/lib/mongodb";

import User from "@/models/userModel";
import accounts from "@/models/accountsModel";

// const transporter = nodemailer.createTransport({
//   host: process.env.EMAIL_SERVER_HOST,
//   port: process.env.EMAIL_SERVER_PORT,
//   auth: {
//     user: process.env.EMAIL_SERVER_USER,
//     pass: process.env.EMAIL_SERVER_PASSWORD,
//   },
//   secure: true,
// });
const transporter = nodemailer.createTransport({
  service: process.env.GOOGLE_EMAIL_SERVER_HOST,
  port: process.env.EMAIL_SERVER_PORT,
  auth: {
    user: process.env.GOOGLE_EMAIL_FROM,
    pass: process.env.GOOGLE_EMAIL_SERVER_PASSWORD,
  },
  secure: true,
  ls: {
    rejectUnAuthorized: true,
  },
});

const emailsDir = path.resolve(process.cwd(), "emails");

const sendVerificationRequest = async ({ identifier, url }) => {
  const emailFile = readFileSync(path.join(emailsDir, "confirm-email.html"), {
    encoding: "utf8",
  });
  const emailTemplate = Handlebars.compile(emailFile);
  try {
    let info = await transporter.sendMail({
      from: `"⚡ Magic NextAuth" ${process.env.EMAIL_FROM}`,
      to: identifier,
      subject: "Your sign-in link for Magic NextAuth",
      html: emailTemplate({
        signin_url: url,
        email: identifier,
      }),
    });
    console.log(`Message Sent: ${info.messageId}`);
  } catch (error) {
    console.log(error);
  }
};

const sendWelcomeEmail = async ({ user }) => {
  const { email } = user;

  try {
    const emailFile = readFileSync(path.join(emailsDir, "welcome.html"), {
      encoding: "utf8",
    });
    const emailTemplate = Handlebars.compile(emailFile);
    await transporter.sendMail({
      from: `"⚡ Magic NextAuth" ${process.env.EMAIL_FROM}`,
      to: email,
      subject: "Welcome to Magic NextAuth! 🎉",
      html: emailTemplate({
        base_url: process.env.NEXTAUTH_URL,
        support_email: "shamrozwarraich@gmail.com",
      }),
    });
  } catch (error) {
    console.log(`❌ Unable to send welcome email to user (${email})`);
  }
};

const auth = async (req, res) => {
  const providers = [
    EmailProvider({
      id: "MagicLink",
      sendVerificationRequest,
      maxAge: 10 * 60, // Magic links are valid for 10 min only
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: { label: "Username", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const { email, password } = credentials;
          const user = await User.findOne({ email });
          console.log({ user });
          if (!user) return null;
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) return null;
          if (user && isMatch) {
            return user;
          }
        } catch (error) {
          return null;
        }
      },
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
        if (account.provider === "MagicLink") {
          return true;
        }
        if (user && account && account.provider !== "credentials") {
          if (
            user &&
            account &&
            account.provider !== "credentials" &&
            account.provider !== "MagicLink"
          ) {
            const userdata = await User.findOne({ email: user.email });
            const data = await accounts.findOne({ userId: userdata.id });
            if (data) {
              return true;
            }
            const newAccount = new accounts({ ...account, userId: user.id });
            await newAccount.save();
            return true;
          }
        }
        if (user && user.emailVerified) {
          return true;
        }
        // Or you can return a URL to redirect to:
        return process.env.NODE_ENV !== "production"
          ? "http://localhost:3000/auth/confirm-email"
          : "https://magic-next-auth-app.vercel.app/auth/confirm-email";
      },
      async redirect({ url, baseUrl }) {
        if (url.startsWith("/")) return `${baseUrl}${url}`;
        // Allows callback URLs on the same origin
        else if (new URL(url).origin === baseUrl) return url;
        return baseUrl;
      },
      async session({ session, token, user }) {
        session.user = token.user;
        return session;
      },
      async jwt({ token, user, account, profile, isNewUser }) {
        if (user) {
          token.user = user;
        }
        return token;
      },
    },
    events: { createUser: sendWelcomeEmail },
    pages: {
      signIn: "/auth/providers",
    },
    debug: process.env.NODE_ENV !== "production",
  });
};

export default connectDB(auth);
