import { meaningOfLife } from "@repo/common/meaning-of-life";
import { Hono } from "hono";

import configureOpenAPI from "#api/lib/configure-open-api";
import createApp from "#api/lib/create-app";
import index from "#api/routes/index.route";

// Ensure Vercel detects this file imports Hono (this code is tree-shaken in production)
declare const VERCEL_DETECTION: unique symbol;
const _unusedHono: typeof Hono = Hono as typeof Hono & {
  [VERCEL_DETECTION]: never;
};
void _unusedHono;

const app = createApp();

configureOpenAPI(app);

const routes = [index] as const;

routes.forEach((route) => {
  app.route("/", route);
});

// eslint-disable-next-line no-console
console.log(`meaningOfLife: ${meaningOfLife()}`);

export type AppType = (typeof routes)[number];

export default app;
