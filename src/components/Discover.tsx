/** @format */
"use client";
import { topics } from "@/utils/constants";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
//swiper ref => https://swiperjs.com/demos#css-mode
import "swiper/css";
import "swiper/css/navigation";
// import required modules
import { Keyboard, Mousewheel, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

/** @format */
interface Props {
  className?: string;
}
const Discover = ({ className }: Props) => {
  const searchParams = useSearchParams();
  const topic = searchParams.get("topic");

  const activeTopicStyle =
    " bg-slate-100 hover:bg-primary xl:border-[#F51997] px-3 py-2 rounded xl:rounded-md flex items-center gap-2 justify-center cursor-pointer text-[#F51997]";
  const topicStyle =
    " bg-slate-100 hover:bg-primary xl:border-gray-300 px-3 py-2 rounded xl:rounded-md flex items-center gap-2 justify-center cursor-pointer text-black";

  return (
    <div
      className={`${
        className ? className : "hidden xl:border-b-2 xl:border-gray-200 pb-6"
      }`}>
      <p
        className={`${
          className
            ? "hidden"
            : "text-gray-500 font-semibold m-3 mt-4 hidden xl:block"
        }`}>
        Popular Topics
      </p>
      <div
        className={`flex gap-3 ${
          className ? "flex-nowrap py-5" : "flex-wrap"
        }`}>
        <Swiper
          cssMode={true}
          navigation={true}
          pagination={false}
          mousewheel={true}
          keyboard={true}
          modules={[Navigation, Pagination, Mousewheel, Keyboard]}
          className='mySwiper'>
          {topics?.map((item) => (
            <SwiperSlide key={item.name}>
              <Link href={`explore/?topic=${item.name}`}>
                <div
                  className={
                    topic === item.name ? activeTopicStyle : topicStyle
                  }>
                  <span className='font-bold text-xl xl:text-md '>
                    {item.icon}
                  </span>
                  <span
                    className={`font-medium text-md hidden xl:block capitalize`}>
                    {item.name}
                  </span>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Discover;
