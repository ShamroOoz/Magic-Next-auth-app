import MagicLinkComp from "@/components/MagicLinkComp";
import { AiOutlineThunderbolt } from "react-icons/ai";

const confirmEmail = () => {
  return (
    <div className="container px-6 m-auto mt-24 text-gray-500 md:px-12 xl:px-40">
      <div className="m-auto md:w-8/12 lg:w-6/12 xl:w-6/12 ">
        <div className="bg-white shadow-xl rounded-xl">
          <div className="p-6 sm:p-16">
            <div className="grid space-y-4 ">
              <AiOutlineThunderbolt className="text-red-500 shrink-0 w-14 h-14 sm:w-16 sm:h-16" />
              <h1 className="mb-5 text-lg text-center sm:text-4xl">
                Verify Email
              </h1>
              <MagicLinkComp actionType={"Verify"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default confirmEmail;
