import { createRootRoute, createRoute } from "@tanstack/react-router";
import { Root } from "./components/root";
import {Home} from "./pages/Home"
import { Dashboard } from "./pages/Dashboard";
import { Register } from "./pages/Register";

const rootRoute = createRootRoute({
    component: Root
})

const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: Home
})

const dashboardRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/dashboard',
    component: Dashboard
})

const registerRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/register',
    component: Register
})

export const routeTree = rootRoute.addChildren([indexRoute, dashboardRoute, registerRoute])