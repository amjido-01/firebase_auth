import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "../Auth/AuthContext";

export const Landing = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate()
    const value = currentUser ? "Explore more!" : "Get Started!";
    const path = currentUser ? "/about-us" : "login";
  console.log(currentUser,"from home");
  return (
    <div className="pt-20 h-screen flex items-center justify-center">
      <Card className="w-[380px]">
        <CardHeader>
          <CardTitle>My App</CardTitle>
          <CardDescription>It is simple and easy to us!</CardDescription>
        </CardHeader>

        <CardContent>
        
            <Button onClick={() => navigate(path)}>{value}</Button>
          
        </CardContent>

        <CardFooter>
          <p>Copyright &#169; 2023</p>
        </CardFooter>
      </Card>
    </div>
  );
};
