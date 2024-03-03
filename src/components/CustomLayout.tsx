/** @format */
"use client";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

/** @format */
interface Props {
  children: React.ReactNode;
}

const CustomLayout = ({ children }: Props) => {
  /*
  const [IsSSR, setIsSSR] = useState(true);
  useEffect(() => {
    setIsSSR(false);
  }, []);

  if (IsSSR) return null;
  */

  return (
    <div>
      <Navbar />
      <Sidebar />
      {children}
    </div>
  );
};

export default CustomLayout;
