import { 
  LayoutDashboard, 
  ShoppingBag, 
  Warehouse, 
  MapPin, 
  Calendar, 
  MessageSquare, 
  FileText, 
  Briefcase, 
  Users, 
  BarChart3, 
  Settings,
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
    title: "Inventory",
    href: "/admin/inventory",
    icon: Warehouse,
    roles: ["SUPER_ADMIN", "BRANCH_ADMIN"],
  },
  {
    title: "Branches",
    href: "/admin/branches",
    icon: MapPin,
    roles: ["SUPER_ADMIN"],
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
];
