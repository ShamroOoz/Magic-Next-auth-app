import NavBar from "./NavBar";
import Head from "next/head";

const Layout = ({ children }) => {
  return (
    <div>
      <Head>
        <title> Magic NextAuth</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <NavBar />
      {children}
    </div>
  );
};

export default Layout;
