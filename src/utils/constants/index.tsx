/** @format */

import { BsCode, BsEmojiSunglasses } from "react-icons/bs";
import { FaCode, FaGamepad, FaMedal, FaPaw } from "react-icons/fa";
import { GiCakeSlice, GiGalaxy, GiLipstick } from "react-icons/gi";
import { GoHome, GoHomeFill } from "react-icons/go";
import { MdExplore, MdOutlineCamera, MdOutlineExplore } from "react-icons/md";
import {
  RiGroupFill,
  RiGroupLine,
  RiLiveFill,
  RiLiveLine,
  RiUserFill,
  RiUserFollowFill,
  RiUserFollowLine,
  RiUserLine,
} from "react-icons/ri";

export const sidebar_links = [
  {
    name: "For You",
    href: "/",
    hoverIcons: <GoHomeFill />,
    un_hoverIcons: <GoHome />,
  },
  {
    name: "Following",
    href: "/following",
    hoverIcons: <RiUserFollowFill />,
    un_hoverIcons: <RiUserFollowLine />,
  },
  {
    name: "Friends",
    href: "/friends",
    hoverIcons: <RiGroupFill />,
    un_hoverIcons: <RiGroupLine />,
  },
  {
    name: "Explore",
    href: "/explore",
    hoverIcons: <MdExplore />,
    un_hoverIcons: <MdOutlineExplore />,
  },
  {
    name: "LIVE",
    href: "/live",
    hoverIcons: <RiLiveFill />,
    un_hoverIcons: <RiLiveLine />,
  },
  {
    name: "Profile",
    href: "/profile",
    hoverIcons: <RiUserFill />,
    un_hoverIcons: <RiUserLine />,
  },
];

export const topics = [
  {
    name: "development",
    icon: <BsCode />,
  },
  {
    name: "coding",
    icon: <FaCode />,
  },
  {
    name: "comedy",
    icon: <BsEmojiSunglasses />,
  },
  {
    name: "gaming",
    icon: <FaGamepad />,
  },
  {
    name: "food",
    icon: <GiCakeSlice />,
  },
  {
    name: "dance",
    icon: <GiGalaxy />,
  },
  {
    name: "beauty",
    icon: <GiLipstick />,
  },
  {
    name: "photos",
    icon: <MdOutlineCamera />,
  },
  {
    name: "animals",
    icon: <FaPaw />,
  },
  {
    name: "sports",
    icon: <FaMedal />,
  },
];

export const footerList1 = [
  "About",
  "Newsroom",
  "Store",
  "Contact",
  "Carrers",
  "ByteDance",
  "Creator Directory",
];
export const footerList2 = [
  "TikTik for Good",
  "Advertise",
  "Developers",
  "Transparency",
  "TikTik Rewards",
];
export const footerList3 = [
  "Help",
  "Safety",
  "Terms",
  "Privacy",
  "Creator Portal",
  "Community Guidelines",
];
