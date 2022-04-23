import { useState } from "react";
import { signIn } from "next-auth/react";
import Loading from "./Loading";
import MagicLinkModal from "@/components/MagicLinkModal";

//
const MagicLinkComp = () => {
  const [email, setEmail] = useState();
  const [error, seterror] = useState();
  const [loading, setloading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  let lprops = {
    loading,
    size: 15,
    color: "#fff",
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    //check email validation
    if (!email) {
      return seterror("Email is required");
    }
    setloading(true);
    try {
      // Perform sign in
      const { error } = await signIn("MagicLink", {
        email,
        redirect: false,
        callbackUrl: `${window.location.origin}/auth/confirm-request`,
      });

      setloading(false);
      // Something went wrong
      if (error) {
        console.log(error);
        throw new Error(error);
      }
      setShowModal(true);
    } catch (error) {
      seterror(error);
      setloading(false);
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <form onSubmit={handleSignIn}>
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
            <span className="absolute top-0 left-0 ml-4 -mt-2 px-1 inline-block bg-white text-gray-500 text-xs">
              Your email address
            </span>
            <p className="ml-1 text-sm text-rose-500 mt-2">{error}</p>
          </div>
          <button
            type="submit"
            disabled={loading}
            className=" disabled:cursor-not-allowed disabled:opacity-50 w-full inline-block py-4 text-sm text-white font-medium leading-normal bg-red-400 hover:bg-red-300 rounded transition duration-200"
          >
            {loading ? <Loading {...lprops} /> : "Login"}
          </button>
        </form>
      </div>
      <MagicLinkModal show={showModal} email={email} />
    </>
  );
};

export default MagicLinkComp;
