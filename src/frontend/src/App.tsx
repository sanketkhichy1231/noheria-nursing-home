import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import AdminLayout from "./components/Layout/AdminLayout";
import DoctorLayout from "./components/Layout/DoctorLayout";
import RootLayout from "./components/Layout/RootLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";

// Lazy-load pages
const HomePage = lazy(() => import("./pages/HomePage"));
const BlogDetailPage = lazy(() => import("./pages/BlogDetailPage"));
const BookPage = lazy(() => import("./pages/BookPage"));
const AdminDashboardPage = lazy(
  () => import("./pages/admin/AdminDashboardPage"),
);
const AdminAppointmentsPage = lazy(
  () => import("./pages/admin/AdminAppointmentsPage"),
);
const AdminDoctorsPage = lazy(() => import("./pages/admin/AdminDoctorsPage"));
const AdminBlogPage = lazy(() => import("./pages/admin/AdminBlogPage"));
const AdminContentPage = lazy(() => import("./pages/admin/AdminContentPage"));
const AdminAnalyticsPage = lazy(
  () => import("./pages/admin/AdminAnalyticsPage"),
);
const AdminAuditLogsPage = lazy(
  () => import("./pages/admin/AdminAuditLogsPage"),
);
const DoctorDashboardPage = lazy(
  () => import("./pages/doctor/DoctorDashboardPage"),
);
const DoctorAppointmentsPage = lazy(
  () => import("./pages/doctor/DoctorAppointmentsPage"),
);

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-background">
    <div className="flex flex-col items-center gap-3">
      <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      <p className="text-muted-foreground text-sm">Loading...</p>
    </div>
  </div>
);

// Root route
const rootRoute = createRootRoute();

// Public routes
const publicLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "public",
  component: RootLayout,
});

const homeRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <HomePage />
    </Suspense>
  ),
});

const blogDetailRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/blog/$id",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <BlogDetailPage />
    </Suspense>
  ),
});

const bookRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/book",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <BookPage />
    </Suspense>
  ),
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});

// Admin routes
const adminLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "admin",
  component: () => (
    <ProtectedRoute requiredRole="admin">
      <AdminLayout />
    </ProtectedRoute>
  ),
});

const adminIndexRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/admin",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AdminDashboardPage />
    </Suspense>
  ),
});

const adminAppointmentsRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/admin/appointments",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AdminAppointmentsPage />
    </Suspense>
  ),
});

const adminDoctorsRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/admin/doctors",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AdminDoctorsPage />
    </Suspense>
  ),
});

const adminBlogRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/admin/blog",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AdminBlogPage />
    </Suspense>
  ),
});

const adminContentRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/admin/content",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AdminContentPage />
    </Suspense>
  ),
});

const adminAnalyticsRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/admin/analytics",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AdminAnalyticsPage />
    </Suspense>
  ),
});

const adminAuditLogsRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/admin/audit-logs",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AdminAuditLogsPage />
    </Suspense>
  ),
});

// Doctor routes
const doctorLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "doctor",
  component: () => (
    <ProtectedRoute requiredRole="doctor">
      <DoctorLayout />
    </ProtectedRoute>
  ),
});

const doctorIndexRoute = createRoute({
  getParentRoute: () => doctorLayoutRoute,
  path: "/doctor",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <DoctorDashboardPage />
    </Suspense>
  ),
});

const doctorAppointmentsRoute = createRoute({
  getParentRoute: () => doctorLayoutRoute,
  path: "/doctor/appointments",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <DoctorAppointmentsPage />
    </Suspense>
  ),
});

const routeTree = rootRoute.addChildren([
  publicLayoutRoute.addChildren([homeRoute, blogDetailRoute, bookRoute]),
  loginRoute,
  adminLayoutRoute.addChildren([
    adminIndexRoute,
    adminAppointmentsRoute,
    adminDoctorsRoute,
    adminBlogRoute,
    adminContentRoute,
    adminAnalyticsRoute,
    adminAuditLogsRoute,
  ]),
  doctorLayoutRoute.addChildren([doctorIndexRoute, doctorAppointmentsRoute]),
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <RouterProvider router={router} />
    </div>
  );
}
