import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "../components/ui/input";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "../Auth/AuthContext";
import { useState } from "react";
import { Button } from "../components/ui/button";

const CustomCard = ({
  title,
  content,
  footerContent,
  loading,
  currentUser,
}) => (
  <Card className={title === "Delete Account" ? "delete-border" : ""}>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      {title === "Avatar" && ( // Conditionally render the avatar for the "Avatar" card
        <div className="flex justify-between items-center">
          <div>
            <p>This is your avatar.</p>
            <p>Click on the avatar to change it from your files.</p>
          </div>
          <div>
            <Avatar className="h-14 w-14 shrink-0 overflow-hidden rounded-full">
              {loading ? (
                <span>loading..</span>
              ) : currentUser?.photoURL ? (
                <AvatarImage
                  className=""
                  src={currentUser?.photoURL}
                  alt="profile"
                />
              ) : (
                <AvatarImage
                  src={`https://ui-avatars.com/api/?name=${currentUser?.email
                    ?.split("@")[0]
                    ?.slice(0, 2)}`}
                  alt="profile"
                />
              )}
            </Avatar>
          </div>
        </div>
      )}
      {title !== "Avatar" && content}{" "}
      {/* Render content for non-"Avatar" cards */}
    </CardContent>
    <Separator />
    <CardFooter className={title === "Delete Account" ? "delete-bg" : ""}>
      {footerContent}
    </CardFooter>
  </Card>
);

export const AccountSet = () => {
  const { currentUser, loading } = useAuth();
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const cards = [
    {
      title: "Avatar",
      content: null,
      footerContent: "Card Footer 1",
    },
    {
      title: "Email",
      content: (
        <div className="flex flex-col">
          <div>
            <p>Please enter the new email address you want to change.</p>
          </div>
          <div className="">
            <Input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              required
              placeholder={currentUser?.email}
              className="mt-2 w-[90%] md:w-[45%]"
            />
          </div>
        </div>
      ),
      footerContent: (
        <div className="flex justify-end items-center w-full">
          <Button>Save</Button>
        </div>
      ),
    },
    {
      title: "Delete Account",
      content: (
        <div className="flex flex-col">
          <div>
            <p>
              Permanently remove your Personal Account and all of its contents
              from the this platform. This action is not reversible, so please
              continue with caution.
            </p>
          </div>
        </div>
      ),
      footerContent: (
        <div className="flex justify-end pt-4 items-center w-full">
          <Button variant="destructive">Delete</Button>
        </div>
      ),
    },
  ];

  return (
    <div className="pt-20 w-[90%] md:w-[75%] mx-auto flex flex-col gap-8">
      {cards.map((card, index) => (
        <CustomCard
          key={index}
          title={card.title}
          content={card.content}
          footerContent={card.footerContent}
          loading={loading}
          currentUser={currentUser}
        />
      ))}
    </div>
  );
};
