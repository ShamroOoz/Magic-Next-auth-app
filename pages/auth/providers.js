import MagicLinkComp from "@/components/MagicLinkComp";
import ProvidersScreen from "@/components/ProvidersScreen";
import SignInError from "@/components/SignInError";
import { getProviders, getSession } from "next-auth/react";
import { useRouter } from "next/router";

///
export default function SignIn({ providers }) {
  const { error } = useRouter().query;

  return (
    <div className="py-16 md:-mt-10">
      <div className="container px-6 m-auto text-gray-500 md:px-12 xl:px-40">
        <div className="m-auto md:w-8/12 lg:w-6/12 xl:w-6/12">
          <div className="bg-white shadow-xl rounded-xl">
            <div className="p-6 sm:p-16">
              <div className="space-y-4">
                {error && <SignInError error={error} />}
              </div>
              <div className="grid space-y-4 ">
                {Object?.values(providers).map((provider) => (
                  <div key={provider.id}>
                    {provider.id !== "MagicLink" ? (
                      <div className="grid space-y-4">
                        <ProvidersScreen {...provider} />
                      </div>
                    ) : (
                      <MagicLinkComp actionType={"Login"} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const providers = await getProviders();
  const Session = await getSession(context);

  if (Session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: { providers },
  };
}
