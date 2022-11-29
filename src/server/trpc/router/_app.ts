import { router } from "../trpc";
import { amazonPresignRouter } from "./amazonPresign";
import { exampleRouter } from "./example";

export const appRouter = router({
  example: exampleRouter,
  amazonPresign: amazonPresignRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
