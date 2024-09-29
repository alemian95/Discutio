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
                            <Link href={route("profile.edit")}>Profile</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive font-semibold">
                            <Link
                                href={route("logout")}
                                method="post"
                                as="button"
                            >
                                Logout
                            </Link>
                        </DropdownMenuItem>
                    </>
                ) : (
                    <>
                        <DropdownMenuItem>
                            <Link href={route("login")}>Login</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href={route("register")}>Register</Link>
                        </DropdownMenuItem>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
