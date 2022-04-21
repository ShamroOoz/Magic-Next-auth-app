import Link from "next/link";
import React from "react";

const Notfound = () => {
  return (
    <section className="relative lg:py-20 overflow-hidden mt-20">
      <div className="container px-4 mx-auto">
        <div className="flex flex-wrap items-center">
          <div className="w-full  text-center">
            <span className="text-xs font-semibold text-gray-500 uppercase">
              Error 404
            </span>
            <h2 className="mt-8 mb-10 text-4xl font-semibold font-heading">
              Page not found
            </h2>
            <p className="mb-12 text-xl text-gray-500">
              Sorry! We are unable to find the page you are looking for
            </p>
            <div className="flex flex-wrap justify-center">
              <Link href="/" passHref>
                <a className="w-full md:w-auto px-8 py-4 mb-4 md:mb-0 md:mr-4 bg-red-400 hover:bg-red-300 text-sm text-white font-medium leading-normal rounded">
                  Go back to Homepage
                </a>
              </Link>
              <Link href="/" passHref>
                <a className="w-full md:w-auto px-12 py-4 border hover:border-gray-500 text-sm font-medium leading-normal rounded">
                  Try Again
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Notfound;
