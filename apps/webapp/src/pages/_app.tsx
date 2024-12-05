import "@/styles/globals.css";
import { NextComponentType, NextPageContext } from "next";
import { SessionProvider, useSession } from "next-auth/react";
import type { AppProps } from "next/app";

type CustomAppProps = AppProps & {
  Component: NextComponentType<NextPageContext, any, any> & {
    Auth: boolean;
  };
};

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: CustomAppProps) {
  return (
    <SessionProvider session={session}>
      {Component.Auth ? (
        <Auth>
          <Component {...pageProps} />
        </Auth>
      ) : (
        <Component {...pageProps} />
      )}
    </SessionProvider>
  );
}

function Auth({ children }: { children: React.ReactNode }) {
  const { status } = useSession({ required: true });

  if (status == "loading") return <h1>We are loading</h1>;
  else return children;
}
