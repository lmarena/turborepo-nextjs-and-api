// Vercel serverless function entrypoint
import { Hono } from "hono";
import { handle } from "hono/vercel";

import app from "../src/app";

// Ensure Vercel detects this as a Hono entrypoint
declare const VERCEL_DETECTION: unique symbol;
const _unusedHono: typeof Hono = Hono as typeof Hono & {
  [VERCEL_DETECTION]: never;
};
void _unusedHono;

// Export for Vercel
export default handle(app);
