import { Avatar, AvatarFallback } from "@/Components/Themes/default/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/Components/Themes/default/ui/dropdown-menu";
import { User } from "@/types";
import { Link } from "@inertiajs/react";
import { UserIcon } from "lucide-react";

export function UserMenu({ user } : { user : User | null | undefined }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    {/* <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" /> */}
                    <AvatarFallback>
                        {user ? (
                            user.email.charAt(0).toUpperCase()
                        ) : (
                            <UserIcon />
                        )}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="border-none">
                {user ? (
                    <>
                        <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Link className="w-full" href={route("profile.edit")}><span>Profile</span></Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive font-semibold">
                            <Link
                                href={route("logout")}
                                method="post"
                                className="w-full"
                            >
                                <span>Logout</span>
                            </Link>
                        </DropdownMenuItem>
                    </>
                ) : (
                    <>
                        <DropdownMenuItem>
                            <Link className="w-full" href={route("login")}><span>Login</span></Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link className="w-full" href={route("register")}><span>Register</span></Link>
                        </DropdownMenuItem>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
