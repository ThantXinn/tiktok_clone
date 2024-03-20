/** @format */

import VideoCard from "@/components/VideoCard";
import { allPostsQuery } from "@/utils/groq";
import { Video } from "@/utils/types/video";
import { client } from "../../sanity/lib/client";

export const revalidate = 10;
const Home = async () => {
  const videos: Video[] = await client.fetch(allPostsQuery());
  return (
    <main>
      {videos.length ? (
        videos.map((video: Video) => (
          <VideoCard
            post={video}
            key={video._id}
          />
        ))
      ) : (
        <div></div>
      )}
    </main>
  );
};

export default Home;
