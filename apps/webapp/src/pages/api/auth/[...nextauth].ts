import prisma from "@repo/db";
import NextAuth, {  } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "user123" },
        password: { label: "Password", type: "password" },
      },
      authorize: async function (credentials) {
        try {
          if (!credentials) throw new Error("No credentials received");

          const user = await signIn(credentials);
          return user;
        } catch (e) {
          console.log(e);
          return null;
        }
      },
    }),
  ],
});

const signIn = async (creds: Record<"username" | "password", string>) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        username: creds.username,
        password: creds.password,
      },
    });

    if (!user) throw new Error("User not found");

    return {
      username: user.username,
      email: user.email,
      id: String(user.id),
    };
  } catch (e) {
    throw e;
  }
};
