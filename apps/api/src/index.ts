import { serve } from "@hono/node-server";
import { handle } from "hono/vercel";

import app from "./app";
import env from "./env";

// Export for Vercel serverless deployment
export default handle(app);

// Only run the server in non-Vercel environments
if (process.env.VERCEL !== "1") {
  const port = env.PORT;
  // eslint-disable-next-line no-console
  console.log(`Server is running on port http://localhost:${port}`);

  serve({
    fetch: app.fetch,
    port,
  });
}
