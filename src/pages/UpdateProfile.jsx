import { useState } from "react";
import { useAuth } from "../Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
// import { updateEmail, updatePassword } from "firebase/auth";

const UpdateProfile = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { loading, setLoading, currentUser, updateemail, updatepassword } = useAuth();
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

  const handleSubmit = async(e) => {
    setLoading(true);
    console.log(loading);
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Password and Confirm Password don't match.");
      return;
    }

    const promises = [];

    if (email) {
      promises.push(updateemail(email)); // Call the updateemail function
    }

    if (password) {
      promises.push(updatepassword(password)); // Call the updatepassword function
    }

    try {
        await Promise.all(promises);
        navigate("/dashboard");
      } catch (error) {
        console.error('Error updating profile:', error);
        setError('An error occurred while updating the profile. Please try again.');
      }
  
      setLoading(false);
};


  return (
    <div className="min-h-screen flex pt-20 items-center justify-center">
      <div className="p-8 border-[1px] rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-primary mb-4">Update Profile</h2>
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
              placeholder={currentUser.email}
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
              placeholder="Leave blank to keep the same"
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
              placeholder="Leave blank to keep the same"
              className="mt-2"
            />
          </div>
          <div className="mb-5">
            <Button type="submit" className="w-full mt-1">
             Update
            </Button>
          </div>
          <div className="flex justify-end items-center">
            <p className="text-primary text-sm font-medium gap-0">
              Alrady have an Account?
            </p>
            <Button
            type="button"
              className="px-1 text-indigo-500"
              onClick={() => navigate("/dashboard")}
              variant="link"
            >
              {" "}
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;

