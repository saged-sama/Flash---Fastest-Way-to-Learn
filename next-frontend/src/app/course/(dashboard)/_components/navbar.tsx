import { NavbarRoutes } from "@/components/course/navbar-routes";
import { MobileSidebar } from "./mobile-sidebar";
import Header from "@/components/common/header/Header";

// export const Navbar = () => {
//   return (
//     <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
//       <MobileSidebar />
//       <NavbarRoutes />
//     </div>
//   );
// };

export const Navbar = () => {
    return (
      <div className="p-4 h-full flex items-center bg-white">
        <MobileSidebar />
        <NavbarRoutes />
      </div>
    );
  };
  