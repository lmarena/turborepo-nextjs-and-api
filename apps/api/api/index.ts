// Vercel serverless function entrypoint
import { Hono } from "hono";
import { handle } from "hono/vercel";
import app from "../src/app";

// Export for Vercel
export default handle(app);
