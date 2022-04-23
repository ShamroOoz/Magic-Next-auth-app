import React, { useState } from "react";
import { validationChecker, fetchFromAPI } from "@/lib/helpers";
import Loading from "@/components/Loading";
import Link from "next/link";
import { signIn } from "next-auth/react";
import MagicLinkModal from "@/components/MagicLinkModal";

//
export default function Register() {
  const [error, seterror] = useState({});
  const [loading, setloading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState();
  let lprops = {
    loading,
    size: 15,
    color: "#fff",
  };

  //formSubmit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    const fromData = new FormData(e.target);
    let { email, password } = {
      email: fromData.get("email"),
      password: fromData.get("password"),
    };

    let validateResult = validationChecker({ email, password });
    if (Object.keys(validateResult).length !== 0) {
      setloading(false);
      return seterror(validateResult);
    }
    seterror({});
    setEmail(email);
    try {
      const response = await fetchFromAPI("register", {
        method: "POST",
        body: { email, password },
      });
      const { error } = await signIn("MagicLink", {
        email,
        redirect: false,
        callbackUrl: `${window.location.origin}/auth/confirm-request`,
      });
      setloading(false);
      if (error) {
        throw new Error(error);
      }
      setShowModal(true);
    } catch (err) {
      setloading(false);
      seterror({ ...error, message: err });
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container md:max-w-md mx-auto">
        <div className=" p-6 md:px-10  md:py-12 bg-white text-center border rounded-xl">
          <form onSubmit={handleSubmit}>
            <div className="space-y-5 mb-6">
              <h3 className=" text-3xl font-semibold font-heading">Register</h3>
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
              {loading ? <Loading {...lprops} /> : " Register"}
            </button>
            <p className="text-center mt-3">
              Have an account?{" "}
              <Link href="/auth/login">
                <a className="text-red-500 hover:underline">Login</a>
              </Link>
            </p>
          </form>
        </div>
      </div>
      <MagicLinkModal show={showModal} email={email} />
    </section>
  );
}
