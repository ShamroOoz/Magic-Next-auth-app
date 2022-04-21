import { getProviders, signIn } from "next-auth/react";
import { useRouter } from "next/router";

///
export default function SignIn({ providers }) {
  let router = useRouter();

  return (
    <>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          {provider.name === "credentials" ? (
            <button onClick={() => router.push("/auth/credentials")}>
              Sign in with {provider.name}
            </button>
          ) : (
            <button onClick={() => signIn(provider.id)}>
              Sign in with {provider.name}
            </button>
          )}
        </div>
      ))}
    </>
  );
}

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
