import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRef, useState } from "react";
import { Link } from "react-router";
import hero from "@/assets/hero.png";

export default function Home() {
  const [active, setActive] = useState(false);
  const [email, setEmail] = useState("");
  const inputRef = useRef(null);

  return (
    <>
      <section className="relative min-h-screen">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${hero})` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.5)] to-[rgb(0,0,0)] z-10"></div>
        <div className="relative z-20 container min-h-screen mx-auto flex flex-col gap-4 items-center justify-center px-4 md:px-10">
          <h1 className="text-lg md:text-5xl font-bold text-white text-center">
            Welcome to DevConnect – where developers connect, share ideas, and
            build together.
          </h1>
          <p className="text-white text-sm p-2 md:p-4 text-center">
            Join the community and grow with us
          </p>
          <div className="flex items-center bg-accent rounded-full gap-2 p-1 mx-auto w-full md:w-96 lg:w-1/2">
            <div
              className="relative flex items-center border-2 border-white rounded-full px-3 w-full lg:h-12 h-10 transition-all duration-200"
              onClick={() => inputRef.current?.focus()}
            >
              <Label
                htmlFor="email"
                className={`absolute left-3 text-black transition-all duration-200 ${
                  active || inputRef.current?.value
                    ? "top-1 text-xs"
                    : "top-1/2 transform -translate-y-1/2 text-sm lg:text-lg"
                }`}
              >
                Enter your Email
              </Label>
              <input
                id="email"
                ref={inputRef}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-black text-xs lg:text-md pt-4 placeholder-transparent"
                onFocus={() => setActive(true)}
                onBlur={() => setActive(!!inputRef.current?.value?.length)}
                autoComplete="off"
                aria-label="Enter your Email"
              />
            </div>
            <Link to={`/signup/${email}`}>
              <Button className="lg:h-12 rounded-full h-10">
                <span className="animate-pulse text-sm hidden md:block">
                  Click to Join
                </span>
                <span className="animate-pulse text-sm md:hidden">Join Us</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-black min-h-screen">
        <div className="container mx-auto"></div>
      </section>
    </>
  );
}
