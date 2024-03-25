/** @format */
"use client";
import { Video } from "@/utils/types/video";
import { signIn, useSession } from "next-auth/react";
import Image from "next/legacy/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BsMusicNoteBeamed } from "react-icons/bs";
import { FaBookmark, FaCommentDots } from "react-icons/fa";

import { config } from "@/utils/config";
import { FaHeart, FaPause, FaPlay, FaShare } from "react-icons/fa6";
import {
  RiVerifiedBadgeFill,
  RiVolumeMuteFill,
  RiVolumeUpFill,
} from "react-icons/ri";
import LikeButton from "./LikeButton";

interface Props {
  post: Video;
  userId?: string | string[];
  className?: string;
}
const VideoCard = ({ post, userId, className }: Props) => {
  const [isHover, setIsHover] = useState(false);
  const [play, setPlay] = useState(false);
  const [muted, setMuted] = useState(false);
  const [postDetails, setPostDetails] = useState(post);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { data: session } = useSession();
  useEffect(() => {
    const detailPost = async () => {
      const res = await fetch(`${config.apiBaseUrl}/api/post/${post._id}`, {
        method: "GET",
      });
      const res_PostDetails: Video = await res.json();
      setPostDetails(res_PostDetails);
    };
    detailPost();
  }, [post._id]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = muted;
    }
  }, [muted]);

  //console.log(muted);
  const onVideoPress = () => {
    if (play) {
      videoRef?.current?.pause();
      setPlay(false);
    } else {
      videoRef?.current?.play();
      setPlay(true);
    }
  };

  //onClickLike function
  const handleClickLike = async (like: boolean) => {
    if (session?.user) {
      const res = await fetch(`${config.apiBaseUrl}/api/like`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          userId: session.user.id,
          postId: post._id,
          like,
        }),
      });
      const data = await res.json();
      setPostDetails({ ...postDetails, likes: data.likes });
    }
  };
  //console.log(post);
  return (
    <div
      id='video_card'
      className={`${
        className
          ? className
          : "ml-4 flex flex-col items-center justify-center py-2 w-full relative md:w-[85%] xl:h-[670px]"
      } ${
        userId ? "max-sm:w-full absolute" : "max-sm:w-[80%]"
      } max-sm:left-10`}>
      {!userId ? (
        <div className='flex flex-col px-3 w-full h-screen border-b-[1px] border-gray-200'>
          <div className='flex w-full py-2 sm:py-0 gap-2 sm:gap-0 justify-center'>
            <div className='flex items-center justify-center rounded-full w-20 h-20 overflow-hidden'>
              <Link href={`/profile/${post.userId}`}>
                <Image
                  src={post.postedBy.image}
                  alt='user_image'
                  width={60}
                  height={60}
                  className='rounded-full w-16 h-16 max-sm:w-10 max-sm:h-10'
                />
              </Link>
            </div>
            <div className='flex flex-col w-full relative max-sm:-left-1'>
              <div className='flex w-full justify-between items-center border-b py-2'>
                <div className='flex flex-col gap-1 '>
                  <Link href={`/details/${post._id}`}>
                    <p className='text-sm font-semibold capitalize flex items-center gap-2 text-primary'>
                      {post.postedBy.userName}
                      <span>
                        <RiVerifiedBadgeFill className='text-blue-500 text-sm' />
                      </span>
                    </p>
                  </Link>
                  <div>
                    <p className='text-sm'>{post.caption}</p>
                  </div>
                  <div>
                    <p className='text-sm'>
                      <BsMusicNoteBeamed />
                    </p>
                  </div>
                </div>
                <div>
                  <button className='border-[1px] rounded-sm border-[#FF6079] w-20 h-10 max-lg:w-14 max-lg:h-8 max-lg:text-sm font-semibold relative max-sm:left-0'>
                    Follow
                  </button>
                </div>
              </div>
              <div className='flex py-3 gap-2 w-full'>
                <div
                  className='relative max-sm:absolute w-full md:w-[380px] md:h-[520px] rounded-md overflow-hidden mt-3 bg-black flex items-center justify-center max-sm:-left-16 max-sm:w-[120%] max-sm:h-[390px]'
                  onMouseEnter={() => setIsHover(true)}
                  onMouseLeave={() => setIsHover(false)}>
                  <Link href={`/details/${post._id}`}>
                    <div className='w-full max-sm:w-[280px] max-sm:relative flex items-center justify-center rounded-md'>
                      <video
                        loop
                        ref={videoRef}
                        src={post.video.asset.url}
                        className='flex lg:w-[600px] h-[330px] md:h-[400px] lg:h-[530px] w-[260px] rounded-md'></video>
                    </div>
                  </Link>
                  {isHover && (
                    <div className='flex justify-between px-12 py-2 absolute bottom-5 transition-transform duration-100 w-full text-slate-200'>
                      {play ? (
                        <button onClick={onVideoPress}>
                          <FaPause />
                        </button>
                      ) : (
                        <button onClick={onVideoPress}>
                          <FaPlay />
                        </button>
                      )}
                      {muted ? (
                        <button onClick={() => setMuted(false)}>
                          <RiVolumeMuteFill className='text-xl font-semibold' />
                        </button>
                      ) : (
                        <button onClick={() => setMuted(true)}>
                          <RiVolumeUpFill className='text-xl font-semibold' />
                        </button>
                      )}
                    </div>
                  )}
                </div>
                <div className='flex flex-col lg:gap-10 gap-7 justify-end p-3 *:rounded-full *:px-2 *:bg-slate-100 *:h-10 *:w-10 max-sm:relative max-sm:left-44 max-sm:gap-8 max-sm:*:text-xs max-sm:*:w-8 max-sm:*:h-8 max-sm:-bottom-52 *:relative *:cursor-pointer'>
                  <div className='flex items-center justify-center'>
                    {session?.user ? (
                      <LikeButton
                        likeCounts={postDetails.likes}
                        handleClickLike={() => handleClickLike(true)}
                        handleClickDisLike={() => handleClickLike(false)}
                        className='relative -left-[15px] top-8 max-sm:top-6 text-sm max-sm:text-xs font-medium leading-7'
                      />
                    ) : (
                      <div
                        onClick={() => signIn()}
                        className='flex items-center justify-center'>
                        <FaHeart className='text-lg' />
                        <p className='absolute top-10 max-sm:top-8 text-sm max-sm:text-xs font-medium leading-7'>
                          {post.likes !== undefined && post.likes?.length > 0
                            ? post.likes.length
                            : ""}
                        </p>
                      </div>
                    )}
                  </div>
                  {session?.user ? (
                    <Link
                      href={`/details/${post._id}`}
                      className='flex items-center justify-center'>
                      <div className='flex items-center justify-center'>
                        <FaCommentDots className='text-lg' />
                        <p className='absolute top-10 max-sm:top-8 text-sm max-sm:text-xs font-medium leading-7'>
                          {post.comments !== undefined &&
                          post.comments?.length > 0
                            ? post.comments?.length
                            : ""}
                        </p>
                      </div>
                    </Link>
                  ) : (
                    <div
                      onClick={() => !session?.user && signIn()}
                      className='flex items-center justify-center'>
                      <FaCommentDots className='text-lg' />
                      <p className='absolute top-10 max-sm:top-8 text-sm max-sm:text-xs font-medium leading-7'>
                        {post.comments !== undefined &&
                        post.comments?.length > 0
                          ? post.comments.length
                          : ""}
                      </p>
                    </div>
                  )}

                  <div className='flex items-center justify-center'>
                    <FaBookmark className='text-lg' />
                  </div>
                  <div className='flex items-center justify-center'>
                    <FaShare className='text-lg' />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='relative py-3 gap-2 w-full flex items-center justify-center flex-wrap max-sm:gap-0 -left-14 max-lg:left-0'>
          <div
            className='relative max-sm:relative w-full md:w-[220px] md:h-[330px] rounded-md overflow-hidden mt-3 bg-black flex items-center justify-center max-sm:-left-10 max-sm:w-[120%] max-sm:h-[390px]'
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}>
            <Link href={`/details/${post._id}`}>
              <div className='w-full max-sm:w-[280px] max-sm:relative flex flex-wrap items-center justify-center rounded-md'>
                <video
                  loop
                  ref={videoRef}
                  src={post.video.asset.url}
                  className='flex lg:w-[600px] h-[330px] md:h-[400px] lg:h-[530px] w-[260px] rounded-md'></video>
              </div>
            </Link>
            {isHover && (
              <div className='flex justify-between px-12 py-2 absolute bottom-5 transition-transform duration-100 w-full text-slate-200'>
                {play ? (
                  <button onClick={onVideoPress}>
                    <FaPause />
                  </button>
                ) : (
                  <button onClick={onVideoPress}>
                    <FaPlay />
                  </button>
                )}
                {muted ? (
                  <button onClick={() => setMuted(false)}>
                    <RiVolumeMuteFill className='text-xl font-semibold' />
                  </button>
                ) : (
                  <button onClick={() => setMuted(true)}>
                    <RiVolumeUpFill className='text-xl font-semibold' />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoCard;
