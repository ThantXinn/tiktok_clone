/** @format */

import React from "react";

interface Props {
  children: React.ReactNode;
}
const Container = ({ children }: Props) => {
  return <div className='max-lg:mx-auto'>{children}</div>;
};

export default Container;