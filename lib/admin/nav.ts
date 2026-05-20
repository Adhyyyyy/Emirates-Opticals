import { 
  LayoutDashboard, 
  ShoppingBag, 
  MapPin, 
  Calendar, 
  MessageSquare, 
  Briefcase, 
  Tag, 
  Grid,
  Shield,
  FolderOpen,
  LucideIcon
} from "lucide-react";
import { UserRole } from "@/lib/auth/rbac";

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  roles: UserRole[];
}

export const ADMIN_NAV_ITEMS: NavItem[] = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
    roles: ["SUPER_ADMIN", "BRANCH_ADMIN"],
  },
  {
    title: "Products",
    href: "/admin/products",
    icon: ShoppingBag,
    roles: ["SUPER_ADMIN", "BRANCH_ADMIN"],
  },
  {
    title: "Collections",
    href: "/admin/collections",
    icon: Grid,
    roles: ["SUPER_ADMIN", "BRANCH_ADMIN"],
  },
  {
    title: "Media Library",
    href: "/admin/media",
    icon: FolderOpen,
    roles: ["SUPER_ADMIN", "BRANCH_ADMIN"],
  },
  {
    title: "Jobs (Careers)",
    href: "/admin/jobs",
    icon: Briefcase,
    roles: ["SUPER_ADMIN", "BRANCH_ADMIN"],
  },
  {
    title: "Offers",
    href: "/admin/offers",
    icon: Tag,
    roles: ["SUPER_ADMIN", "BRANCH_ADMIN"],
  },
  {
    title: "Appointments",
    href: "/admin/appointments",
    icon: Calendar,
    roles: ["SUPER_ADMIN", "BRANCH_ADMIN"],
  },
  {
    title: "Enquiries",
    href: "/admin/enquiries",
    icon: MessageSquare,
    roles: ["SUPER_ADMIN", "BRANCH_ADMIN"],
  },
  {
    title: "Branches",
    href: "/admin/branches",
    icon: MapPin,
    roles: ["SUPER_ADMIN"],
  },
  {
    title: "Admins",
    href: "/admin/admins",
    icon: Shield,
    roles: ["SUPER_ADMIN"],
  },
];
