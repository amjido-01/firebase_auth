import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SignUp from "./pages/SignUp";
import { Landing } from "./pages/Landing";
import { AuthProvider } from "./Auth/AuthContext";
import { ProtectedRoutes } from "./ProtectedRoutes";
import UpdateProfile from "./pages/UpdateProfile";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          <Route path="/update-profile" element={<ProtectedRoutes />}>
            <Route path="/update-profile" element={<UpdateProfile />} />
          </Route>

          <Route exact path="/dashboard" element={<ProtectedRoutes />}>
            <Route exact path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
