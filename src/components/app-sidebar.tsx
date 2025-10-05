import {
    PenSquare,
    Briefcase,
    User,
    Github,
    Linkedin,
    Youtube,
    ChevronDown,
    Home,
    Brain,
} from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarFooter,
    SidebarMenuSub,
    SidebarMenuSubItem,
} from "@/src/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible"

const socialLinks = [
    { title: "GitHub", url: "https://github.com/arafat20mupi", icon: Github },
    { title: "LinkedIn", url: "https://www.linkedin.com/in/arafatislam03", icon: Linkedin },
    { title: "YouTube", url: "https://www.youtube.com/@learnwitharafatislam", icon: Youtube },
]

const sections = [
    {
        title: "Projects",
        icon: Briefcase,
        items: [
            { title: "All Projects", url: "/dashboard/projects/all-projects", icon: Briefcase },
            { title: "Add New Project", url: "/dashboard/projects/add-project", icon: PenSquare },
        ],
    },
    {
        title: "Blogs",
        icon: User,
        items: [
            { title: "All Blogs", url: "/dashboard/blogs/all-blogs", icon: Briefcase },
            { title: "Add New Blog", url: "/dashboard/blogs/add-blog", icon: PenSquare },
        ],
    },
    {
        title: "About Me",
        icon: User,
        items: [
            { title: "Profile", url: "/dashboard/about/profile", icon: User },
            { title: "Settings", url: "/dashboard/about/settings", icon: User },
        ],
    },
    {
        title: "Skill",
        icon: Brain,
        items: [
            { title: "All Skills", url: "/dashboard/skills/all-skills", icon: Briefcase },
            { title: "Add New Skill", url: "/dashboard/skills/add-skill", icon: PenSquare },
        ],
    }
]

export function AppSidebar() {
    return (
        <Sidebar className="bg-white w-64 border-r shadow-sm">
            {/* Logo & Back Button */}
            <SidebarHeader className="flex flex-col items-center py-4 border-b">
                <h2 className="text-lg font-bold">Arafat Islam</h2>
                <SidebarMenu className="w-full mt-3">
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <a
                                href="/"
                                className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 transition"
                            >
                                <Home className="h-4 w-4" />
                                <span>Back Home</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            {/* Content Sections */}
            <SidebarContent className="px-2">
                <SidebarGroup>
                    <SidebarGroupLabel className="text-xs uppercase tracking-wide text-gray-500">
                        Dashboard
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {sections.map((section) => (
                                <Collapsible key={section.title} defaultOpen={false}>
                                    <SidebarMenuItem>
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuButton className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 transition">
                                                <section.icon className="h-4 w-4" />
                                                <span>{section.title}</span>
                                                <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                                            </SidebarMenuButton>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent>
                                            <SidebarMenuSub>
                                                {section.items.map((item) => (
                                                    <SidebarMenuSubItem key={item.title}>
                                                        <SidebarMenuButton asChild>
                                                            <a
                                                                href={item.url}
                                                                className="flex items-center gap-2 pl-8 py-1.5 rounded-md hover:bg-gray-50 transition"
                                                            >
                                                                <item.icon className="h-4 w-4 text-gray-600" />
                                                                <span>{item.title}</span>
                                                            </a>
                                                        </SidebarMenuButton>
                                                    </SidebarMenuSubItem>
                                                ))}
                                            </SidebarMenuSub>
                                        </CollapsibleContent>
                                    </SidebarMenuItem>
                                </Collapsible>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            {/* Footer / Social Links */}
            <SidebarFooter className="border-t py-4">
                <SidebarGroup>
                    <SidebarGroupLabel className="text-xs uppercase tracking-wide text-gray-500">
                        Connect
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {socialLinks.map((link) => (
                                <SidebarMenuItem key={link.title}>
                                    <SidebarMenuButton asChild>
                                        <a
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 transition"
                                        >
                                            <link.icon className="h-4 w-4" />
                                            <span>{link.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarFooter>
        </Sidebar>
    )
}
