import { sessionMiddleware } from "@/lib/middleware/session-middleware";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { handle } from "hono/vercel";
import {
  createWorkspaceSchema,
  deleteWorkspaceSchema,
  updateWorkspaceSchema,
} from "../schema";
import { DATABASE_ID, WORKSPACES_ID } from "@/constant/config";
import { ID } from "node-appwrite";

// import auth from

const app = new Hono()
  .post(
    "/create",
    zValidator("json", createWorkspaceSchema),
    sessionMiddleware,
    async (c) => {
      const databases = c.get("databases");
      const user = c.get("user");

      const { name } = c.req.valid("json");

      const workspace = await databases.createDocument(
        DATABASE_ID,
        WORKSPACES_ID,
        ID.unique(),
        {
          name,
          userId: user.$id,
        }
      );

      return c.json({ success: true, data: workspace });
    }
  )
  .get("/", sessionMiddleware, async (c) => {
    const databases = c.get("databases");
    const user = c.get("user");

    const workspaces = await databases.listDocuments(
      DATABASE_ID,
      WORKSPACES_ID,
      ["userId=" + user.$id]
    );

    return c.json({ success: true, data: workspaces });
  })
  .delete(
    "/delete",
    zValidator("json", deleteWorkspaceSchema),
    sessionMiddleware,
    async (c) => {
      const databases = c.get("databases");
      // const id = c.req.param("id");
      const { id } = c.req.valid("json");

      await databases.deleteDocument(DATABASE_ID, WORKSPACES_ID, id);

      return c.json({ success: true });
    }
  )
  .put(
    "/update",
    zValidator("json", updateWorkspaceSchema),
    sessionMiddleware,
    async (c) => {
      // const databases = c.get("databases");
      // const { id, name } = c.req.valid("json");
      // await databases.updateDocument(DATABASE_ID, WORKSPACES_ID, id, {
      //   name,
      // });
      return c.json({ success: true });
    }
  );

export default app;
