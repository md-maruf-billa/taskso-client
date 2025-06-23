"use client"

import { ClipboardList, LoaderPinwheel, LogOut } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { log_out_user } from "@/server_actions/auth"
import { toast } from "sonner"

export default function NavBar() {
    const path = usePathname()
    const router = useRouter()
    const handle_logOut = async () => {
        const res = await log_out_user()
        if (res) {
            toast.success("Logout successful.")
            router.push("/")
        } else {
            toast.error("Something went wrong!!")
        }
    }
    return (
        <div
            className="h-[306px] bg-no-repeat bg-cover"
            style={{ backgroundImage: "url('/dashboard-banner.png')" }}
        >
            <div className="container mx-auto px-2 lg:px-0">
                <nav className="flex justify-between items-center py-4">
                    {/* nav start */}
                    <Link href={"/dashboard"} className="flex items-center gap-2">
                        <Image
                            src="/logo.png"
                            width={32}
                            height={32}
                            alt="Tasko logo"
                            className="size-8"
                        />
                        <h1 className="text-2xl font-bold text-white">Tasko</h1>
                    </Link>

                    {/* nav middle */}
                    <div className="flex gap-6 text-white items-center">
                        <Link
                            href="/dashboard"
                            className={`flex items-center gap-1 transition-colors ${path == "/dashboard" ? "text-primary" : "text-white"
                                }`}
                        >
                            <ClipboardList size={20} />
                            Task List
                        </Link>
                        <Link
                            href="/dashboard/spin"
                            className={`flex items-center gap-1 transition-colors ${path.includes("/spin") ? "text-primary" : "text-white"
                                }`}
                        >
                            <LoaderPinwheel size={20} />
                            Spin
                        </Link>
                    </div>

                    {/* nav end */}
                    <div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                {/* <DropdownMenuItem><SquarePen /> Edit Profile</DropdownMenuItem>
                                <DropdownMenuItem><Settings /> Setting</DropdownMenuItem> */}
                                <DropdownMenuItem onClick={handle_logOut} className="bg-red-300"><LogOut /> Logout</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </nav>
            </div>
        </div>
    )
}
