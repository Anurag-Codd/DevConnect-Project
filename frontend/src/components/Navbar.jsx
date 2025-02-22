import gsap from "gsap";
import { useEffect } from "react";
import logo from "/DevConnect.png";
import { Link } from "react-router";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "./ui/button";

gsap.registerPlugin(ScrollTrigger);
const Navbar = () => {

  useEffect(() => {
    gsap.to("nav", {
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      scrollTrigger: {
        trigger: "nav",
        start: "top top",
        end: "bottom top",
        scrub: true,
        toggleActions: "play none none reverse",
      },
    });
  }, []);


  return (
    <nav className="bg-transparent h-16 flex items-center justify-between px-20 fixed top-0 left-0 w-full z-50 transition-colors duration-500">
      <div id="logo">
        <img src={logo} alt="Logo" className="h-8 " />
      </div>
      <div id="nav-content" className="flex space-x-4">
      <Button asChild variant="ghost" className='text-white'>
      <Link href="/login">Login</Link>
    </Button>
    <Button asChild variant="secondary"> 
      <Link href="/login">signup</Link>
    </Button>
        
      </div>
    </nav>
  );
};

export default Navbar;
