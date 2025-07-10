import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";
import { authSchema } from "@/db/schema";
import { nextCookies } from "better-auth/next-js";
import { admin } from "better-auth/plugins";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: authSchema,
  }),
  plugins: [
    nextCookies(),
    admin({
      adminUserIds: ["P1bSy86JTH4SPw7kg6K7TRXMY3hecrGy"],
      defaultRole: "student",
      impersonationSessionDuration: 60 * 60 * 24,
      defaultBanReason: "Violation of community guidelines or/and terms of service.",
      defaultBanExpiresIn: 60 * 60 * 24,
      bannedUserMessage:
        "Your account has been temporarily suspended. Please contact support if you believe this is an error.",
    }),
  ],
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google", "github"],
    },
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "student",
        input: false,
      },
      username: {
        type: "string",
        required: true,
        input: true,
      },
      banned: {
        type: "boolean",
        required: false,
        defaultValue: false,
        input: false,
      },
      bio: {
        type: "string",
        required: false,
        input: true,
      },
      institution: {
        type: "string",
        required: false,
        input: true,
      },
      gradeLevel: {
        type: "string",
        required: false,
        input: true,
      },
      enrolledCourses: {
        type: "string", // Comma-separated course IDs
        required: false,
        input: false,
      },
      progressJson: {
        type: "string", // JSON stringified progress object
        required: false,
        input: false,
      },
      achievements: {
        type: "string", // Comma-separated achievement IDs
        required: false,
        input: false,
      },
      preferencesJson: {
        type: "string", // JSON stringified preferences object
        required: false,
        input: false,
      },
    },
  },
});
