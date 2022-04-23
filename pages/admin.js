import { useSession } from "next-auth/react";

export default function AdminDashboard() {
  const { data: session } = useSession();
  // session is always non-null inside this page, all the way down the React tree.

  console.log({ session });
  return (
    <section className="py-20">
      <div className="container px-4 mx-auto">
        <div className="bg-gray-900 rounded-xl px-24">
          <div className="flex flex-wrap items-center py-10 lg:py-20 -px-4">
            <div className="w-full md:w-3/5 px-4 mb-6 md:mb-0">
              <div className="mb-5 lg:mb-0">
                <h3 className="mb-4 text-3xl font-semibold font-heading text-white">
                  Welcome to admin page
                </h3>
                <p className="text-xl text-gray-200">{session?.user?.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

AdminDashboard.auth = true;
