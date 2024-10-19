import "server-only";
import {
  Account,
  Client,
  Databases,
  Models,
  Storage,
  type Users as UsersType,
  type Databases as DatabasesType,
  type Storage as StorageType,
  type Account as AccountType,
} from "node-appwrite";
import { getCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";
import { AUTH_COOKIE } from "@/features/auth/constants";

interface SessionMiddlewareContext {
  Variables: {
    users: UsersType;
    account: AccountType;
    storage: StorageType;
    databases: DatabasesType;
    user: Models.User<Models.Preferences>;
  };
}
export const sessionMiddleware = createMiddleware<SessionMiddlewareContext>(
  async (c, next) => {
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

    const session = getCookie(c, AUTH_COOKIE);

    if (!session) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    client.setSession(session);
    const account = new Account(client);
    const storage = new Storage(client);
    const databases = new Databases(client);

    const user = await account.get();
    account.updateSession(session);

    c.set("user", user);
    c.set("account", account);
    c.set("storage", storage);
    c.set("databases", databases);

    await next();
  }
);
