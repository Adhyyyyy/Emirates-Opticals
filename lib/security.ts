/**
 * ENTERPRISE SECURITY UTILITIES
 * Hardening logic for the Emirates Optician Platform
 */

/**
 * UTILITY: sanitizeString
 * Prevents XSS and malicious script injections in user-provided text
 */
export function sanitizeString(str: string): string {
  if (!str) return "";
  return str
    .replace(/[<>]/g, "") // Remove basic tags
    .trim();
}

/**
 * UTILITY: validateSessionRole
 * Enforces strict server-side role validation for actions
 */
export function validateSessionRole(user: any, requiredRole: string | string[]) {
  if (!user) throw new Error("Authentication Required");
  
  const userRole = user.app_metadata?.role;
  const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];

  if (!roles.includes(userRole)) {
    throw new Error(`Access Protocol Denied: Requires ${roles.join(" or ")}`);
  }
  
  return true;
}

/**
 * UTILITY: enforceBranchIsolation
 * Prevents data leakage between branches
 */
export function enforceBranchIsolation(user: any, requestedBranchId?: string) {
  const userRole = user.app_metadata?.role;
  const userBranchId = user.app_metadata?.branchId;

  if (userRole === "SUPER_ADMIN") return requestedBranchId;
  
  // For Branch Admins, always return their assigned branch ID regardless of request
  return userBranchId;
}
