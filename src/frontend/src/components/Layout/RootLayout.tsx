import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Heart, Mail, MapPin, Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "Doctors", href: "/#doctors" },
  { label: "Blog", href: "/#blog" },
  { label: "Contact", href: "/#contact" },
];

export default function RootLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated, isAdmin, isDoctor, login } = useAuth();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const dashboardHref = isAdmin ? "/admin" : isDoctor ? "/doctor" : "/login";

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header
        className="sticky top-0 z-50 bg-card border-b border-border shadow-md"
        data-ocid="root-header"
      >
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 bg-accent rounded-md flex items-center justify-center">
              <Heart className="w-4 h-4 text-accent-foreground" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display font-bold text-sm text-foreground tracking-wide">
                NOHERIA
              </span>
              <span className="text-muted-foreground text-[10px] uppercase tracking-widest">
                Nursing Home
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav
            className="hidden md:flex items-center gap-1"
            data-ocid="root-nav"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-smooth ${
                  currentPath === link.href
                    ? "text-accent bg-accent/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Auth Actions */}
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <Link
                to={dashboardHref}
                className="hidden md:inline-flex items-center gap-2 px-4 py-1.5 bg-accent text-accent-foreground rounded-md text-sm font-semibold hover:bg-accent/90 transition-smooth"
                data-ocid="dashboard-link"
              >
                Dashboard
              </Link>
            ) : (
              <button
                type="button"
                onClick={login}
                className="hidden md:inline-flex items-center gap-2 px-4 py-1.5 bg-accent text-accent-foreground rounded-md text-sm font-semibold hover:bg-accent/90 transition-smooth"
                data-ocid="login-btn"
              >
                Login
              </button>
            )}
            <Link
              to="/book"
              className="hidden md:inline-flex items-center gap-2 px-4 py-1.5 border border-accent text-accent rounded-md text-sm font-semibold hover:bg-accent/10 transition-smooth"
              data-ocid="book-appointment-btn"
            >
              Book Appointment
            </Link>

            {/* Mobile toggle */}
            <button
              type="button"
              className="md:hidden p-2 text-muted-foreground hover:text-foreground"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="md:hidden bg-card border-t border-border px-4 py-4 space-y-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-smooth"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 flex flex-col gap-2">
              {isAuthenticated ? (
                <Link
                  to={dashboardHref}
                  className="px-4 py-2 bg-accent text-accent-foreground rounded-md text-sm font-semibold text-center"
                  onClick={() => setMobileOpen(false)}
                >
                  Dashboard
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    login();
                    setMobileOpen(false);
                  }}
                  className="px-4 py-2 bg-accent text-accent-foreground rounded-md text-sm font-semibold"
                >
                  Login
                </button>
              )}
              <Link
                to="/book"
                className="px-4 py-2 border border-accent text-accent rounded-md text-sm font-semibold text-center"
                onClick={() => setMobileOpen(false)}
              >
                Book Appointment
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 bg-background">
        <Outlet />
      </main>

      {/* Footer */}
      <footer
        className="bg-card border-t border-border"
        data-ocid="root-footer"
      >
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 bg-accent rounded-md flex items-center justify-center">
                  <Heart className="w-4 h-4 text-accent-foreground" />
                </div>
                <div>
                  <p className="font-display font-bold text-foreground">
                    Noheria Nursing Home
                  </p>
                  <p className="text-muted-foreground text-xs">
                    Panchkula, Haryana
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Providing compassionate healthcare to the Panchkula community
                since 1994.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-display font-semibold text-foreground mb-4 text-sm uppercase tracking-wide">
                Quick Links
              </h4>
              <ul className="space-y-2">
                {["Home", "Services", "Doctors", "Blog", "Contact"].map(
                  (label) => (
                    <li key={label}>
                      <a
                        href={`/#${label.toLowerCase()}`}
                        className="text-muted-foreground hover:text-accent text-sm transition-colors"
                      >
                        {label}
                      </a>
                    </li>
                  ),
                )}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-display font-semibold text-foreground mb-4 text-sm uppercase tracking-wide">
                Services
              </h4>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li>General Medicine</li>
                <li>Emergency Care</li>
                <li>Maternity Services</li>
                <li>Pediatrics</li>
                <li>Orthopedics</li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-display font-semibold text-foreground mb-4 text-sm uppercase tracking-wide">
                Contact
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-muted-foreground text-sm">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-accent" />
                  Sector 6, Panchkula, Haryana 134109
                </li>
                <li className="flex items-center gap-2 text-muted-foreground text-sm">
                  <Phone className="w-4 h-4 shrink-0 text-accent" />
                  +91 172 256 0000
                </li>
                <li className="flex items-center gap-2 text-muted-foreground text-sm">
                  <Mail className="w-4 h-4 shrink-0 text-accent" />
                  info@noherianursinghome.com
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-xs">
              © {new Date().getFullYear()} Noheria Nursing Home. All rights
              reserved. Est. 1994.
            </p>
            <p className="text-muted-foreground text-xs">
              Built with love using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
