///
export default function Home() {
  return (
    <div className="container px-4 mx-auto mt-14">
      <div className="flex flex-wrap items-center -mx-4">
        <div className="w-full md:w-1/2 px-4 ">
          <h2 className="mt-8 mb-6 lg:mb-12 text-4xl md:text-5xl font-semibold">
            Take care of your performance every day.
          </h2>
          <div className="max-w-lg mb-6 md:mb-12">
            <p className="text-xl text-gray-500">
              Build a well-presented brand that everyone will love. Take care to
              develop resources continually and integrity them with previous
              projects.
            </p>
          </div>
          <div className="flex flex-wrap">
            <a
              className="inline-block hover:text-black px-6 py-4 mb-3 mr-4 text-sm font-medium leading-normal bg-red-500 hover:bg-red-300 text-white rounded transition duration-200"
              href="#"
            >
              Get Started
            </a>
            <a
              className="inline-block px-6 hover:border-red-400 border-2 py-4 mb-3 text-sm font-medium leading-normal hover:text-gray-700 rounded"
              href="#"
            >
              Learn More
            </a>
          </div>
        </div>
        <div className="md:w-1/2 px-10 hidden md:block mt-10">
          <img
            className="block md:h-96 md:w-10/12 md:max-w-lg object-cover border-4 border-red-500  rounded-2xl shadow-lg"
            src="https://cdn.shopify.com/s/files/1/2212/4481/products/SocialMediaSelfieFrames1-_1_555x555.jpg?v=1648516591"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
