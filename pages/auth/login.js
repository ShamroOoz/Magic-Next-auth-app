import React, { useState } from "react";
import { signIn, getSession } from "next-auth/react";
import { validationChecker } from "@/lib/helpers";
import Loading from "@/components/Loading";
import Link from "next/link";
import { useRouter } from "next/router";
import SignInError from "@/components/SignInError";
//
export default function Login() {
  const [error, seterror] = useState({});
  const [authError, setauthError] = useState();
  const [loading, setloading] = useState(false);
  const router = useRouter();
  let lprops = {
    loading,
    size: 15,
    color: "#fff",
  };

  //
  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    const fromData = new FormData(e.target);
    let result = {
      email: fromData.get("email"),
      password: fromData.get("password"),
    };

    let validateResult = validationChecker(result);
    if (Object.keys(validateResult).length !== 0) {
      setloading(false);
      return seterror(validateResult);
    }
    seterror({});
    try {
      const { error, url } = await signIn("credentials", {
        email: result.email,
        password: result.password,
        redirect: false,
        callbackUrl: `${window.location.origin}/auth/confirm-request`,
      });

      if (error) {
        throw new Error(error);
      }
      router.push(url);
      setloading(false);
    } catch (err) {
      setloading(false);
      console.log(err);
      setauthError(err.message);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto md:max-w-md">
        <div className="p-6 text-center bg-white border md:px-10 md:py-12 rounded-xl">
          <form onSubmit={handleSubmit}>
            <div className="mb-6 space-y-5">
              <h3 className="text-3xl font-semibold font-heading">Login</h3>
              <p className="text-xl text-red-500 capitalize">
                {error.message && error.message}
              </p>
              <div className="space-y-4">
                {authError && <SignInError error={authError} />}
              </div>
            </div>
            <div className="relative flex flex-wrap mb-6">
              <input
                className="relative w-full py-4 pl-4 mb-2 text-sm border rounded md:mb-0"
                type="email"
                name="email"
                placeholder="hello@gamail.com"
                autoFocus
              />
              <span className="absolute top-0 left-0 inline-block px-1 ml-4 -mt-2 text-xs text-gray-500 bg-white">
                Your email address
              </span>
              <p className="mt-2 ml-1 text-sm text-rose-500">
                {error.email && error.email}
              </p>
            </div>
            <div className="relative flex flex-wrap mb-6">
              <input
                className="relative w-full py-4 pl-4 mb-2 text-sm border rounded md:mb-0"
                type="password"
                name="password"
                placeholder="******"
              />
              <span className="absolute top-0 left-0 inline-block px-1 ml-4 -mt-2 text-xs text-gray-500 bg-white">
                Password
              </span>
              <p className="mt-2 ml-1 text-sm text-rose-500">
                {error.password && error.password}
              </p>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="inline-block w-full py-4 text-sm font-medium leading-normal text-white transition duration-200 bg-red-400 rounded disabled:cursor-not-allowed disabled:opacity-50 hover:bg-red-300"
            >
              {loading ? <Loading {...lprops} /> : " Login"}
            </button>
            <label className="inline-flex mb-10 text-left">
              <span className="inline-block -mt-1 text-sm text-gray-500">
                <Link href="/auth/forgot-password" passHref>
                  <a className="text-red-400 hover:underline">
                    Forgot password?
                  </a>
                </Link>
              </span>
            </label>
            <p className="mt-3 text-center">
              Don&rsquo;t have an account?{" "}
              <Link href="/auth/register">
                <a className="text-red-500 hover:underline">Register</a>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

///try to fis it client side using useSession Hock
export async function getServerSideProps(context) {
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
    props: {  },
  };
}
