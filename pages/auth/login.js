import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { validationChecker } from "@/lib/helpers";
import Loading from "@/components/Loading";
import Link from "next/link";
import {useRouter} from "next/router"
//
export default function Login() {
  const [error, seterror] = useState({});
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
    console.log(validateResult);
    if (Object.keys(validateResult).length !== 0) {
      setloading(false);
      return seterror(validateResult);
    }
    seterror({});
    try {
      const { error , url } = await signIn("credentials", {
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
      seterror({ ...error, message: "Not valid Credentials" });
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container md:max-w-md mx-auto">
        <div className=" p-6 md:px-10  md:py-12 bg-white text-center border rounded-xl">
          <form onSubmit={handleSubmit}>
            <div className="space-y-5 mb-6">
              <h3 className=" text-3xl font-semibold font-heading">Login</h3>
              <p className="text-xl text-red-500 capitalize">
                {error.message && error.message}
              </p>
            </div>

            <div className="relative flex flex-wrap mb-6">
              <input
                className="relative mb-2 md:mb-0 w-full py-4 pl-4 text-sm border rounded"
                type="email"
                name="email"
                placeholder="hello@gamail.com"
                autoFocus
              />
              <span className="absolute top-0 left-0 ml-4 -mt-2 px-1 inline-block bg-white text-gray-500 text-xs">
                Your email address
              </span>
              <p className="ml-1 text-sm text-rose-500 mt-2">
                {error.email && error.email}
              </p>
            </div>
            <div className="relative flex flex-wrap mb-6">
              <input
                className="relative mb-2 md:mb-0 w-full py-4 pl-4 text-sm border rounded"
                type="password"
                name="password"
                placeholder="******"
              />
              <span className="absolute top-0 left-0 ml-4 -mt-2 px-1 inline-block bg-white text-gray-500 text-xs">
                Password
              </span>
              <p className="ml-1 text-sm text-rose-500 mt-2">
                {error.password && error.password}
              </p>
            </div>
            <button
              type="submit"
              disabled={loading}
              className=" disabled:cursor-not-allowed disabled:opacity-50 w-full inline-block py-4 text-sm text-white font-medium leading-normal bg-red-400 hover:bg-red-300 rounded transition duration-200"
            >
              {loading ? <Loading {...lprops} /> : " Login"}
            </button>
            <p className="text-center mt-3">
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
