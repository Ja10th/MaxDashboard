'use client'
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { IoDocumentsSharp } from "react-icons/io5";
import { MdAssignment, MdAssignmentTurnedIn } from "react-icons/md";
import { RiInboxUnarchiveFill } from "react-icons/ri";
import { SiFiles } from "react-icons/si";
import Documents from "./documents/page";
import Files from "./files/page";
import Assigned from "./assigned/page";
import CheckedOut from "./checkedout/page";
import UnIndexed from "./unindexed/page";
import Dashboard from "./Dashboard";
import { GeneralContext } from "./context/General";
import NavBar from "./components/NavBar";

const sidebarItems = [
  { name: "Dashboard", icon: <AiOutlineHome />, route: "/" },
  { name: "Documents Collection", icon: <IoDocumentsSharp />, route: "/documents" },
  { name: "Favourite Files", icon: <SiFiles />, route: "/files" },
  { name: "Assigned to Me", icon: <MdAssignment />, route: "/assigned" },
  { name: "Checked Out", icon: <MdAssignmentTurnedIn />, route: "/checkedout" },
  { name: "Unindexed Files", icon: <RiInboxUnarchiveFill />, route: "/unindexed" },
];

export default function Home() {
  const router = useRouter()
  const pathname = usePathname()
  const [activeItem, setActiveItem] = useState<string>("Dashboard");
  const [currentPath, setCurrentPath] = useState(pathname);
  const generalContext = useContext(GeneralContext)
  if (!generalContext){
    throw new Error ("Context error")
  }

  const {isOpened, setIsOpened} = generalContext
  useEffect(() => {
    const handleResize = () => {
      setIsOpened(window.innerWidth >= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); 

  const handleItemClick = (item: string, route: string) => {
    setActiveItem(item);
    setCurrentPath(route);
    // setIsOpened(false); // Close sidebar on item click in mobile
  };

  const renderContent = () => {
    switch (currentPath) {
      case "/":
        return <Dashboard />;
      case "/documents":
        return <Documents />;
      case "/files":
        return <Files />;
      case "/assigned":
        return <Assigned />;
      case "/checkedout":
        return <CheckedOut />;
      case "/unindexed":
        return <UnIndexed />;
      default:
        return <div>404 - Page Not Found</div>;
    }
  };
  return (
   <>
   <div className="flex">
      <aside className={`bg-[#333547] h-screen ${isOpened ? 'w-[240px]' : 'w-16'}`}>
      <div>
        {isOpened ? (
          <div>
            <img src="logomax.png" alt="" />
          </div>
        ) : (
          <div className="h-8 w-8 bg-white border border-blue-500">

          </div>
        )}
      </div>
      <div className="">
          {sidebarItems.map(({ name, icon, route }) => (
            <div
              key={name}
              className={`flex items-center gap-x-3 px-6 py-4 text-[14px] rounded-md cursor-pointer ${
                activeItem === name
                    ? "bg-[#1b1c25] text-white py-4"
                    : " text-gray-200"
              }`}
              onClick={() => handleItemClick(name, route)}
            >
              <div className="relative flex items-center">
                {icon}
                {isOpened && <p className="ml-2">{name}</p>}
            </div>
            </div>
          ))}
         
        </div>
    </aside>
    <main className="flex-grow">
      <NavBar />
        {renderContent()}
    </main>
   </div>
   </>
  );
}
