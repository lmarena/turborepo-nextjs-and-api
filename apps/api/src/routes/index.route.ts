import { createRoute } from "@hono/zod-openapi";
import { meaningOfLife } from "@repo/common/meaning-of-life";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";
import { createMessageObjectSchema } from "stoker/openapi/schemas";

import { createRouter } from "#api/lib/create-app";

const router = createRouter().openapi(
  createRoute({
    tags: ["Index"],
    method: "get",
    path: "/",
    responses: {
      [HttpStatusCodes.OK]: jsonContent(
        createMessageObjectSchema("Tasks API"),
        "Tasks API Index"
      ),
    },
  }),
  (c: any) => {
    return c.json(
      {
        message: "Tasks API",
        meaningOfLife: meaningOfLife(),
      },
      HttpStatusCodes.OK
    );
  }
);

export default router;
