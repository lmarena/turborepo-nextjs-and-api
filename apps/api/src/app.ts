import { meaningOfLife } from "@repo/common/meaning-of-life";
import configureOpenAPI from "#api/lib/configure-open-api";
import createApp from "#api/lib/create-app";
import index from "#api/routes/index.route";

const app = createApp();

configureOpenAPI(app);

const routes = [index] as const;

routes.forEach((route) => {
  app.route("/", route);
});


console.log(`meaningOfLife: ${meaningOfLife()}`);

export type AppType = (typeof routes)[number];

export default app;
