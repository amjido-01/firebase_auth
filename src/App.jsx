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
import { Header } from "./components/ui/Header";
import {ThemeProvider } from "./components/ui/theme-provider"
import {About} from "./pages/About"

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AuthProvider>
          <div className="h-screen">
            <Header />
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/about-us" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/reset-password" element={<ResetPassword />} />

              <Route path="/update-profile" element={<ProtectedRoutes />}>
                <Route path="/update-profile" element={<UpdateProfile />} />
              </Route>

              <Route exact path="/dashboard" element={<ProtectedRoutes />}>
                <Route exact path="/dashboard" element={<Dashboard />} />
              </Route>
            </Routes>
          </div>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
