import { useNavigate } from "@tanstack/react-router";
import { Heart, Lock, ShieldCheck, Stethoscope } from "lucide-react";
import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "Secure Identity",
    desc: "Login with Internet Identity — no passwords, no data leaks.",
  },
  {
    icon: Stethoscope,
    title: "Doctor Access",
    desc: "Doctors can view and manage their appointments after login.",
  },
  {
    icon: Lock,
    title: "Admin Control",
    desc: "Admins get full access to manage the hospital system.",
  },
];

export default function LoginPage() {
  const {
    isAuthenticated,
    isAdmin,
    isDoctor,
    login,
    isLoggingIn,
    isInitializing,
  } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      if (isAdmin) navigate({ to: "/admin" });
      else if (isDoctor) navigate({ to: "/doctor" });
      else navigate({ to: "/" });
    }
  }, [isAuthenticated, isAdmin, isDoctor, navigate]);

  return (
    <div
      className="min-h-screen bg-background flex items-center justify-center px-4 py-12"
      data-ocid="login-page"
    >
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 bg-accent rounded-xl flex items-center justify-center mb-4 shadow-lg">
            <Heart className="w-7 h-7 text-accent-foreground" />
          </div>
          <h1 className="font-display font-bold text-2xl text-foreground text-center">
            Noheria Nursing Home
          </h1>
          <p className="text-muted-foreground text-sm mt-1 text-center">
            Staff & Doctor Portal — Panchkula
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-card border border-border rounded-xl p-8 shadow-lg">
          <h2 className="font-display font-semibold text-lg text-foreground mb-2">
            Sign In to Continue
          </h2>
          <p className="text-muted-foreground text-sm mb-6">
            Use Internet Identity for secure, passwordless login. Your role
            (Admin or Doctor) determines your access level.
          </p>

          <button
            type="button"
            onClick={login}
            disabled={isLoggingIn || isInitializing}
            className="w-full flex items-center justify-center gap-3 px-5 py-3 bg-accent text-accent-foreground rounded-lg font-semibold text-sm hover:bg-accent/90 disabled:opacity-60 disabled:cursor-not-allowed transition-smooth"
            data-ocid="internet-identity-login-btn"
          >
            {isLoggingIn ? (
              <>
                <div className="w-4 h-4 border-2 border-accent-foreground border-t-transparent rounded-full animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                Login with Internet Identity
              </>
            )}
          </button>

          {/* Features */}
          <div className="mt-8 space-y-4">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0 mt-0.5">
                  <Icon className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <p className="text-foreground text-sm font-medium">{title}</p>
                  <p className="text-muted-foreground text-xs mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Back link */}
        <p className="text-center mt-6 text-muted-foreground text-sm">
          Not a staff member?{" "}
          <a href="/" className="text-accent hover:underline font-medium">
            Return to Home
          </a>
        </p>
      </div>
    </div>
  );
}
