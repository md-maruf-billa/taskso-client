import NavBar from "@/components/nav-bar";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="bg-[#fafafa]">
            <NavBar />
            {children}
        </div>
    );
}
