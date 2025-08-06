import { createRouter, createRootRoute, createRoute } from '@tanstack/react-router';
import VotingPage from './pages/VotingPage.js';
import ResultsPage from './pages/ResultsPage.js';
import App from './App.js';

const rootRoute = createRootRoute({
  component: App,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: VotingPage,
});

const resultsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/results',
  component: ResultsPage,
});

const routeTree = rootRoute.addChildren([indexRoute, resultsRoute]);

export const router = createRouter({ routeTree });
