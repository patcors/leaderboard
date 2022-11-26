import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import {
  DeleteObjectCommand,
  PutObjectCommand,
  GetObjectCommand,
  GetObjectCommandInput,
} from "@aws-sdk/client-s3";
import { s3Client } from "../../../utils/s3Client"; // Helper function that creates an Amazon S3 service client module.
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const imageRouter = router({
  getImagePresignedUrl: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(async ({ input: { text } }) => {
      const commandInput: GetObjectCommandInput = {
        Bucket: "leaderboard.images",
        Key: text,
      };
      const command = new GetObjectCommand(commandInput);
      // Create the presigned URL.
      const signedUrl = await getSignedUrl(s3Client, command, {
        expiresIn: 3600,
      });
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    }),
  getImagePresignedPutUrl: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),
});
