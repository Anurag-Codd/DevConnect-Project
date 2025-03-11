import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowBigRight, LoaderCircle } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "@/store/features/user.slice";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { error, isLoading, isAuthorized } = useSelector((state) => state.user);
  const [credential, setCredential] = useState({
    username: "",
    email: "",
    password: "",
  });

  const signupAction = async (e) => {
    e.preventDefault();
    const { email, password } = credential;

    const allowedProviders = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "icloud.com"];
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      console.log("Please enter a valid email address.");
      return;
    }

    const emailDomain = email.split("@")[1];
    if (!allowedProviders.includes(emailDomain)) {
      console.log("Please enter a valid email domain.");
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      console.log("Enter a valid password combination.");
      return;
    }

    try {
      await dispatch(signup(credential));
    } catch (error) {
      console.error(error.message || "Something went wrong.");
    }
  };

  useEffect(() => {
    if (isAuthorized) {
      const redirectPath = location.state?.from?.pathname || "/dashboard";
      navigate(redirectPath, { replace: true });
    }
  }, [isAuthorized, navigate, location]);

  return (
    <div className="h-screen bg-gradient-to-br from-[rgba(0,0,0,0.2)] to-[rgba(0,0,0,0.8)] flex justify-end">
      <div className="w-1/2 h-screen flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h1 className="font-bold text-2xl text-center">SIGNUP</h1>
          <p className="text-xs text-center px-4 text-wrap max-w-xs mx-auto text-gray-600">
            Create a new account on <b>DevConnect</b> and join the community of developers.
          </p>
          <form className="my-4" onSubmit={signupAction}>
            <div className="flex flex-col gap-4">
              <div className="space-y-2">
                <Label className="ps-2">Username</Label>
                <Input
                  type="text"
                  name="username"
                  value={credential.username}
                  onChange={(e) => setCredential({ ...credential, username: e.target.value })}
                  placeholder="Enter your username"
                  autoComplete="username"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="ps-2">Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={credential.email}
                  onChange={(e) => setCredential({ ...credential, email: e.target.value })}
                  placeholder="Enter your email"
                  autoComplete="email"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="ps-2">Password</Label>
                <Input
                  type="password"
                  name="password"
                  value={credential.password}
                  onChange={(e) => setCredential({ ...credential, password: e.target.value })}
                  placeholder="Enter your password"
                  autoComplete="new-password"
                  required
                />
              </div>
              {isLoading ? (
                <Button disabled>
                  <LoaderCircle className="animate-spin" size={20} />
                </Button>
              ) : (
                <Button type="submit">Sign Up</Button>
              )}
            </div>
            {error && (
              <p className="font-semibold text-red-500 text-xs ps-2 mt-2">
                {error}
              </p>
            )}
          </form>
          <hr className="my-4" />
          <span className="text-sm font-semibold flex items-center justify-center gap-1">
            Already have an account?
            <Link to="/login" className="text-green-600 flex items-center hover:text-green-800 transition">
              <ArrowBigRight size={18} className="ml-1" />
              <p className="text-xs">LOGIN</p>
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
