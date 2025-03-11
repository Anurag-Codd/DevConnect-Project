import { Routes, Route, Outlet, Navigate, useLocation } from "react-router"; // ✅ Correct import
import Layout from "@/pages/Layout";
import Home from "@/pages/Home";
import Dashboard from "./pages/Dashboard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setIsLoading, setUser } from "./store/features/user.slice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import axiosInstance from "./lib/axiosInstance";
import { Unplug } from "lucide-react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const RouteProtection = () => {
  const location = useLocation();
  const firebaseUser = auth.currentUser;
  const { isAuthorized } = useSelector((state) => state.user);

  if (!isAuthorized || !firebaseUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <Outlet />;
};

const GuestOnly = () => {
  const { isAuthorized } = useSelector((state) => state.user);
  if (isAuthorized) {
    return <Navigate to="/dashboard" replace />;
  }
  return <Outlet />;
};

const App = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(setIsLoading(true));
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const response = await axiosInstance.get("auth/status");
          dispatch(setUser(response.data));
        } catch (error) {
          console.error(error.message || "Something went wrong");
          dispatch(setUser(null));
        }
      } else {
        dispatch(setUser(null));
      }
      dispatch(setIsLoading(false));
    });
    return () => unsubscribe();
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <Unplug className="animate-pulse size-20" />
      </div>
    );
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route element={<GuestOnly />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route element={<RouteProtection />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
