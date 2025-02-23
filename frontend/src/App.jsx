import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route >
          <Route path="dashboard" element={<Dashboard />}>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
