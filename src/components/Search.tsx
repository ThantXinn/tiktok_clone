/** @format */
"use client";
import LikeButton from "@/components/LikeButton";
import NoResult from "@/components/NoResult";
import VideoCard from "@/components/VideoCard";
import { config } from "@/utils/config";
import { searchPostsQuery } from "@/utils/groq";
import { useAppSelector } from "@/utils/store/hook";
import { IUser } from "@/utils/types/user";
import { Video } from "@/utils/types/video";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaUserSlash } from "react-icons/fa";
import { MdOutlineVideocamOff } from "react-icons/md";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { client } from "../../sanity/lib/client";

const Search = ({ videos, video }: { videos?: Video[]; video?: Video }) => {
  const params = useParams();
  const { data: session } = useSession();
  //decodeURI is used for convert special character format(eg:%20=>space) to normal format
  const searchValue = decodeURI(params.slug.toString());
  const [activeAccountTab, setActiveAccountTab] = useState<boolean>(true);
  const [serachResult, setSearchResult] = useState<Video[]>(videos!);
  const [postDetails, setPostDetails] = useState<Video>(video!);
  const { allUserInfo } = useAppSelector((store) => store.tiknock_clone);
  const searchAccountResult = allUserInfo.filter((item: IUser) =>
    item.userName
      .toString()
      .toLowerCase()
      .includes(searchValue.toString().toLowerCase()),
  );
  //console.log(searchValue);
  const videosTab = activeAccountTab
    ? "border-b-2 border-black"
    : "text-gray-400";
  const accountTab = !activeAccountTab
    ? "border-b-2 border-black"
    : "text-gray-400";

  useEffect(() => {
    const fetch_searchResult = async () => {
      const res: Video[] = await client.fetch(searchPostsQuery(searchValue));
      setSearchResult(res);
    };
    fetch_searchResult();
  }, [searchValue, postDetails]);

  //onClickLike function
  const handleClickLike = async (like: boolean) => {
    if (session) {
      serachResult.map(async (item) => {
        const res = await fetch(`${config.apiBaseUrl}/api/like`, {
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

  if (!serachResult) return null;
  return (
    <div
      id='search_'
      className='w-[95%] px-3 py-2 ml-8'>
      <div className='flex gap-10 mb-10 mt-3 border-b-2 border-gray-200 bg-white w-full'>
        <p
          className={`text-xl font-semibold cursor-pointer ${videosTab} mt-2`}
          onClick={() => setActiveAccountTab(true)}>
          Accounts
        </p>
        <p
          className={`text-xl font-semibold cursor-pointer ${accountTab} mt-2`}
          onClick={() => setActiveAccountTab(false)}>
          Videos
        </p>
      </div>
      {activeAccountTab ? (
        <div className='relative -top-10'>
          {searchAccountResult.length > 0 ? (
            searchAccountResult.map((user: IUser) => (
              <Link
                key={user._id}
                href={`/profile/${user._id}`}>
                <div className='flex gap-4 hover:bg-primary py-4 px-2 cursor-pointer font-semibold rounded items-center'>
                  <Image
                    width={34}
                    height={34}
                    className='rounded-full w-16 h-16'
                    src={user.image}
                    alt='user-profile'
                  />

                  <div>
                    <p className='flex gap-1 items-center text-md font-semibold text-primary lowercase'>
                      {user.userName.replace(/\s+/g, "")}{" "}
                      <RiVerifiedBadgeFill className='text-blue-400' />
                    </p>
                    <p className='capitalize text-gray-400 font-medium text-xs'>
                      {user.userName}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <NoResult
              messageProps={`There is no ${searchValue} accounts`}
              icons={<FaUserSlash />}
            />
          )}
        </div>
      ) : (
        <div className='relative -top-10'>
          {serachResult.length ? (
            serachResult.map((video: Video) => (
              <div
                key={video._id}
                className='absolute'>
                <VideoCard
                  className='relative left-16 max-lg:left-0'
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
              messageProps={`There is no ${searchValue} Videos`}
              icons={<MdOutlineVideocamOff />}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
