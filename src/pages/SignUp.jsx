import { useState } from "react";
import { useAuth } from "../Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { useFormik } from "formik";
import * as Yup from "yup";

const SignUp = () => {
  const { signup, loading, setLoading, signinwithgoogle } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleFormSubmit = async (values) => {
    setLoading(true);
    console.log(loading);
    if (values.password !== values.confirmPassword) {
      setError("Password and Confirm Password don't match.");
      return;
    }

    try {
      await signup(values.email, values.password);
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
      } else if (error.code === "auth/weak-password") {
        setError("Password should be at least 6");
      } else {
        setError("An error occurred. Please try again later.");
        console.log(error);
      }
    } finally {
      setLoading(false); // Set loading to false after login attempt
      console.log(loading); // Check the value of loading
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const user = await signinwithgoogle();
      // Handle successful sign-in, and possibly navigate or update state.
      console.log("Google Sign-In Success:", user);
      navigate("/dashboard");
    } catch (error) {
      // Handle errors from the signinwithgoogle function
      // console.error('Google Sign-In Error:', error);
      // Update state or show an error message to the user.
      setError("An error occurred during Google Sign-In. try again.");
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
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
      confirmPassword: Yup.string().required("required"),
    }),
    onSubmit: handleFormSubmit,
  });
  return (
    <div className="min-h-screen flex items-center pt-[4.2rem] justify-center">
      <div className="p-8 rounded-lg border-[1px]  shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-primary mb-4">Sign Up</h2>
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
              <p className="text-red-400 h-4 pt-1 italic text-[12px]">
                {formik.errors.email}
              </p>
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
              className="mt-2"
              placeholder="*********"
            />
            {formik.touched.password && formik.errors.password ? (
              <p className="text-red-400 h-4 pt-1 italic text-[12px]">
                {formik.errors.password}
              </p>
            ) : null}
          </div>
          <div className="mb-4">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="*********"
              className="mt-2"
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <p className="text-red-400 h-4 pt-1 italic text-[12px]">
                {formik.errors.confirmPassword}
              </p>
            ) : null}
          </div>
          <div className="mb-5">
            {loading ? (
              <Button size="lg" className="w-full mt-1" disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sign Up
              </Button>
            ) : (
              <Button size="lg" type="submit" className="w-full mt-1">
                Sign Up
              </Button>
            )}
          </div>
          <div className="flex justify-end items-center">
            <p className="text-primary text-sm font-medium gap-0">
              Alrady have an Account?
            </p>
            <Button
              type="button"
              className="px-1 text-black dark:text-white"
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
          <Button
            onClick={handleGoogleSignUp}
            className="w-full text-black dark:text-white"
            size="lg"
            variant="outline"
          >
            <FcGoogle className="mr-2 h-4 w-4" /> Sign Up with Google
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
