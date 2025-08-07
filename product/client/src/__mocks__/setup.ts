// vitest.setup.ts
import { beforeAll, afterEach, afterAll } from "vitest";
import { server } from "./server";

beforeAll(() =>
  server.listen(
    { onUnhandledRequest: "error" } // This will throw an error for any unhandled requests
  )
);
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
