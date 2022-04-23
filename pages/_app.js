import { SessionProvider, useSession } from "next-auth/react";
import Layout from "@/components/Layout";
import Loading from "@/components/Loading";
import "../styles/globals.css";
import { useRouter } from "next/router";

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
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated(data) {
      router.push("/");
    },
  });

  if (status === "loading") {
    return (
      <div className="grid place-items-center h-screen">
        <Loading />
      </div>
    );
  }

  return children;
};
