import ProvidersScreen from "@/components/ProvidersScreen";
import MagicLinkComp from "@/components/MagicLinkComp";
import { getProviders, getSession } from "next-auth/react";

///
export default function SignIn({ providers }) {
  return (
    <div className=" md:-mt-10 py-16 ">
      <div className=" container m-auto px-6 text-gray-500 md:px-12 xl:px-40">
        <div className="m-auto md:w-8/12 lg:w-6/12 xl:w-6/12">
          <div className="rounded-xl bg-white shadow-xl">
            <div className="p-6 sm:p-16">
              <div className="grid space-y-4 ">
                {Object?.values(providers).map((provider) => (
                  <div key={provider.id}>
                    {provider.id !== "MagicLink" ? (
                      <div className="grid space-y-4">
                        <ProvidersScreen {...provider} />
                      </div>
                    ) : (
                      <MagicLinkComp />
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
