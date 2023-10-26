import { useState } from "react";
import { useAuth } from "../Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { useFormik } from "formik";
import * as Yup from "yup";

const Login = () => {
  const [error, setError] = useState("");
  const { login, loading, setLoading, signinwithgoogle } = useAuth();
  const navigate = useNavigate();

  const handleFormSubmit = async (values) => {
    setLoading(true);
    console.log(loading);
    // Add your login logic here
    try {
      await login(values.email, values.password);
      // Redirect or perform other actions after successful login
      navigate("/dashboard");
      console.log("hi from login page");
    } catch (error) {
      // Handle login error
      if (error.code === "auth/invalid-login-credentials") {
        setError("Invalid email or password");
      } else {
        setError("An error occurred, try again!");
      }
    }
    setLoading(false);
    console.log(loading);
  };

  const handleGoogleSignIn = async () => {
    try {
      const user = await signinwithgoogle();
      // Handle successful sign-in, and possibly navigate or update state.
      console.log("Google Sign-In Success:", user);
      navigate("/dashboard");
    } catch (error) {
      // Handle errors from the signinwithgoogle function
      console.error("Google Sign-In Error:", error);
      // Update state or show an error message to the user.
      setError("An error occurred during Google Sign-In. try again.");
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .matches(
          /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          "Invalid email address"
        )
        .required("required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("required"),
    }),
    onSubmit: handleFormSubmit,
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-primary mb-4">Login</h2>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <Label htmlFor="email">Email</Label>

            <Input
              type="email"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="example@gmail.com"
              className="mt-2"
            />
            {formik.touched.email && formik.errors.email ? (
              <span className="text-red-400 text-xs ml-3">
                {formik.errors.email}
              </span>
            ) : null}
          </div>
          <div className="mb-4">
            <Label htmlFor="password">Password</Label>

            <Input
              type="password"
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="*********"
              className="mt-2"
            />
            {formik.touched.password && formik.errors.password ? (
              <span className="text-red-400 text-xs ml-3">
                {formik.errors.password}
              </span>
            ) : null}
          </div>
          <div className="flex items-center justify-end">
            <Button
              type="button"
              className=" text-indigo-500 text-sm font-medium"
              onClick={() => navigate("/reset-password")}
              variant="link"
            >
              {" "}
              Forgot Password?
            </Button>
          </div>
          <div className="mb-4">
            <Button size="lg" type="submit" className="w-full mt-1">
              Log In
            </Button>
          </div>

          <div className="flex justify-end items-center">
            <p className="text-primary text-sm font-medium gap-0">
              Don't have an Account?
            </p>
            <Button
              type="button"
              className="px-1 text-indigo-500"
              onClick={() => navigate("/sign-up")}
              variant="link"
            >
              {" "}
              Sign Up
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
          <Button
            onClick={handleGoogleSignIn}
            className="w-full text-indigo-500"
            size="lg"
            variant="outline"
          >
            <FcGoogle className="mr-2 h-4 w-4" /> Login with Google
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
