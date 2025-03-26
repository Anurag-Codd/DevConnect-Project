import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <>
      <Header />
      <main className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
