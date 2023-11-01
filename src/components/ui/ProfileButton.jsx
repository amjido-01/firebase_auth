import { Logout } from "./Logout";
import { Avatar, AvatarImage } from "./avatar";
import { useAuth } from "../../Auth/AuthContext";
import { CreditCard, Keyboard, LifeBuoy, Settings, User, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { useNavigate } from "react-router-dom";
export function ProfileButton() {
  const { currentUser, loading } = useAuth();
  const navigate = useNavigate();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          {loading ? (
            <span>laoding..</span>
          ) : currentUser?.photoURL ? (
            <AvatarImage className="" src={currentUser?.photoURL} alt="profile" />
          ) : (
            <AvatarImage
              src={`https://ui-avatars.com/api/?name=${currentUser?.email
                ?.split("@")[0]
                ?.slice(0, 2)}`}
              alt="profile"
            />
          )}
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <span className="text-xs ">{currentUser?.email}</span>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => navigate("/profile")}>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate("/dashboard")}>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
            <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate("account")}>
            {/* <AccountSet /> */}
            <Settings className="mr-2 h-4 w-4" />
            <span>Setting</span>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Keyboard className="mr-2 h-4 w-4" />
            <span>Keyboard shortcuts</span>
            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LifeBuoy className="mr-2 h-4 w-4" />
          <span>Support</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {/* <Logout /> */}
        <DropdownMenuItem onClick={() => navigate("/logout")}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
