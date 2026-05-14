/**
 * ENTERPRISE RBAC CONFIGURATION
 * Defines the relationship between roles and protected route domains
 */

export type UserRole = "SUPER_ADMIN" | "BRANCH_ADMIN" | "CUSTOMER" | "STAFF";

export interface PermissionConfig {
  allowedRoutes: string[];
  restrictedActions: string[];
}

export const RBAC_CONFIG: Record<UserRole, PermissionConfig> = {
  SUPER_ADMIN: {
    allowedRoutes: ["/admin", "/dashboard", "/inventory", "/cms", "/appointments", "/products/manage"],
    restrictedActions: [],
  },
  BRANCH_ADMIN: {
    allowedRoutes: ["/admin"],
    restrictedActions: ["/admin/branches", "/admin/users"], // Cannot manage other branches or users
  },
  STAFF: {
    allowedRoutes: ["/admin/appointments"],
    restrictedActions: ["/admin/inventory", "/admin/cms"],
  },
  CUSTOMER: {
    allowedRoutes: ["/account"],
    restrictedActions: ["/admin"],
  },
};

/**
 * UTILITY: checkPermission
 * Scalable checker for role-based route access
 */
export function canAccessRoute(role: UserRole, pathname: string): boolean {
  const config = RBAC_CONFIG[role];
  if (!config) return false;

  // Check if the role is explicitly allowed to access the domain
  const isAllowed = config.allowedRoutes.some(route => pathname.startsWith(route));
  
  // Double check against restrictions
  const isRestricted = config.restrictedActions.some(route => pathname.startsWith(route));

  return isAllowed && !isRestricted;
}

/**
 * UTILITY: isBranchAdminOf
 * Ensures a Branch Admin is isolated to their specific branch data
 */
export function isBranchAdminOf(userBranchId: string | undefined, targetBranchId: string): boolean {
  if (!userBranchId) return false;
  return userBranchId === targetBranchId;
}
