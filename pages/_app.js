import { SessionProvider, useSession } from "next-auth/react";
import Layout from "@/components/Layout";
import Loading from "@/components/Loading";
import "../styles/globals.css";

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Layout>
        {Component.auth ? (
          <Auth>
            <Component {...pageProps} />
          </Auth>
        ) : (
          <Component {...pageProps} />
        )}
      </Layout>
    </SessionProvider>
  );
}

const Auth = ({ children }) => {
  const { status } = useSession({
    required: true,
  });

  if (status === "loading") {
    return <Loading />;
  }

  return children;
};
