/** @format */
"use client";
import { useSession } from "next-auth/react";

const Profile = () => {
  const { data: session } = useSession();
  return <div>{session?.user.name}</div>;
};
export default Profile;
