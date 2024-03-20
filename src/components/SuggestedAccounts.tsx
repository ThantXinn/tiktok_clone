/** @format */

import { IUser } from "@/utils/types/user";
import Image from "next/image";
import Link from "next/link";
import { RiVerifiedBadgeFill } from "react-icons/ri";

interface Props {
  suggestedUsers: IUser[];
}
const SuggestedAccounts = ({ suggestedUsers }: Props) => {
  const users = suggestedUsers
    .map((item) => item)
    .sort(() => 0.5 - Math.random())
    .slice(0, suggestedUsers.length);

  return (
    <div className='xl:border-b-2 border-gray-200 pb-4'>
      <p className='text-gray-500 font-semibold m-3 mt-4 hidden xl:block'>
        Suggested accounts
      </p>
      <div>
        {users?.slice(0, 6).map((user: IUser) => (
          <Link
            href={`/profile/${user._id}`}
            key={user._id}>
            <div className='flex gap-3 hover:bg-primary p-2 cursor-pointer font-semibold rounded'>
              <div className='w-8 h-8'>
                <Image
                  width={34}
                  height={34}
                  className='rounded-full'
                  src={user.image}
                  alt='user-profile'
                />
              </div>

              <div className='hidden xl:block'>
                <p className='flex gap-1 items-center text-md font-bold text-primary lowercase'>
                  {user.userName.replace(/\s+/g, "")}{" "}
                  <RiVerifiedBadgeFill className='text-blue-400' />
                </p>
                <p className='capitalize text-gray-400 text-xs'>
                  {user.userName}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SuggestedAccounts;
