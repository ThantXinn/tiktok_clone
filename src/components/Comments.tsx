/** @format */

import { useAppSelector } from "@/utils/store/hook";
import { IComments } from "@/utils/types/comments";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { BiMessageX } from "react-icons/bi";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import NoResult from "./NoResult";

/** @format */
interface Props {
  commentsProps: IComments[];
  addComment: string;
  setAddComment: Dispatch<SetStateAction<string>>;
  handleClickAddComment: (e: React.FormEvent) => void;
  postingComment: boolean;
  session?: Session | null;
}
const Comments = ({
  commentsProps,
  addComment,
  setAddComment,
  handleClickAddComment,
  postingComment,
  session,
}: Props) => {
  const { userInfo: userProfile, allUserInfo } = useAppSelector(
    (store) => store.tiknock_clone,
  );

  return (
    <div className=' border-gray-200 pt-4 px-10 bg-[#F8F8F8] border-b-2 lg:pb-0 pb-[100px]'>
      <div className='overflow-scroll lg:h-[457px]'>
        {commentsProps !== null ? (
          <div>
            {commentsProps.map((comments, index) => (
              <div key={index}>
                {allUserInfo.map(
                  (userInfo) =>
                    userInfo._id ===
                      (comments.postedBy._id || comments.postedBy._ref) && (
                      <div
                        className='p-2'
                        key={userInfo._id}>
                        <div>
                          <Link
                            href={`/profile/${userInfo._id}`}
                            key={userInfo._id}>
                            <div className='flex gap-2 hover:bg-primary p-2 cursor-pointer font-semibold rounded'>
                              <div className='w-8 h-8'>
                                <Image
                                  width={34}
                                  height={34}
                                  className='rounded-full'
                                  src={userInfo.image}
                                  alt='user-profile'
                                />
                              </div>

                              <div className='hidden xl:block'>
                                <p className='flex gap-1 items-center text-md font-semibold text-primary lowercase'>
                                  {userInfo.userName.replace(/\s+/g, "")}{" "}
                                  <RiVerifiedBadgeFill className='text-blue-400' />
                                </p>
                                <p className='capitalize text-gray-400 font-medium text-xs'>
                                  {userInfo.userName}
                                </p>
                              </div>
                            </div>
                          </Link>
                          <p className='-mt-2 ml-12 font-light'>
                            {comments.comment}
                          </p>
                        </div>
                      </div>
                    ),
                )}
              </div>
            ))}
          </div>
        ) : (
          <NoResult
            messageProps='No comment yet.'
            icons={<BiMessageX />}
          />
        )}
        {userProfile && (
          <div className='absolute bottom-0 left-0 px-2 md:px-10 w-full flex items-center justify-center border-t-2 h-24 bg-white'>
            {session?.user ? (
              <form
                onSubmit={handleClickAddComment}
                className='flex gap-4 w-full'>
                <input
                  value={addComment}
                  onChange={(e) => setAddComment(e.target.value)}
                  placeholder='Add comment..'
                  className='bg-primary px-6 py-2 font-light border-2 w-full rounded-lg focus:outline-none focus:border-2 focus:border-gray-300 flex-1 border-slate-100'
                />
                <button
                  type='button'
                  onClick={handleClickAddComment}
                  className=''>
                  {postingComment ? "Posting" : "Post"}
                </button>
              </form>
            ) : (
              <div
                onClick={() => signIn()}
                className='bg-primary px-6 py-2 font-light border-2 w-full rounded-lg focus:outline-none focus:border-2 focus:border-gray-300 flex-1 border-slate-100 h-11 text-btnColor cursor-pointer'>
                Log in to comment
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default Comments;
