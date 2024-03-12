/** @format */
interface Props {
  children: React.ReactNode;
  postId?: string | string[];
}

const CustomLayout = ({ children, postId }: Props) => {
  return (
    <div
      className={`${
        postId
          ? "w-screen right-0 -top-[68px]"
          : "w-[75%] max-lg:left-10 top-[68px]"
      } absolute max-lg:w-full right-0`}>
      {children}
    </div>
  );
};

export default CustomLayout;
