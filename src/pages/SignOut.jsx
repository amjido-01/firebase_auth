import { useAuth } from "../Auth/AuthContext";
import { Button } from "../components/ui/button";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {Loader2} from "lucide-react"
import { useNavigate } from "react-router-dom";
export const SignOut = () => {
  const { signout, setLoading, loading } = useAuth();
  const navigate = useNavigate()

const handleSignOut = async () => {
  setLoading(true);
  try {
    // Wait for 3 seconds (3000 milliseconds) before signing out
    setTimeout(async () => {
      await signout();
      navigate("/");
      console.log("Logged out");
      // Redirect or perform other actions after successful logout
    }, 3000);
  } catch (error) {
    // Handle logout error
    console.log(error);
  }
};

  return (
    <div className="min-h-screen mx-auto px-8 flex items-center justify-center">
      <div className="px-">
        <Card className="w-[330px] md:w-[350px]">
          <CardHeader>
            <CardTitle className="text-center leading-normal">
              Are you sure you want to sign out?
            </CardTitle>
          </CardHeader>

          <CardFooter className="mt-4">
            <div className="flex justify-center w-full items-center">
              {loading ? (
                <Button size="lg" className="w-full mt-1" disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging Out...
                </Button>
              ) : (
                <Button size="lg" onClick={handleSignOut} className="w-full">
                  Log Out
                </Button>
              )}
              {/* <Button onClick={handleSignOut} className="w-full">Log Out</Button> */}
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
