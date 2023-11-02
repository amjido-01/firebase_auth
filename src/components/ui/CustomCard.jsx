import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";
import {Separator} from "./separator"
import { Avatar, AvatarImage } from "@/components/ui/avatar";
export const CustomCard = () => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Avatar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div>
              {/* <p>This is your avatar.</p>
              <p>Click on the avatar to change it from your files.</p> */}
            </div>
            <div>
              <Avatar className="h-14 w-14 shrink-0 overflow-hidden rounded-full">

               
              </Avatar>
            </div>
          </div>
        </CardContent>
        <Separator className="my-4" />
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </div>
  );
}
