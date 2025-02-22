import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRef, useState } from "react";

const Hero = () => {
    const [active, setActive] = useState(false);
  const inputRef = useRef(null);
  return (
    <>
    <section className="h-screen flex justify-center items-center flex-col gap-6 bg-gradient-to-b from-[#100223] via-[#230549] to-[#563d78]">
        <div className="flex gap-4 flex-col items-center p-4 text-center px-44">
          <h1 className="text-5xl font-bold text-white">
            Welcome to DevConnect – where developers connect, share ideas, and
            build together.
          </h1>
          <p className="text-white">Join the community and grow with us</p>
        </div>
        <div className="flex items-center text-center bg-accent rounded-md p-1 gap-2">
          <div
            className="relative flex items-center border-2 rounded-md "
            onClick={() => {
              setActive(true);
              inputRef.current?.focus();
            }}
            onBlur={() => setActive(false)}
          >
            <Label
              className={`absolute px-3 transition-all duration-200 ${
                active ? "top-0 text-xs" : "top-1/2 transform -translate-y-1/2"
              }`}
            >
              Enter your Email
            </Label>
            <span className="w-sm pt-4">
              <Input className="h-7" ref={inputRef} />
            </span>
          </div>
          <Button className="h-12">Click to join</Button>
        </div>
      </section></>
  )
}

export default Hero