/** @format */

import { IComments } from "@/utils/types/comments";

/** @format */
interface Props {
  comments: IComments[];
}
const Comments = () => {
  //if (!comments) return null;

  return (
    <div>
      <div>
        <p className='text-lg font-medium text-black'>comment</p>
      </div>
    </div>
  );
};
export default Comments;
