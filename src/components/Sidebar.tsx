/** @format */
"use client";
import { sidebar_links } from "@/utils/constants";
import { useAppSelector } from "@/utils/store/hook";
import { IUser } from "@/utils/types/user";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { ImCancelCircle } from "react-icons/im";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import Discover from "./Discover";
import Footer from "./Footer";
import SignInOutButton from "./SignInOutButton";
import SuggestedAccounts from "./SuggestedAccounts";

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const allUsers = useAppSelector((store) => store.tiknock_clone.allUserInfo);
  const { data: session } = useSession();
  const suggestedUsers = allUsers.filter(
    (item: IUser) => item._id !== session?.user.id,
  );
  const pathname = usePathname();
  const hoverLink =
    "flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold text-[#F51997] rounded";
  const un_hoverLink =
    "flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold text-black rounded";

  const custom_sidebarlinks = () => {
    let element: any[] = [];
    for (let index = 0; index < sidebar_links.length - 1; index++) {
      const item = sidebar_links[index];
      element.push(item);
    }
    return element;
  };
  return (
    <div
      id='side-bar'
      className={`xl:w-400 block`}>
      <div
        className='block xl:hidden m-2 mt-3 ml-4 text-xl cursor-pointer w-12'
        onClick={() => setShowSidebar((prev) => !prev)}>
        {showSidebar ? <ImCancelCircle /> : <AiOutlineMenu />}
      </div>
      {showSidebar && (
        <div className='xl:w-400 w-20 flex flex-col justify-start mb-10 border-r-[1px] h-screen border-gray-200 xl:border-0 p-3'>
          <div className='border-b-[1px] border-gray-200 xl:pb-4'>
            {session?.user ? (
              <>
                {custom_sidebarlinks().map((item) => (
                  <Link
                    href={`${item.href}`}
                    key={item.name}>
                    <div
                      className={
                        pathname === `${item.href}` ? hoverLink : un_hoverLink
                      }>
                      <p className='text-2xl'>
                        {pathname === `${item.href}`
                          ? item.hoverIcons
                          : item.un_hoverIcons}
                      </p>
                      <span className='text-xl hidden xl:block'>
                        {item.name}
                      </span>
                    </div>
                  </Link>
                ))}
                <Link
                  href={`/profile/${session.user.id}`}
                  key={session.user.id}>
                  <div className='flex gap-3 hover:bg-primary p-2 cursor-pointer font-semibold rounded'>
                    <div className='w-8 h-8'>
                      <Image
                        width={34}
                        height={34}
                        className='rounded-full'
                        src={session.user.image!}
                        alt='user-profile'
                      />
                    </div>

                    <div className='hidden xl:block'>
                      <p className='flex gap-1 items-center text-md font-bold text-primary lowercase'>
                        {session.user.name!.replace(/\s+/g, "")}{" "}
                        <RiVerifiedBadgeFill className='text-blue-400' />
                      </p>
                      <p className='capitalize text-gray-400 text-xs'>
                        {session.user.name}
                      </p>
                    </div>
                  </div>
                </Link>
              </>
            ) : (
              sidebar_links.map((item) => (
                <Link
                  href={`${item.href}`}
                  key={item.name}>
                  <div
                    className={
                      pathname === `${item.href}` ? hoverLink : un_hoverLink
                    }>
                    <p className='text-2xl'>
                      {pathname === `${item.href}`
                        ? item.hoverIcons
                        : item.un_hoverIcons}
                    </p>
                    <span className='text-xl hidden xl:block'>{item.name}</span>
                  </div>
                </Link>
              ))
            )}
            <div className='px-2 py-4 hidden xl:flex flex-col items-center justify-center gap-2'>
              {!session?.user && (
                <div>
                  <p className='text-gray-400'>
                    Log in to like and comment on videos
                  </p>
                  <SignInOutButton session={session} />
                </div>
              )}
              <div className='pr-4'>
                <Discover />
                <SuggestedAccounts suggestedUsers={suggestedUsers} />
                <Footer />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
