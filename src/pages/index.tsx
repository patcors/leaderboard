import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import ImageUploadButton from "../components/ImageUploadButton";

import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const hello = trpc.example.hello.useQuery({ text: "from tRPC" });
  const imagePresignedUrl = trpc.images.getImagePresignedUrl.useQuery({
    text: "key",
  });
  const imagePresignedPutUrl = trpc.images.getImagePresignedPutUrl.useQuery({
    text: "key",
  });

  console.log(imagePresignedUrl);
  console.log(imagePresignedPutUrl);
  const triggerPresignedUrlCollection = () => {};

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
          <ImageUploadButton />
          <button
            className="text-white"
            onClick={triggerPresignedUrlCollection}
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
          <p className="text-2xl text-white">
            {hello.data ? hello.data.greeting : "Loading tRPC query..."}
          </p>
        </div>
      </main>
    </>
  );
};

export default Home;
