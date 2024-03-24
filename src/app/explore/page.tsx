/** @format */
"use client";
import Discover from "@/components/Discover";
import LikeButton from "@/components/LikeButton";
import NoResult from "@/components/NoResult";
import VideoCard from "@/components/VideoCard";
import { allPostsQuery } from "@/utils/groq";
import { Video } from "@/utils/types/video";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MdOutlineVideocamOff } from "react-icons/md";
import { client } from "../../../sanity/lib/client";

const Explore = ({ video }: { video: Video }) => {
  const [allVideos, setAllVidoes] = useState<Video[]>([]);
  const [postDetails, setPostDetails] = useState<Video>(video);
  const { data: session } = useSession();
  useEffect(() => {
    const fetch_searchResult = async () => {
      const res: Video[] = await client.fetch(allPostsQuery());
      setAllVidoes(res);
    };
    fetch_searchResult();
  }, []);
  //onClickLike function
  const handleClickLike = async (like: boolean) => {
    if (session) {
      allVideos.map(async (item) => {
        const res = await fetch(`/api/like`, {
          method: "PUT",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            userId: session.user.id,
            postId: item._id,
            like,
          }),
        });
        const data = await res.json();
        setPostDetails({ ...postDetails, likes: data.likes });
      });
    }
  };

  if (!allVideos) return null;
  return (
    <div
      id='explore_'
      className='relative -top-10 w-[95%] px-3 py-2 ml-8'>
      <Discover className='overflow-x-scroll' />
      <div className='relative top-0 flex gap-7 px-3'>
        {allVideos.length ? (
          allVideos.map((video: Video) => (
            <div
              key={video._id}
              className='relative'>
              <VideoCard
                className='relative left-16 max-lg:left-0 flex-wrap'
                post={video}
                userId={video.userId}
              />
              <div className='bottom-0 *:ml-2 *:px-2 relative'>
                <p>{video.caption}</p>

                <div className='flex gap-2 items-center justify-between'>
                  <div className='flex gap-2 items-center '>
                    <Image
                      src={video.postedBy.image}
                      alt='user_image'
                      width={32}
                      height={32}
                      className='rounded-full w-7 h-7'
                    />
                    <p className='max-lg:text-sm text-slate-700 font-light'>
                      {video.postedBy.userName}
                    </p>
                  </div>
                  <div className='mr-6'>
                    <LikeButton
                      likeCounts={
                        !postDetails ? video.likes : postDetails.likes
                      }
                      handleClickLike={() => handleClickLike(true)}
                      handleClickDisLike={() => handleClickLike(false)}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <NoResult
            messageProps={`There is no Videos`}
            icons={<MdOutlineVideocamOff />}
          />
        )}
      </div>
    </div>
  );
};

export default Explore;
