/** @format */

interface Props {
  messageProps: string;
  icons: JSX.Element;
}
const NoResult = ({ messageProps, icons }: Props) => {
  return (
    <div className='flex p-4 flex-col items-center justify-center gap-2 h-full'>
      <p className='text-8xl max-lg:text-6xl font-normal'>{icons}</p>
      <p className='text-lg font-normal'>{messageProps}</p>
    </div>
  );
};

export default NoResult;
