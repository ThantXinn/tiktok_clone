/** @format */

import { footerList1, footerList2, footerList3 } from "@/utils/constants";

const FooterList = ({ items, mt }: { items: string[]; mt: boolean }) => (
  <div className={`flex flex-wrap gap-2 ${mt && "mt-5"} `}>
    {items.map((item) => (
      <p
        key={item}
        className='text-gray-400 text-sm hover:underline cursor-pointer'>
        {item}
      </p>
    ))}
  </div>
);
const Footer = () => {
  return (
    <div className='mt-6 p-3 xl:block'>
      <FooterList
        items={footerList1}
        mt={false}
      />
      <FooterList
        items={footerList2}
        mt
      />
      <FooterList
        items={footerList3}
        mt
      />
    </div>
  );
};

export default Footer;
