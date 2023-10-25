import { useAuth } from "../Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const { currentUser, signout } = useAuth();
  const navigate = useNavigate();
  console.log(currentUser);

  const handleSignOut = async () => {
    // setLoading(true)
    try {
      await signout();
      navigate("/");
      console.log("out");
      // Redirect or perform other actions after successful login
    } catch (error) {
      // Handle login error
      console.log(error);
    }
    // setLoading(false)
  };
  return (
    <div className="h-screen flex items-center justify-center">
      <div>
        <Card className="w-[380px]">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>
              {currentUser && currentUser.email}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter className="flex justify-end items-center">
            <Button className="w-full">Update Profile</Button>
          </CardFooter>
        </Card>
        <div className="flex justify-center mt-4 items-center">
          <Button onClick={handleSignOut} size="lg">
            Log Out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
