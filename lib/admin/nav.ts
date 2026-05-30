import { 
  LayoutDashboard, 
  ShoppingBag, 
  Briefcase, 
  Tag, 
  Shield,
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
    title: "Careers",
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
    title: "Admins",
    href: "/admin/admins",
    icon: Shield,
    roles: ["SUPER_ADMIN"],
  },
];

