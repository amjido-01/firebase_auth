import { useAuth } from "../Auth/AuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


const Dashboard = () => {
  const { currentUser } = useAuth();
  console.log(currentUser);

  return (
    <div className="min-h-screen mx-auto px-8 flex items-center justify-center">
        <div className="px-">
          <Card className="w-[330px] md:w-[380px]">
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>
                {currentUser && currentUser.email}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter className="">
            </CardFooter>
          </Card>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
