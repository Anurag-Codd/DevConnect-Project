import { useEffect, useState } from "react";
import gsap from "gsap";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { AtSign, LockKeyhole } from "lucide-react";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    gsap.fromTo(
      "#login-form",
      { opacity: 0, x: 200 },
      { opacity: 1, x: 0, duration: 2, ease: "expo" }
    );
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  return (
    <section className="h-screen flex justify-end bg-gradient-to-b from-[#100223] via-[#230549] to-[#563d78]">
      <div className="flex w-1/2 justify-center items-center">
        <div
          id="login-form"
          className="w-2/4 p-8 text-center rounded-lg bg-gray-300 shadow-2xl"
        >
          <h1 className="pb-4 text-xl font-extrabold text-white">SIGN-IN</h1>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="relative text-left shadow-2xl mb-6">
              <AtSign
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700"
                size={20}
              />
              <Input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
                className="pl-10 pr-3 border-2"
              />
            </div>
            <div className="relative text-left shadow-2xl mb-1">
              <LockKeyhole
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700"
                size={20}
              />
              <Input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="pl-10 pr-3 border-2"
              />
            </div>
            <span className="mb-2 text-xs font-semibold text-purple-800 text-start px-2 ">
              error message
            </span>
            <div>
              <Button type="submit" className="mt-1 w-full">
                Login
              </Button>
              <span className="text-xs font-bold transition-all duration-300 transform hover:translate-x-1 hover:text-red-500 cursor-pointer">
                Forgot your password?
              </span>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
