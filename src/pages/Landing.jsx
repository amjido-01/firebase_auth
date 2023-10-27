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
export const Landing = () => {
  const navigate = useNavigate()
  return (
    <div className="pt-20 h-screen flex items-center justify-center">
      <Card className="w-[380px]">
        <CardHeader>
          <CardTitle>My App</CardTitle>
          <CardDescription>It is simple and easy to us!</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => navigate("/login")}>Get Started</Button>
        </CardContent>
        <CardFooter>
          <p>Copyright &#169; 2023</p>
        </CardFooter>
      </Card>
    </div>
  );
};
