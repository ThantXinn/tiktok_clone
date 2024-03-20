/** @format */

import { signIn, signOut } from "next-auth/react";

interface Props {
  session: any;
}
const SignInOutButton = ({ session }: Props) => {
  return (
    <div>
      <button
        onClick={() => (session?.user ? signOut() : signIn())}
        className='flex items-center justify-center bg-btnColor w-20 h-10 rounded-md'>
        {session?.user ? "Log Out" : "Log In"}
      </button>
    </div>
  );
};

export default SignInOutButton;
