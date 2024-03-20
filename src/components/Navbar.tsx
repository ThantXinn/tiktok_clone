/** @format */
"use client";
import { useAppDispatch } from "@/utils/store/hook";
import { addUsers } from "@/utils/store/slices/appSlice";
import { signIn, useSession } from "next-auth/react";
import Image from "next/legacy/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { BiMessageAltMinus } from "react-icons/bi";
import { FaPlus } from "react-icons/fa6";
import { PiPaperPlaneTiltBold } from "react-icons/pi";
import logo from "../assets/logo.png";
import SignInOutButton from "./SignInOutButton";

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const dispatch = useAppDispatch();
  useEffect(() => {
    const createOrGetUser = async () => {
      if (session?.user) {
        dispatch(
          addUsers({
            _id: session.user.id,
            _type: "user",
            userName: session.user.name,
            image: session.user.image,
          }),
        );

        await fetch("/api/user", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ session }),
        });
      }
    };
    createOrGetUser();
  }, [session?.user]);
  //console.log(params.id, propsValue);
  return (
    <div
      id='nav-bar'
      className={`w-full justify-between items-center border-b-2 py-2 px-4 gap-3 sticky top-0 bg-white flex z-10 h-16`}>
      <div className='relative w-32 flex justify-center'>
        <Link href={"/"}>
          <div className='relative flex w-full'>
            <Image
              className='cursor-pointer w-20 h-16 max-sm:w-14 max-sm:h-14'
              src={logo}
              alt='tiknock'
              objectFit='contain'
              width={60}
              height={60}
            />
          </div>
        </Link>
      </div>
      <div className=' w-650 h-12 flex items-center justify-center'>
        <div className='border-[1px] rounded-full lg:w-450 md:w-[220px] max-sm:w-[170px] max-sm:h-10 h-12 flex items-center justify-center bg-slate-100'>
          Search
        </div>
      </div>
      <div className='flex gap-2 w-80 items-center justify-between relative right-3 *:cursor-pointer'>
        <button
          type='button'
          onClick={() => (session?.user ? router.push("/upload") : signIn())}
          className='flex gap-4 items-center justify-center border-[1px] rounded-sm w-36 h-10 border-slate-200 max-lg:w-16'>
          <FaPlus className='text-xl font-semibold' />
          <p className='text-lg font-semibold max-lg:hidden'>Upload</p>
        </button>
        <div className='flex gap-2 relative justify-evenly w-1/2 max-lg:hidden'>
          <div>
            <PiPaperPlaneTiltBold className='text-3xl' />
          </div>
          <div>
            <BiMessageAltMinus className='text-3xl' />
          </div>
        </div>
        <div className='flex items-center justify-center group hover:relative'>
          {session?.user ? (
            <div className=''>
              <Image
                src={session.user.image!}
                alt='user_image'
                width={30}
                height={30}
                className='flex rounded-full w-10 h-10'
              />
              <div className='hidden group-hover:flex items-center justify-center absolute -left-10 top-8 h-20'>
                <SignInOutButton session={session} />
              </div>
            </div>
          ) : (
            <SignInOutButton session={session} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
