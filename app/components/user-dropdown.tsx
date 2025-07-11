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
import SignOutButton from "./signout-btn";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import SettingsIcon from "@mui/icons-material/Settings";
import GitHubIcon from "@mui/icons-material/GitHub";
import SocialLinks from "@/lib/social-links";
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
          <div className="flex items-center space-x-3 m-0 rounded-xl">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.image || ""} alt={user.name} />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {user.name?.charAt(0) || "?"}
              </AvatarFallback>
            </Avatar>
            <div className="pr-2">
              <p className="text-sm font-semibold leading-tight">{user.name}</p>
              <p className="text-[10px] text-muted-foreground truncate max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
                {user.email}
              </p>
            </div>
          </div>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem className="group flex items-center gap-2 px-3 py-2 rounded-lg transition-colors hover:bg-primary/10 focus:bg-primary/20 active:bg-primary/30 cursor-pointer">
        <AccountBoxIcon
          fontSize="small"
          className="mr-2 text-primary transition-colors"
        />
        <span className="font-medium text-sm group-hover:text-primary">
          Profile
        </span>
      </DropdownMenuItem>
      <DropdownMenuItem className="group flex items-center gap-2 px-3 py-2 rounded-lg transition-colors hover:bg-primary/10 focus:bg-primary/20 active:bg-primary/30 cursor-pointer">
        <LocalLibraryIcon
          fontSize="small"
          className="mr-2 text-primary transition-colors"
        />
        <span className="font-medium text-sm group-hover:text-primary">
          My Learning
        </span>
      </DropdownMenuItem>
      <DropdownMenuItem className="group flex items-center gap-2 px-3 py-2 rounded-lg transition-colors hover:bg-primary/10 focus:bg-primary/20 active:bg-primary/30 cursor-pointer">
        <SettingsIcon
          fontSize="small"
          className="mr-2 text-primary transition-colors"
        />
        <span className="font-medium text-sm group-hover:text-primary">
          Settings
        </span>
      </DropdownMenuItem>
        <a href={SocialLinks.github} target="_blank" className="no-underline">
          <DropdownMenuItem className="group flex items-center gap-2 px-3 py-2 rounded-lg transition-colors hover:bg-primary/10 focus:bg-primary/20 active:bg-primary/30 cursor-pointer">
            <GitHubIcon
              fontSize="small"
              className="mr-2 text-primary transition-colors"
            />
            <span className="font-medium text-sm group-hover:text-primary">
              GitHub
            </span>
          </DropdownMenuItem>
        </a>
      <DropdownMenuSeparator />
      <DropdownMenuItem className="!bg-transparent hover:!bg-transparent focus:!bg-transparent active:!bg-transparent">
        <SignOutButton />
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

export default UserDropdown;
