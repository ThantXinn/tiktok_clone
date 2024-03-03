/** @format */

import { sidebar_links } from "@/constants";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Discover = () => {
  const router = useRouter();
  const active_link = router.push;

  const hoverLink =
    "flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold text-[#F51997] rounded";
  const un_hoverLink =
    "flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold text-black rounded";

  return (
    <div>
      <div className='xl:border-b-[1px] border-gray-400 xl:pb-4'>
        {sidebar_links.map((item) => (
          <Link
            href={`/?active_link=${item.name}`}
            key={item.name}>
            <div className={hoverLink}>
              <p className='text-2xl'>{item.hoverIcons}</p>
              <span className='text-xl hidden xl:block'>{item.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Discover;
