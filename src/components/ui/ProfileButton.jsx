import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "./dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
export const ProfileButton = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel >My Acount</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className=" cursor-pointer">profile</DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">profile</DropdownMenuItem>
        <DropdownMenuItem>profile</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
