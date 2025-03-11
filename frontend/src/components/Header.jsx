import gsap from "gsap";
import { Button } from "./ui/button";
import { useGSAP } from "@gsap/react";
import userlogo from "@/assets/User.png";
import logo from "@/assets/DevConnect.png";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AlignJustify, BellRing, BriefcaseBusiness } from "lucide-react";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger} from "./ui/sheet";
import { logout } from "@/store/features/user.slice";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user?.user);

  useGSAP(() => {
    gsap.to("nav", {
      backgroundColor: "rgb(0, 0, 0)",
      boxShadow: "0px 20px 200px rgba(255, 255, 255, 0.2)",
      scrollTrigger: {
        trigger: "nav",
        start: "top top",
        end: "bottom top",
        scrub: true,
        toggleActions: "play none none reverse",
      },
    });
  });

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="navbar w-full fixed top-0 left-0 right-0 z-50 p-4 transition-all border-b border-transparent">
      <div className="container mx-auto flex items-center justify-between md:px-8 lg:px-12">
        <Link to="/">
          <img src={logo} alt="DevConnect Logo" className="w-[110px]" />
        </Link>
        <DesktopNavbar user={user} handleLogout={handleLogout} />
        <MobileNavbar user={user} handleLogout={handleLogout} />
      </div>
    </nav>
  );
};

export default Header;

const DesktopNavbar = ({ user, handleLogout }) => {
  return (
    <div className="hidden lg:flex gap-2 items-center">
      {user ? (
        <>
          <Button>
            <BriefcaseBusiness />
          </Button>
          <Button>
            <BellRing />
          </Button>
          <UserMenu user={user} handleLogout={handleLogout} />
        </>
      ) : (
        <>
          <Link to="/login">
            <Button variant="ghost" className="text-white">
              LOGIN
            </Button>
          </Link>
          <Link to="/signup">
            <Button variant="secondary">SIGN UP</Button>
          </Link>
        </>
      )}
    </div>
  );
};

const MobileNavbar = ({ user, handleLogout }) => {
  return (
    <div className="flex lg:hidden items-center gap-2">
      {user ? (
        <UserMenu user={user} handleLogout={handleLogout} />
      ) : (
        <>
          <Link to="/login">
            <Button variant="ghost" className="text-white text-xs h-8 p-2">
              LOGIN
            </Button>
          </Link>
          <Link to="/signup">
            <Button variant="secondary" className="text-black text-xs h-8 p-2">
              SIGN UP
            </Button>
          </Link>
        </>
      )}
    </div>
  );
};

const UserMenu = ({ user, handleLogout }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div>
          <Button>
            <AlignJustify />
          </Button>
        </div>
      </SheetTrigger>
      <SheetContent className="p-4 bg-gray-700 text-white w-3/4 sm:w-1/2 md:w-1/3 lg:w-1/4">
        <SheetHeader className="flex flex-col items-center border-b border-gray-700 pb-4 mb-4">
          <img
            src={user.avatar || userlogo}
            alt={`${user?.name || "User"}'s Avatar`}
            className="w-20 h-20 rounded-full mb-2"
          />
          <SheetTitle className="text-xl font-bold">
            {user.name || "User"}
          </SheetTitle>
        </SheetHeader>
        <div className="space-y-3 mb-4 font-semibold">
          <SheetTitle className="cursor-pointer hover:text-gray-300">
            Profile
          </SheetTitle>
          <SheetTitle className="cursor-pointer hover:text-gray-300">
            Projects
          </SheetTitle>
          <SheetTitle className="cursor-pointer hover:text-gray-300">
            Notification
          </SheetTitle>
          <SheetTitle className="cursor-pointer hover:text-gray-300">
            Settings
          </SheetTitle>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button
              onClick={handleLogout}
              className="w-full bg-[#11081D] hover:bg-[#130942a8] transition-colors"
            >
              Logout
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
