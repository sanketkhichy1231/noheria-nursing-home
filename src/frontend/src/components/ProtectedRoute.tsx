import { Navigate } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useAuth } from "../hooks/useAuth";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: "admin" | "doctor" | "staff";
}

export default function ProtectedRoute({
  children,
  requiredRole,
}: ProtectedRouteProps) {
  const { isAuthenticated, isInitializing, isAdmin, isDoctor, isStaff } =
    useAuth();

  // Show loading spinner while auth is initializing
  if (isInitializing) {
    return (
      <div
        className="flex items-center justify-center min-h-screen bg-background"
        data-ocid="protected-loading"
      >
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground text-sm">Verifying access...</p>
        </div>
      </div>
    );
  }

  // Not authenticated — redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Check role requirements
  if (requiredRole) {
    const hasRole =
      (requiredRole === "admin" && isAdmin) ||
      (requiredRole === "doctor" && isDoctor) ||
      (requiredRole === "staff" && isStaff);

    if (!hasRole) {
      // Redirect based on actual role
      if (isAdmin) return <Navigate to="/admin" />;
      if (isDoctor) return <Navigate to="/doctor" />;
      return <Navigate to="/" />;
    }
  }

  return <>{children}</>;
}
