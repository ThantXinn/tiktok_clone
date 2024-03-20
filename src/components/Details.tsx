/** @format */
"use client";
import Comments from "@/components/Comments";
import LikeButton from "@/components/LikeButton";
import { useAppSelector } from "@/utils/store/hook";
import { IUser } from "@/utils/types/user";
import { Video } from "@/utils/types/video";
import { signIn, useSession } from "next-auth/react";
import Image from "next/legacy/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaBookmark, FaCommentDots, FaPlay } from "react-icons/fa";
import { FaHeart, FaShare } from "react-icons/fa6";
import { RiVolumeMuteFill, RiVolumeUpFill } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";

interface Props {
  videoProps?: Video;
}
const Details = ({ videoProps }: Props) => {
  const router = useRouter();
  const params = useParams();
  const postId = params.id;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [postDetails, setPostDetails] = useState<Video>(videoProps!);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [addComment, setAddComment] = useState("");
  const [postingComment, setIsPostingComment] = useState(false);
  const currentDate = new Date();
  const postedDate = new Date(currentDate);
  postedDate.setDate(currentDate.getDate() - 1);
  const { data: session } = useSession();
  const userProfile: IUser | null = useAppSelector(
    (store) => store.tiknock_clone.userInfo,
  );

  useEffect(() => {
    const detailPost = async () => {
      const res = await fetch(`/api/post/${postId}`, {
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
  //onClickLike function
  const handleClickLike = async (like: boolean) => {
    if (userProfile) {
      const res = await fetch(`/api/like`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          userId: userProfile._id,
          postId: postId,
          like,
        }),
      });
      const data = await res.json();
      setPostDetails({ ...postDetails, likes: data.likes });
    }
  };
  //onVideoClick function
  const onVideoClick = () => {
    if (playing) {
      videoRef?.current?.pause();
      setPlaying(false);
    } else {
      videoRef?.current?.play();
      setPlaying(true);
    }
  };

  //onClickAddComment function
  const handleClickAddComment = async (e: any) => {
    e.preventDefault();
    if (userProfile && addComment) {
      setIsPostingComment(true);

      const res = await fetch(`/api/post/${postId}`, {
        method: "PUT",
        headers: { "content-type": "applicatioin/json" },
        body: JSON.stringify({
          userId: userProfile._id,
          comment: addComment,
        }),
      });
      const data = await res.json();
      setAddComment("");
      setPostDetails({ ...postDetails, comments: data.comments });
      setIsPostingComment(false);
    }
  };
  if (!postDetails) return null;

  return (
    <div
      id='details_'
      className='flex lg:flex-nowrap flex-wrap max-sm:flex-col max-sm:justify-center max-sm:items-center w-screen fixed max-sm:relative max-sm:w-full right-0 top-[0px] z-20 max-sm:z-0 h-full max-sm:-left-6 bg-white'>
      {/* left side video section*/}
      <div className='flex flex-col w-[58%] max-sm:h-[50vh]'>
        <button
          type='button'
          onClick={() => router.push("/")}
          className='absolute left-5 top-5 h-10 w-10 rounded-full flex items-center justify-center z-10 bg-gray-700'>
          <RxCross2 className='p-1 text-4xl font-extrabold text-slate-200' />
        </button>
        <div className='flex p-3 w-full h-screen max-sm:h-full bg-opacity-90 bg-black items-center justify-center relative max-sm:top-14'>
          <div className='w-[380px] h-screen max-sm:h-full bg-black flex items-center justify-center'>
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
                <FaPlay className='text-slate-100 text-5xl' />
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
      <div className='flex w-[42%] max-sm:w-full max-sm:relative max-sm:top-12 flex-col items-center justify-center h-screen overflow-scroll'>
        <div className='flex flex-col w-full h-72 gap-1'>
          <div className='flex flex-col w-full h-[266px] p-4 border-b-[2px]'>
            <div className='bg-slate-100 rounded-2xl p-2 w-full h-36 flex flex-col gap-2'>
              <div className='flex items-center justify-between'>
                <Link
                  href={`/profile/${postDetails.userId}`}
                  className='flex items-center gap-2 py-2 w-1/2'>
                  <div className='flex h-10 w-10 rounded-full'>
                    <Image
                      src={postDetails.postedBy.image}
                      alt='user_profile'
                      width={120}
                      height={120}
                      className='flex rounded-full object-cover'
                      style={{
                        maxWidth: "100%",
                        height: "auto",
                        objectFit: "cover",
                      }}
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
                </Link>
                <button
                  type='button'
                  className='w-24 h-9 bg-btnColor text-white capitalize rounded-sm'>
                  follow
                </button>
              </div>
              <div className='flex flex-col'>
                <div>#{postDetails.caption.replace(/\s+/g, "_")}</div>
                <div>audio</div>
              </div>
            </div>
            <div className='flex mt-4 lg:gap-10 gap-7 justify-between p-3 *:rounded-full *:px-2 *:bg-slate-200 *:h-10 *:w-10 max-sm:relative max-sm:gap-5 max-sm:*:text-xs max-sm:*:w-8 max-sm:*:h-8 max-sm:-bottom-3 *:cursor-pointer'>
              <div className='flex items-center justify-center'>
                {session?.user && userProfile ? (
                  <LikeButton
                    likeCounts={postDetails.likes}
                    handleClickLike={() => handleClickLike(true)}
                    handleClickDisLike={() => handleClickLike(false)}
                  />
                ) : (
                  <div
                    onClick={() => signIn()}
                    className='flex items-center justify-center relative'>
                    <FaHeart className='text-lg' />
                    <p className='absolute left-7 text-sm max-sm:text-xs font-semibold leading-7 text-slate-500'>
                      {postDetails.likes !== undefined &&
                      postDetails.likes?.length > 0
                        ? postDetails.likes?.length
                        : ""}
                    </p>
                  </div>
                )}
              </div>
              <div className='flex items-center justify-center relative'>
                <FaCommentDots className='text-lg' />
                <p className='absolute text-sm font-semibold left-11 text-slate-500'>
                  {postDetails.comments !== undefined &&
                  postDetails?.comments?.length > 0
                    ? postDetails?.comments?.length
                    : ""}
                </p>
              </div>
              <div className='flex items-center justify-center'>
                <FaBookmark className='text-lg' />
              </div>
              <div className='flex items-center justify-center'>
                <FaShare className='text-lg' />
              </div>
            </div>
          </div>
        </div>
        <div className='flex w-full h-full flex-col relative'>
          <Comments
            commentsProps={postDetails.comments}
            addComment={addComment}
            setAddComment={setAddComment}
            handleClickAddComment={handleClickAddComment}
            postingComment={postingComment}
            session={session}
          />
        </div>
      </div>
    </div>
  );
};

export default Details;
