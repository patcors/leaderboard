import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { InferGetStaticPropsType } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import ImageUploadButton from "../components/ImageUploadButton";
import { s3Client } from "../utils/s3Client";

import { trpc } from "../utils/trpc";

// export const getStaticProps = async () => {
//   const commandInput = {
//     Bucket: "leaderboard.images",
//     Key: "2022-11-26_16-16.png",
//   };
//   // Create the presigned URL.
//   const imagePresignedUrl = await getSignedUrl(
//     s3Client,
//     new GetObjectCommand(commandInput),
//     {
//       expiresIn: 120,
//     }
//   );
//   // Create the presigned URL.
//   const imagePresignedPutUrl = await getSignedUrl(
//     s3Client,
//     new PutObjectCommand({ ...commandInput, Body: "BODY" }),
//     {
//       expiresIn: 120,
//     }
//   );

//   console.log(imagePresignedUrl);
//   console.log(imagePresignedPutUrl);
//   return {
//     props: { imagePresignedUrl, imagePresignedPutUrl },
//   };
// };

// {
//   imagePresignedUrl,
//   imagePresignedPutUrl,
// }: InferGetStaticPropsType<typeof getStaticProps>

const Home = () => {
  const [fileName, setFileName] = useState("");
  const [savedFileUrl, setSavedFileUrl] = useState("");
  const presignedGet = trpc.amazonPresign.presignGet.useMutation();
  const presignedPutGet = trpc.amazonPresign.presignPut.useMutation();
  ("new-image.png");
  // const triggerPresignedUrlCollection = () => {
  //   mutation.mutate({ text: "key" });
  // };

  return (
    <>
      <Head>
        <title>Leaderboard</title>
        <meta name="description" content="Rank board games" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Use the camera
          </h1>
          <img src={savedFileUrl} key={savedFileUrl} alt="saved-image" />
          <button
            className="text-white"
            onClick={() => {
              presignedGet.mutate("new-image.png");
              const { data } = presignedGet;
              console.log(data);
              if (data) {
                console.log("setting file to", data.signedUrl);
                setSavedFileUrl(data.signedUrl);
              }
            }}
          >
            Reload saved image
          </button>
          <input
            type="text"
            onChange={(e) => {
              setFileName(e.target.value);
            }}
            value={fileName}
          />
          <ImageUploadButton
            submitSource={(file) => {
              presignedPutGet.mutate("new-image.png");
              console.log("submitted mutation");
              const { data } = presignedPutGet;
              if (data) {
                console.log("submitting file ", file);
                fetch(data.signedUrl, {
                  method: "PUT",
                  body: file,
                });
              }
            }}
          />
          <button
            className="text-white"
            // onClick={triggerPresignedUrlCollection}
          >
            Trigger Presigned Url Activation
          </button>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="https://create.t3.gg/en/usage/first-steps"
            >
              <h3 className="text-2xl font-bold">First Steps →</h3>
              <div className="text-lg">
                Just the basics - Everything you need to know to set up your
                database and authentication.
              </div>
            </Link>
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="https://create.t3.gg/en/introduction"
            >
              <h3 className="text-2xl font-bold">Documentation →</h3>
              <div className="text-lg">
                Learn more about Create T3 App, the libraries it uses, and how
                to deploy it.
              </div>
            </Link>
          </div>
          <p className="text-2xl text-white"></p>
        </div>
      </main>
    </>
  );
};

export default Home;
