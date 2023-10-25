import { useState } from "react";
import { useAuth } from "../Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import {FcGoogle} from "react-icons/fc"

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { signup, loading, setLoading, signinwithgoogle } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  // const [loadingState, setLaodingState] = useState(false)
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    console.log(loading);
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Password and Confirm Password don't match.");
      return;
    }

    try {
      await signup(email, password);
      console.log("created");
      navigate("/dashboard");
      // Redirect or perform other actions after successful login
    } catch (error) {
      // Handle login error
      if (error.code === "auth/email-already-in-use") {
        // Updated error code
        setError(
          "Email address is already in use. Please use a different email."
        );
        console.log(error.code, "Email already in use");
      } else {
        setError("An error occurred. Please try again later.");
      }
    }
    setLoading(false);
    console.log(loading);
  };

  const handleGoogleSignUp = async() => {
    try {
      const user = await signinwithgoogle();
    // Handle successful sign-in, and possibly navigate or update state.
    console.log('Google Sign-In Success:', user);
    navigate('/dashboard');
    } catch (error) {
      // Handle errors from the signinwithgoogle function
    // console.error('Google Sign-In Error:', error);
    // Update state or show an error message to the user.
    setError('An error occurred during Google Sign-In. try again.');
      
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-primary mb-4">Sign Up</h2>
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              required
              className="mt-2"
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              required
              className="mt-2"
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
              className="mt-2"
            />
          </div>
          <div className="mb-5">
            <Button type="submit" className="w-full mt-1">
              Sign Up
            </Button>
          </div>
          <div className="flex justify-end items-center">
            <p className="text-primary text-sm font-medium gap-0">
              Alrady have an Account?
            </p>
            <Button
            type="button"
              className="px-1 text-[#e11d48]"
              onClick={() => navigate("/login")}
              variant="link"
            >
              {" "}
              Sign In
            </Button>
          </div>
        </form>
        <div className="flex gap-3 justify-center items-center my-4">
          <span className="w-[45%] border-b border-primary"></span>

          <span className="text-center text-sm font-medium text-primary lowercase">
            Or
          </span>

          <span className="w-[45%] border-b border-primary"></span>
        </div>

        <div className="">
        <Button onClick={handleGoogleSignUp} className="w-full" size="lg" variant="outline">
          <FcGoogle className="mr-2 h-4 w-4" /> Login with Google
        </Button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
