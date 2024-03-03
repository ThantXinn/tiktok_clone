/** @format */

import Image from "next/image";
import Link from "next/link";
import logo from "../assets/stream_studio.png";

const Navbar = () => {
  return (
    <div className='w-full flex justify-between items-center border-b-2 py-2 px-4 '>
      <Link href={"/"}>
        <div className='w-[80px]'>
          <Image
            className='cursor-pointer rounded'
            src={logo}
            alt='tikknock'
            layout='responsive'
            width={320}
            height={320}
          />
        </div>
      </Link>
    </div>
  );
};

export default Navbar;
