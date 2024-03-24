/** @format */

import VideoCard from "@/components/VideoCard";
import { allPostsQuery } from "@/utils/groq";
import { Video } from "@/utils/types/video";
import { client } from "../../sanity/lib/client";

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
        <div className='text-black'>
          <p>Loading</p>
        </div>
      )}
    </main>
  );
};

export default Home;
