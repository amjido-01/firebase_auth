import { useState } from "react";
import { useAuth } from "../Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, MailCheck, Loader2 } from "lucide-react";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const { loading, setLoading, resetpassword } = useAuth();
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    // Add your login logic here
    try {
      await resetpassword(email);
      setMsg("Check your email to reset password")
      setEmail("")
    } catch (error) {
        setError("Failed to reset password");
    }
    setLoading(false);
  };


  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 rounded-lg border-[1px] shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-primary mb-4">
          Reset Password
        </h2>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {msg && (
          <Alert className="border-[1px] border-green-200">
            <MailCheck className="h-4 w-4" />
            <AlertTitle className="text-green-500">Heads up!</AlertTitle>
            <AlertDescription className="text-green-500">
              {msg}
            </AlertDescription>
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
              placeholder="example@gmail.com"
              className="mt-2"
            />
          </div>

          <div className="mb-4">
            {loading ? (
              <Button size="lg" className="w-full mt-1" disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button type="submit" className="w-full mt-1">
                Reset
              </Button>
            )}
          </div>
          <div className="mb-4">
            <Button
              onClick={() => navigate("/login")}
              type="button"
              className="w-full mt-1"
            >
              Login
            </Button>
          </div>

          <div className="flex justify-end items-center">
            <p className="text-primary text-sm font-medium gap-0">
              {"Don't have an Account?"}
            </p>
            <Button
              type="button"
              className="px-1 text-black dark:text-white"
              onClick={() => navigate("/sign-up")}
              variant="link"
            >
              {" "}
              Sign Up
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
