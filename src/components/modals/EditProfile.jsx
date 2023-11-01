"use client"
import { Button } from "../ui/button";
import { useAuth } from "../../Auth/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircle } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useState } from "react";
import { useModal } from "../../hooks/use-modal-hook"


export const EditProfile = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [isOpen, setIsOpen] = useState(false)
  const { loading, setLoading, currentUser, updateemail, updatepassword } =
    useAuth();
  const navigate = useNavigate()
  const [error, setError] = useState("");

  const { isOpen, onClose, type } = useModal();

  const isModalOpen = isOpen && type === "updateProfileModal";

  // I just added this but in next js is not needed as the dialog's open props will handle the component display 
  if(!isModalOpen){
    return null
  }

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

    const promises = [];

    if (email) {
      promises.push(updateemail(email)); // Call the updateemail function
    }

    if (password) {
      promises.push(updatepassword(password)); // Call the updatepassword function
    }

    try {
      await Promise.all(promises);
    } catch (error) {
      console.error("Error updating profile:", error);
      setError(
        "An error occurred while updating the profile. Please try again."
      );
    }

    setLoading(false);
  };



  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={onClose}
    >
        <DialogContent className="w-[320px] sm:w-[400px] md:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              {
                "Make changes to your profile here. Click save when you're done."
              }
            </DialogDescription>
            <DialogDescription>
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="">
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

              <div className="">
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
              <div className="flex justify-end">
                <Button type="submit" className="">
                  Save changes
                </Button>
              </div>
            </div>
          </form>
          <DialogFooter>
            <div className="flex flex-col gap-4 w-full">
              <div className="flex justify-end items-center">
                <p className="text-primary text-sm font-medium gap-0">
                  Alrady have an Account?
                </p>
                <Button
                  type="button"
                  className="px-1 text-indigo-500"
                  onClick={onClose}
                  variant="link"
                >
                  {" "}
                  Cancel
                </Button>
              </div>
            </div>
          </DialogFooter>
        </DialogContent>
    </Dialog>
  );
};
