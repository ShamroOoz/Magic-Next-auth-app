import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import * as OutlineIcons from "react-icons/ai";

const ProvidersScreen = ({ name, id }) => {
  const router = useRouter();
  return (
    <button
      onClick={() =>
        name !== "Email" ? signIn(id) : router.push("/auth/login")
      }
      className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300  hover:border-red-400 focus:bg-red-50 active:bg-blue-100"
    >
      <div className="relative flex items-center space-x-4 justify-center">
        <AiIcon name={name} />
        <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300  sm:text-base">
          Continue with {name}
        </span>
      </div>
    </button>
  );
};

const AiIcon = ({ name }) => {
  let iconName = "AiOutline" + name;
  let result = iconName !== "AiOutlineEmail" ? iconName : "AiOutlineMail";

  const { ...icons } = OutlineIcons;

  const Icon = icons[result === "AiOutlineGitHub" ? "AiOutlineGithub" : result];

  return <Icon className="absolute left-0 w-5 h-5 text-gray-700" />;
};

export default ProvidersScreen;
