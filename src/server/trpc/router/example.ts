import { z } from "zod";

import { router, publicProcedure } from "../trpc";

import {
  PutObjectCommand,
  PutObjectCommandInput,
  GetObjectCommand,
  GetObjectCommandInput,
} from "@aws-sdk/client-s3";
import { s3Client } from "../../../utils/s3Client"; // Helper function that creates an Amazon S3 service client module.
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const exampleRouter = router({
  cat: publicProcedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .query(async ({ input }) => {
      const commandInput: GetObjectCommandInput = {
        Bucket: "leaderboard.images",
        Key: "harry",
      };
      const command = new GetObjectCommand(commandInput);
      // Create the presigned URL.
      const signedUrl = await getSignedUrl(s3Client, command, {
        expiresIn: 120,
      });
      return {
        greeting: signedUrl,
      };
    }),
  hello: publicProcedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .query(({ input }) => {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    }),
  helloAgain: publicProcedure.query(({ ctx }) => {
    return {
      greeting: `Hello AGain "world"`,
    };
  }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),
});
