import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { AiOutlineMenu, AiOutlineThunderbolt } from "react-icons/ai";

const NavBar = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const loading = status === "loading";

  return (
    <nav className="flex justify-between items-center py-2 px-5 md:px-10 shadow-xl ">
      <Link href="/" passHref>
        <a className="text-lg font-semibold flex items-center gap-3 hover:text-red-300">
          <AiOutlineThunderbolt className="h-10 w-5" />
          <span> NextAuth</span>
        </a>
      </Link>

      <div className="md:hidden">
        <button className="navbar-burger flex items-center p-3 hover:bg-red-300 rounded">
          <AiOutlineMenu className="block h-4 w-4" />
        </button>
      </div>
      <ul className="hidden md:flex  md:ml-auto md:mr-12 md:items-center md:w-auto md:space-x-12">
        <li>
          <a className="text-sm font-medium hover:text-red-300" href="/">
            About
          </a>
        </li>
        <li>
          <a className="text-sm font-medium hover:text-red-300" href="/">
            Company
          </a>
        </li>
        <li>
          <Link href="/admin" passHref>
            <a className="text-sm font-medium hover:text-red-300">Admin</a>
          </Link>
        </li>
      </ul>
      <div
        className={`hidden md:flex md:gap-3 md:items-center ${
          loading ? "loading" : " loaded"
        }`}
      >
        {!session ? (
          <>
            <Link href="/api/auth/signin" passHref>
              <a
                onClick={(e) => {
                  e.preventDefault();
                  signIn(undefined, {
                    redirect: true,
                    callbackUrl: "http://localhost:3000/",
                  });
                }}
                className="inline-block px-6 py-3 mb-3  text-sm font-medium leading-normal bg-red-400 hover:bg-red-300 hover:text-gray-500 text-white rounded transition duration-200"
              >
                Login
              </a>
            </Link>
            <Link href="/api/auth/signin" passHref>
              <a
                onClick={(e) => {
                  e.preventDefault();
                  signIn(undefined, {
                    redirect: true,
                    callbackUrl: "http://localhost:3000/",
                  });
                }}
                className="inline-block px-6 py-3 mb-3  hover:border-red-400 border-2 text-sm font-medium leading-normal hover:text-gray-500 rounded "
              >
                Register
              </a>
            </Link>
          </>
        ) : (
          <Link href="/api/auth/signout" passHref>
            <a
              onClick={async (e) => {
                e.preventDefault();
                const data = await signOut({
                  redirect: false,
                  callbackUrl: "http://localhost:3000/",
                });
                router.push(data.url);
              }}
              className="inline-block px-6 py-3 mb-3  text-sm font-medium leading-normal bg-red-400 hover:bg-red-300 hover:text-gray-500 text-white rounded transition duration-200"
            >
              Logout
            </a>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
