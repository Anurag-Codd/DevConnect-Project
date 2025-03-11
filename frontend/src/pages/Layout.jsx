import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <>
      <Header />
      <main className="bg-black/90">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
