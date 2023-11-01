import { LogOut, Pencil } from "lucide-react";
import {
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "./dropdown-menu";
import { useAuth } from "../../Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../hooks/use-modal-hook"
import { Button } from "./button";


export const Logout = () => {
    const {signout,currentUser} = useAuth();
    const navigate = useNavigate()

    const { onOpen } = useModal();

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
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <LogOut className="mr-2 h-4 w-4" />
        <span>Log out</span>
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          <DropdownMenuItem>
            <button
              className=" hover:no-underline cursor-auto text-black dark:text-white"
              onClick={handleSignOut}
            >
              {currentUser?.email}
            </button>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
              <Button onClick={() => onOpen("updateProfileModal")}>
                Update Profile
                <Pencil className="ml-auto"/>
              </Button>
          </DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
};
