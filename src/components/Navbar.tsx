/** @format */
"use client";
import { useAppDispatch } from "@/utils/store/hook";
import { addUsers } from "@/utils/store/slices/appSlice";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { BiMessageAltMinus } from "react-icons/bi";
import { FaPlus } from "react-icons/fa6";
import { RiSendPlaneFill } from "react-icons/ri";
import logo from "../assets/stream_studio.png";

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const params = useParams();
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
  return (
    <div
      className={`w-full justify-between items-center border-b-2 py-2 px-4 gap-3 sticky top-0 bg-white ${
        params.id ? "hidden" : "flex z-10"
      }`}>
      <div className='w-400'>
        <Link href={"/"}>
          <div className='w-[80px]'>
            <Image
              className='cursor-pointer rounded'
              src={logo}
              alt='tikknock'
              width={320}
              height={320}
            />
          </div>
        </Link>
      </div>
      <div className=' w-650 h-12 flex items-center justify-center'>
        <div className='border-[1px] rounded-full w-450 h-12 flex items-center justify-center'>
          Search
        </div>
      </div>
      <div className='flex gap-2 w-72 items-center justify-center'>
        <button
          type='button'
          onClick={() => (session?.user ? router.push("/upload") : signIn())}
          className='flex gap-2 items-center justify-center border-[1px] rounded-sm w-36 h-10 border-slate-200'>
          <FaPlus className='text-xl font-semibold' />
          <p className='text-lg font-semibold'>Upload</p>
        </button>
        <div className='flex gap-2'>
          <div>
            <RiSendPlaneFill />
          </div>
          <div>
            <BiMessageAltMinus />
          </div>
          <div>
            <p>{session?.user?.name}</p>
          </div>
        </div>
        <button
          onClick={() => (session?.user ? signOut() : signIn())}
          className='flex items-center justify-center bg-btnColor w-20 h-10 rounded-md'>
          {session?.user ? "Sign Out" : "Sign In"}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
