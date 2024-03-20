/** @format */
import { useAppSelector } from "@/utils/store/hook";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa6";

interface Props {
  handleClickLike?: () => void;
  handleClickDisLike?: () => void;
  likeCounts: any[];
  className?: string;
}
const LikeButton = ({
  handleClickLike,
  handleClickDisLike,
  likeCounts,
  className,
}: Props) => {
  const userProfiles = useAppSelector((store) => store.tiknock_clone.userInfo);

  const [liked, setLiked] = useState(false);
  const filterLikes = likeCounts?.filter(
    (item) => item._ref === userProfiles?._id,
  );
  useEffect(() => {
    //console.log(filterLikes, likeCounts);
    if (
      filterLikes !== undefined &&
      filterLikes !== null &&
      filterLikes.length > 0
    ) {
      //console.log(filterLikes.length);
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [filterLikes, likeCounts]);
  //console.log(liked, likeCounts);
  return (
    <div
      className={`relative flex items-center justify-center top-[2px] ${
        likeCounts !== null && likeCounts?.length > 0 ? "left-1" : "left-0"
      }`}>
      {liked ? (
        <div
          onClick={handleClickDisLike}
          className={`relative text-btnColor text-lg md:text-xl rounded-full flex items-center justify-center cursor-pointer `}>
          <FaHeart />
        </div>
      ) : (
        <div
          onClick={handleClickLike}
          className={`relative text-lg md:text-xl rounded-full flex items-center justify-center cursor-pointer  text-black`}>
          <FaHeart />
        </div>
      )}
      <p
        className={`${
          className !== undefined && className?.length > 0
            ? `${className}`
            : "relative text-sm font-semibold left-4 "
        } text-slate-500`}>
        {likeCounts?.length > 0 && likeCounts.length}
      </p>
    </div>
  );
};
export default LikeButton;
