import { createRouter, createRootRoute, createRoute } from '@tanstack/react-router';
import VotingPage from './pages/VotingPage.js';
import ResultsPage from './pages/ResultsPage.js';
import HistoryPage from './pages/HistoryPage.js';
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

const historyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/history',
  component: HistoryPage,
});

const routeTree = rootRoute.addChildren([indexRoute, resultsRoute, historyRoute]);

export const router = createRouter({ routeTree });
