/** @format */
"use client";
import Comments from "@/components/Comments";
import CustomLayout from "@/components/CustomLayout";
import LikeButton from "@/components/LikeButton";
import { Video } from "@/utils/types/video";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaCommentDots, FaHeart, FaPlay } from "react-icons/fa";
import { FaFile, FaShare } from "react-icons/fa6";
import { RiVolumeMuteFill, RiVolumeUpFill } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";

interface Props {
  postDetailsProps: Video;
}
const Details = ({ postDetailsProps }: Props) => {
  const router = useRouter();
  const params = useParams();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [postDetails, setPostDetails] = useState(postDetailsProps);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const currentDate = new Date();
  const postedDate = new Date(currentDate);
  postedDate.setDate(currentDate.getDate() - 2);
  useEffect(() => {
    const detailPost = async () => {
      const res = await fetch(`/api/post/${params.id}`, {
        method: "GET",
      });
      const res_PostDetails: Video = await res.json();
      setPostDetails(res_PostDetails);
    };
    detailPost();
  }, [params]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = muted;
    }
  }, [muted]);
  const onVideoClick = () => {
    if (playing) {
      videoRef?.current?.pause();
      setPlaying(false);
    } else {
      videoRef?.current?.play();
      setPlaying(true);
    }
  };
  if (!postDetails) return null;

  return (
    <CustomLayout postId={params.id}>
      <div className='flex lg:flex-nowrap flex-wrap max-sm:flex-col max-sm:justify-center max-sm:items-center w-full'>
        {/* left side video section*/}
        <div className='flex flex-col w-[58%]'>
          <button
            type='button'
            onClick={() => router.push("/")}
            className='absolute left-5 top-5 h-10 w-10 rounded-full flex items-center justify-center z-10 bg-gray-700'>
            <RxCross2 className='p-1 text-4xl font-extrabold text-slate-200' />
          </button>
          <div className='flex p-3 w-full h-screen bg-opacity-90 bg-black items-center justify-center relative'>
            <div className='w-[380px] h-screen bg-black flex items-center justify-center'>
              <video
                ref={videoRef}
                loop
                src={postDetails.video.asset.url}
                onClick={onVideoClick}
                className='h-full cursor-pointer'></video>
            </div>
            <div className='absolute left-[50%] top-[50%] cursor-pointer'>
              {!playing && (
                <button
                  type='button'
                  onClick={onVideoClick}>
                  {" "}
                  <FaPlay className='text-white text-5xl' />
                </button>
              )}
            </div>
            <div className='absolute bottom-5 lg:bottom-10 right-5 lg:right-10 cursor-pointer bg-gray-700 h-10 w-10 rounded-full flex items-center justify-center text-white text-3xl font-medium'>
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
          </div>
        </div>

        {/* right side user profile , details and others */}
        <div className='flex w-[42%] flex-col items-center justify-center h-screen overflow-scroll'>
          <div className='flex flex-col w-full h-72 gap-1'>
            <div className='flex flex-col w-full h-[266px] p-4 border-b-[2px] border-slate-300'>
              <div className='bg-slate-100 rounded-2xl p-4 w-full h-36 flex flex-col gap-2'>
                <div className='flex  items-center justify-between'>
                  <div className='flex h-10 w-10 rounded-full'>
                    <Image
                      src={postDetails.postedBy.image}
                      alt='user_profile'
                      width={120}
                      height={120}
                      objectFit='center'
                      layout='responsive'
                      className='flex rounded-full object-cover'
                    />
                  </div>
                  <div className='flex flex-col w-[65%] h-14'>
                    <p className='font-semibold text-lg'>
                      {postDetails.postedBy.userName}
                    </p>
                    <p>
                      {postDetails.postedBy.userName}. {postedDate.getDay()}{" "}
                      dago
                    </p>
                  </div>
                  <button
                    type='button'
                    className='w-24 h-10 bg-btnColor'>
                    follow
                  </button>
                </div>
                <div className='flex flex-col'>
                  <div>#hash tag</div>
                  <div>audio</div>
                </div>
              </div>
              <div className='flex lg:gap-10 gap-7 justify-between p-3 *:rounded-full *:px-2 *:bg-slate-200 *:h-10 *:w-10 max-sm:relative max-sm:-left-14 max-sm:gap-5 max-sm:*:text-xs max-sm:*:w-8 max-sm:*:h-8 max-sm:-bottom-3'>
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
              <div className='flex justify-between w-full h-14 items-center'>
                <div className='bg-green-50 w-1/2 flex items-center justify-center p-2 border-b-[2px] hover:border-black'>
                  Comments
                </div>
                <div className='bg-red-300 w-1/2 flex items-center justify-center p-2 border-b-[2px] hover:border-black'>
                  Creator videos
                </div>
              </div>
            </div>
          </div>
          <div className='flex w-full h-96'>
            <div>
              <Comments />
            </div>
            <div>
              <LikeButton />
            </div>
          </div>
          <div className='flex w-full bg-slate-400 h-20'>lower div</div>
        </div>
      </div>
    </CustomLayout>
  );
};

export default Details;
