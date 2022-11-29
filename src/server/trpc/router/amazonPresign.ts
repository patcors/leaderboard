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

export const amazonPresignRouter = router({
  presignGet: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    const commandInput: GetObjectCommandInput = {
      Bucket: "leaderboard.images",
      Key: input,
    };
    const command = new GetObjectCommand(commandInput);
    // Create the presigned URL.
    const signedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 120,
    });
    return {
      signedUrl,
    };
  }),
  presignPut: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    const commandInput: PutObjectCommandInput = {
      Bucket: "leaderboard.images",
      Key: input,
    };
    const command = new PutObjectCommand(commandInput);
    // Create the presigned URL.
    const signedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 120,
    });
    return {
      signedUrl,
    };
  }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),
});
