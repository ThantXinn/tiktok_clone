/** @format */
"use client";

import NoResult from "@/components/NoResult";
import VideoCard from "@/components/VideoCard";
import {
  singleUserQuery,
  userCreatedPostsQuery,
  userLikedPostsQuery,
} from "@/utils/groq";
import { IUser } from "@/utils/types/user";
import { Video } from "@/utils/types/video";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MdOutlineVideocamOff } from "react-icons/md";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { client } from "../../../../sanity/lib/client";

const ProfileDetails = () => {
  const params = useParams();
  const userId = params.id;
  const [activeVideosTab, setActiveVideoTab] = useState<boolean>(true);
  const [userDetails, setUserDetails] = useState<IUser>();
  const [userCreatedPosts, setUserCreatedPosts] = useState<Video[]>([]);
  const [userLikedPosts, setUserLikedPosts] = useState<Video[]>([]);

  const videosTab = activeVideosTab
    ? "border-b-2 border-black"
    : "text-gray-400";
  const likedTab = !activeVideosTab
    ? "border-b-2 border-black"
    : "text-gray-400";

  useEffect(() => {
    const fetch_UserData = async () => {
      const res_userDetails: IUser[] = await client.fetch(
        singleUserQuery(userId),
      );
      const res_userCreatedPosts: Video[] = await client.fetch(
        userCreatedPostsQuery(userId),
      );
      const res_userLikedPosts: Video[] = await client.fetch(
        userLikedPostsQuery(userId),
      );
      setUserDetails(res_userDetails[0]);
      setUserCreatedPosts(res_userCreatedPosts);
      setUserLikedPosts(res_userLikedPosts);
    };
    fetch_UserData();
  }, [userId, activeVideosTab]);

  if (!userDetails) return null;
  return (
    <div
      id='profile_'
      className='w-[95%] px-3 py-2 ml-8'>
      <div className='flex gap-3 md:gap-3 mb-4 w-full'>
        <div className='w-12 h-12 md:w-32 md:h-32 flex items-center'>
          <Image
            width={100}
            height={100}
            className='rounded-full'
            src={userDetails.image}
            alt='user-profile'
          />
        </div>

        <div>
          <div className='text-md md:text-2xl font-bold tracking-wider flex items-center justify-start lowercase w-48 gap-3'>
            <span>{userDetails?.userName.replace(/\s+/g, "")} </span>
            <RiVerifiedBadgeFill className='text-blue-400 md:text-xl text-md' />
          </div>
          <p className='text-sm font-medium '> {userDetails?.userName}</p>
          <button
            type='button'
            className='bg-btnColor mt-4 h-10 text-xl font-semibold text-white w-full rounded'>
            Follow
          </button>
        </div>
      </div>
      <div className='flex flex-col items-center justify-center w-[95%]'>
        <div className='flex gap-10 mb-10 mt-3 border-b-2 border-gray-200 bg-white w-full'>
          <p
            className={`text-xl font-semibold cursor-pointer ${videosTab} mt-2`}
            onClick={() => setActiveVideoTab(true)}>
            Videos
          </p>
          <p
            className={`text-xl font-semibold cursor-pointer ${likedTab} mt-2`}
            onClick={() => setActiveVideoTab(false)}>
            Liked
          </p>
        </div>
        <div
          id='posted_liked'
          className='flex items-center justify-center w-full -mt-48 md:mt-0 max-sm:mt-0 flex-wrap relative'>
          {activeVideosTab ? (
            userCreatedPosts.length > 0 ? (
              userCreatedPosts.map((post: Video) => (
                <div
                  key={post._id}
                  className='relative flex-wrap'>
                  <VideoCard
                    post={post}
                    userId={userId}
                    className='relative px-4 lg:-left-8 -top-10'
                  />
                </div>
              ))
            ) : (
              <NoResult
                messageProps={`No ${activeVideosTab ? "" : "Liked"} Videos yet`}
                icons={<MdOutlineVideocamOff />}
              />
            )
          ) : userLikedPosts.length > 0 ? (
            userLikedPosts.map((post: Video) => (
              <div
                key={post._id}
                className='relative'>
                <VideoCard
                  post={post}
                  userId={userId}
                  className='relative px-4 -left-14 lg:-left-8 -top-10'
                />
              </div>
            ))
          ) : (
            <NoResult
              messageProps={`No ${activeVideosTab ? "" : "Liked"} Videos yet`}
              icons={<MdOutlineVideocamOff />}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
