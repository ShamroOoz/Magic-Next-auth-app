import React, { useState } from "react";
import Loading from "@/components/Loading";
import Link from "next/link";
import { useRouter } from "next/router";
///

const Forgotpassword = () => {
  const [error, seterror] = useState({});
  const [loading, setloading] = useState(false);
  const router = useRouter();
  let { resetToken } = router.query;

  let lprops = {
    loading,
    size: 15,
    color: "#fff",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    const fromData = new FormData(e.target);
    let { password, confirmPassword } = {
      password: fromData.get("password"),
      confirmPassword: fromData.get("confirmpassword"),
    };

    if (password !== confirmPassword) {
      setloading(false);
      return seterror({ message: "Password Must Match" });
    }

    seterror({});

    const res = await fetch(`/api/passwordreset/${resetToken}`, {
      method: "PATCH",
      body: JSON.stringify({
        password,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const data = await res.json();
    setloading(false);
    if (res.status !== 201) {
      console.log(data);
      return seterror({ ...error, message: data.error });
    }
    console.log(data);
    router.push("/auth/login");
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto md:max-w-md">
        <div className="p-6 text-center bg-white border md:px-10 md:py-12 rounded-xl">
          <form onSubmit={handleSubmit}>
            <div className="mb-6 space-y-5">
              <h3 className="text-3xl font-semibold font-heading">
                Forgot Password
              </h3>
              <p className="text-xl text-red-500 capitalize">
                {error.message && error.message}
              </p>
            </div>
            <div className="relative flex flex-wrap mb-6">
              <input
                className="relative w-full py-4 pl-4 mb-2 text-sm border rounded md:mb-0"
                type="password"
                name="password"
                placeholder="******"
                autoFocus
              />
              <span className="absolute top-0 left-0 inline-block px-1 ml-4 -mt-2 text-xs text-gray-500 bg-white">
                New password
              </span>
            </div>
            <div className="relative flex flex-wrap mb-6">
              <input
                className="relative w-full py-4 pl-4 mb-2 text-sm border rounded md:mb-0"
                type="password"
                name="confirmpassword"
                placeholder="******"
              />
              <span className="absolute top-0 left-0 inline-block px-1 ml-4 -mt-2 text-xs text-gray-500 bg-white">
                Confirm Password
              </span>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="inline-block w-full py-4 text-sm font-medium leading-normal text-white transition duration-200 bg-red-400 rounded disabled:cursor-not-allowed disabled:opacity-50 hover:bg-red-300"
            >
              {loading ? <Loading {...lprops} /> : " Change Password"}
            </button>
            <p className="mt-3 text-center capitalize">
              Go Back to Login?{" "}
              <Link href="/auth/login">
                <a className="text-red-500 hover:underline">Login</a>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Forgotpassword;
