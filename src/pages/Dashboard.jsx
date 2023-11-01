import { useAuth } from "../Auth/AuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EditProfile } from "../components/ui/EditProfile";


const Dashboard = () => {
  const { currentUser } = useAuth();
  console.log(currentUser);

  return (
    <div className="min-h-screen flex items-center justify-center px-8">
      <div>
        <Card className="w-[340px] sm:w-[370px] md:w-[380px]">
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
            <div className="w-full">
              <EditProfile className="w-full" />
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
