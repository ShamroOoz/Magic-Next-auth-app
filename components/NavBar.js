import { LightningBoltIcon, MenuIcon } from "@heroicons/react/solid";
import Link from "next/link";

const NavBar = () => {
  return (
    <nav className="flex justify-between items-center py-2 px-5 md:px-10  ">
      <Link href="/" passHref>
        <a className="text-lg font-semibold flex gap-3 hover:text-red-300">
          <LightningBoltIcon className="h-7 " />
          <span> NextAuth</span>
        </a>
      </Link>

      <div className="md:hidden">
        <button className="navbar-burger flex items-center p-3 hover:bg-red-300 rounded">
          <MenuIcon className="block h-4 w-4" />
        </button>
      </div>
      <ul className="hidden md:flex  md:ml-auto md:mr-12 md:items-center md:w-auto md:space-x-12">
        <li>
          <a className="text-sm font-medium hover:text-red-300" href="#">
            About
          </a>
        </li>
        <li>
          <a className="text-sm font-medium hover:text-red-300" href="#">
            Company
          </a>
        </li>
      </ul>
      <div className="hidden md:flex md:gap-3 md:items-center ">
        <Link href="/" passHref>
          <a className="inline-block px-6 py-3 mb-3  text-sm font-medium leading-normal bg-red-400 hover:bg-red-300 hover:text-gray-500 text-white rounded transition duration-200">
            Login
          </a>
        </Link>
        <Link href="/" passHref>
          <a className="inline-block px-6 py-3 mb-3  hover:border-red-400 border-2 text-sm font-medium leading-normal hover:text-gray-500 rounded ">
            Register
          </a>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
