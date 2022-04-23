import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { AiFillCheckCircle } from "react-icons/ai";
import Loading from "@/components/Loading";

///
const ConfirmRequest = () => {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const router = useRouter();

  if (!loading && !session) {
    router.push("/auth/providers");
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 py-12 max-w-md mx-auto">
      {loading ? (
        <div className="grid place-items-center h-screen">
          <Loading />
        </div>
      ) : !session ? (
        <p>Redirecting...</p>
      ) : (
        <>
          <AiFillCheckCircle className="w-14 h-14 sm:w-16 sm:h-16 text-green-600 shrink-0" />
          <h1 className="text-2xl sm:text-4xl font-bold mt-4">
            You&apos;re logged in!
          </h1>
          <p className="text-lg sm:text-2xl mt-4">
            Go back to your original tab.
          </p>
          <p className="text-normal sm:text-lg text-gray-500 mt-6">
            You can close this window or click{" "}
            <Link href="/">
              <a className="text-red-500 hover:underline hover:text-red-300">
                this link
              </a>
            </Link>{" "}
            to go back to the homepage.
          </p>
        </>
      )}
    </div>
  );
};

export default ConfirmRequest;
