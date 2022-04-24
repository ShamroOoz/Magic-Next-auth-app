import { useState } from "react";
import Loading from "@/components/Loading";
import MagicLinkModal from "@/components/MagicLinkModal";
import Link from "next/link";
import { fetchFromAPI } from "@/lib/helpers";
///

const Forgotpassword = () => {
  const [email, setEmail] = useState();
  const [error, seterror] = useState();
  const [loading, setloading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  let lprops = {
    loading,
    size: 15,
    color: "#fff",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //check email validation
    if (!email) {
      return seterror("Email is required");
    }
    setloading(true);
    try {
      // Perform sign in
      await fetchFromAPI("forgotpassword", {
        method: "POST",
        body: { email },
      });
      setloading(false);
      setShowModal(true);
    } catch (error) {
      console.log(error);
      seterror(error);
      setloading(false);
    }
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
            </div>
            <div className="relative flex flex-wrap mb-2">
              <input
                className="relative w-full py-4 pl-4 text-sm border rounded"
                type="email"
                name="email"
                placeholder="hello@gamail.com"
                value={email || ""}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
              />
              <span className="absolute top-0 left-0 inline-block px-1 ml-4 -mt-2 text-xs text-gray-500 bg-white">
                Your email address
              </span>
              <p className="mt-2 ml-1 text-sm text-rose-500">{error}</p>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="inline-block w-full py-4 text-sm font-medium leading-normal text-white transition duration-200 bg-red-400 rounded disabled:cursor-not-allowed disabled:opacity-50 hover:bg-red-300"
            >
              {loading ? <Loading {...lprops} /> : "Submit"}
            </button>
            <p className="mt-3 text-center capitalize">
              GO BACK TO LOGIN?{" "}
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
};

export default Forgotpassword;
