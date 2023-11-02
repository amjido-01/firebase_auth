import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SignUp from "./pages/SignUp";
import { Landing } from "./pages/Landing";
import { AuthProvider } from "./Auth/AuthContext";
import { ProtectedRoutes } from "./ProtectedRoutes";
import ResetPassword from "./pages/ResetPassword";
import { Header } from "./components/ui/Header";
import { ThemeProvider } from "./components/ui/theme-provider";
import { About } from "./pages/About";
import { ModalProvider } from "./components/providers/modal-provider";
import { Profile } from "./pages/Profile";
import { AccountSet } from "./pages/AccountSet";
import { SignOut } from "./pages/SignOut";
import Footer from "./components/ui/Footer";

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
              <Route path="/profile" element={<Profile />} />
              <Route path="/account" element={<AccountSet />} />
              <Route path="/logout" element={<SignOut />} />
              <Route path="/reset-password" element={<ResetPassword />} />

              <Route exact path="/dashboard" element={<ProtectedRoutes />}>
                <Route exact path="/dashboard" element={<Dashboard />} />
              </Route>
            </Routes>
            {/* <Footer /> */}
          </div>
          <ModalProvider />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
