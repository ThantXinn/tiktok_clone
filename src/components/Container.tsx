/** @format */

import React from "react";

interface Props {
  children: React.ReactNode;
}
const Container = ({ children }: Props) => {
  return (
    <div
      className={`m-auto relative !important 2xl:w-[1200px] w-full h-[100vh] overflow-scroll`}>
      {children}
    </div>
  );
};

export default Container;
