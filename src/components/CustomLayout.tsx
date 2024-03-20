/** @format */
"use client";

import { useAppDispatch } from "@/utils/store/hook";
import { fetchAllUsers } from "@/utils/store/slices/appSlice";
import { useEffect } from "react";

interface Props {
  children: React.ReactNode;
  postId?: string | string[];
}

const CustomLayout = ({ children, postId }: Props) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAllUsers({}));
  });
  return (
    <div
      id='custom_layout'
      className={`${
        postId
          ? "w-screen right-0 -top-[110px]"
          : "w-[75%] max-sm:w-[86%] top-[110px] max-lg:left-12"
      } absolute max-lg:w-[93%] right-0`}>
      {children}
    </div>
  );
};

export default CustomLayout;
