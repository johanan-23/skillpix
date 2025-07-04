import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, BookOpen, Settings, Github } from "lucide-react";
import SignOutButton from "./signout-btn";

interface UserDropdownProps {
  user: {
    name?: string;
    email?: string;
    image?: string;
  };
}

const UserDropdown: React.FC<UserDropdownProps> = ({ user }) => (
  <DropdownMenu modal={false}>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" className="relative h-8 w-8 rounded-full">
        <Avatar className="size-9 border-[2px] border-primary cursor-pointer overflow-hidden flex items-center justify-center">
          <AvatarImage
            src={user.image || ""}
            alt={user.name || "User Avatar"}
            className="object-cover"
          />
          <AvatarFallback className="flex items-center justify-center">
            {user.name?.charAt(0) || "?"}
          </AvatarFallback>
        </Avatar>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56" align="end" forceMount>
      <DropdownMenuLabel className="font-normal">
        <div className="space-y-4">
          <div className="flex items-center space-x-3 p-0 rounded-xl">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.image || ""} alt={user.name} />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {user.name?.charAt(0) || "?"}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-semibold leading-tight">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
          </div>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <User className="mr-2 h-4 w-4" />
        <span>Profile</span>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <BookOpen className="mr-2 h-4 w-4" />
        <span>My Learning</span>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Settings className="mr-2 h-4 w-4" />
        <span>Settings</span>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Github className="mr-2 h-4 w-4" />
        <span>GitHub</span>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem className="!bg-transparent hover:!bg-transparent focus:!bg-transparent active:!bg-transparent">
        <SignOutButton />
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

export default UserDropdown;
