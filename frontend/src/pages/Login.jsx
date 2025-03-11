import { Link, useNavigate, useLocation } from "react-router";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowBigRight, LoaderCircle } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { login } from "@/store/features/user.slice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { error, isLoading, isAuthorized } = useSelector((state) => state.user);
  const [credential, setCredential] = useState({
    email: "",
    password: "",
  });

  const loginAction = async (e) => {
    e.preventDefault();
    await dispatch(login(credential));
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
          <h1 className="font-bold text-2xl text-center">LOGIN</h1>
          <p className="text-xs text-center px-4 text-wrap max-w-xs mx-auto text-gray-600">
            Welcome back developer to <b>DevConnect</b>, log in and connect with others.
          </p>
          <form className="mt-4" onSubmit={loginAction}>
            <div className="flex flex-col gap-4">
              <div className="space-y-2">
                <Label className="ps-2">Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={credential.email}
                  onChange={(e) => setCredential({ ...credential, email: e.target.value })}
                  placeholder="Enter your email"
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
                  required
                />
              </div>

              {isLoading ? (
                <Button disabled>
                  <LoaderCircle className="animate-spin" size={20} />
                </Button>
              ) : (
                <Button type="submit">Log In</Button>
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
            Don't have an account?
            <Link to="/signup" className="text-green-600 flex items-center hover:text-green-800 transition">
              <ArrowBigRight size={18} className="ml-1" />
              <p className="text-xs">SIGNUP</p>
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
