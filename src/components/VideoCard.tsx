/** @format */
"use client";
import { Video } from "@/utils/types/video";
import Image from "next/legacy/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BsMusicNoteBeamed } from "react-icons/bs";
import { FaCommentDots, FaHeart } from "react-icons/fa";
import { FaFile, FaPause, FaPlay, FaShare } from "react-icons/fa6";
import {
  RiVerifiedBadgeFill,
  RiVolumeMuteFill,
  RiVolumeUpFill,
} from "react-icons/ri";

interface Props {
  post: Video;
}
const VideoCard = ({ post }: Props) => {
  const [isHover, setIsHover] = useState(false);
  const [play, setPlay] = useState(false);
  const [muted, setMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const onVideoPress = () => {
    if (play) {
      videoRef?.current?.pause();
      setPlay(false);
    } else {
      videoRef?.current?.play();
      setPlay(true);
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = muted;
    }
  }, [muted]);

  return (
    <div className='flex flex-col items-center justify-center py-2 w-full relative left-10 md:w-[85%] xl:h-[800px]'>
      <div className='flex flex-col px-3 w-full h-screen border-b-[1px] border-gray-200'>
        <div className='flex w-full py-2 sm:py-0 gap-2 sm:gap-0 justify-center'>
          <div className='flex items-center justify-center rounded-full w-20 h-20 overflow-hidden'>
            <Link href={"/"}>
              <Image
                src={post.postedBy.image}
                alt='user_image'
                objectFit='contain'
                width={70}
                height={70}
                className='rounded-full w-16 h-16 max-sm:w-14 max-sm:h-14'
              />
            </Link>
          </div>
          <div className='flex flex-col w-[75%] relative max-sm:-left-3'>
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
                <button className='border-[1px] rounded-sm border-[#FF6079] w-20 h-10 max-lg:w-14 max-lg:h-8 max-lg:text-sm font-semibold relative max-sm:-left-14'>
                  Follow
                </button>
              </div>
            </div>
            <div className='flex py-3 gap-2 relative'>
              <div
                className='w-1/2 md:w-[260px] md:h-[480px] rounded-md overflow-hidden mt-3 relative bg-black flex items-center justify-center max-sm:-left-16 max-sm:w-3/4 max-sm:h-[65vh]'
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}>
                <Link href={`/details/${post._id}`}>
                  <div className='w-full flex items-center justify-center rounded-md'>
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
              <div className='flex flex-col lg:gap-10 gap-7 justify-end p-3 *:rounded-full *:px-2 *:bg-slate-100 *:h-10 *:w-10 max-sm:relative max-sm:-left-14 max-sm:gap-5 max-sm:*:text-xs max-sm:*:w-8 max-sm:*:h-8 max-sm:-bottom-3'>
                <div className='flex items-center justify-center'>
                  <FaHeart className='text-lg' />
                </div>
                <div className='flex items-center justify-center'>
                  <FaCommentDots className='text-lg' />
                </div>
                <div className='flex items-center justify-center'>
                  <FaFile className='text-lg' />
                </div>
                <div className='flex items-center justify-center'>
                  <FaShare className='text-lg' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
