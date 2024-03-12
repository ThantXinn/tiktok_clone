/** @format */
import { useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { ImCancelCircle } from "react-icons/im";

import { sidebar_links } from "@/utils/constants";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import Discover from "./Discover";
import Footer from "./Footer";

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const userLogin = false;
  const pathname = usePathname();
  const params = useParams();

  useEffect(() => {
    //console.log(pathname);
  }, [pathname]);

  const hoverLink =
    "flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold text-[#F51997] rounded";
  const un_hoverLink =
    "flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold text-black rounded";

  return (
    <div className={`xl:w-400 ${params.id ? "hidden" : "block"}`}>
      <div
        className='block xl:hidden m-2 mt-3 ml-4 text-xl cursor-pointer'
        onClick={() => setShowSidebar((prev) => !prev)}>
        {showSidebar ? <ImCancelCircle /> : <AiOutlineMenu />}
      </div>
      {showSidebar && (
        <div className='xl:w-400 w-20 flex flex-col justify-start mb-10 border-r-[1px] h-screen border-gray-200 xl:border-0 p-3'>
          <div className='border-b-[1px] border-gray-200 xl:pb-4'>
            {sidebar_links.map((item) => (
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
            ))}
          </div>
          {!userLogin && (
            <div className='px-2 py-4 hidden xl:block'>
              <p className='text-gray-400'>
                Log in to like and comment on videos
              </p>
              <div className='pr-4'>
                <Discover />
                <Footer />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
