import { ToasterProvider } from "@/components/providers/toaster-provider";
import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";
import Header from "@/components/common/header/Header";

// const CourseDashboardLayout = ({
//     children
// }: {
//     children: React.ReactNode;
// }) => {
//     return (
//         <div className="h-full">
//             <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
//                 <Navbar/>
//             </div>
//             <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
//                 <Sidebar/>
//             </div>
//             <main className="md:pl-56 pt-[80px] h-full">
//                 <ToasterProvider/>
//                 {children}
//             </main>
//         </div>
//     );
// }

// export default CourseDashboardLayout

const CourseDashboardLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    return (
        <div className="h-full">
            {/* General Header */}
            <div className="fixed top-0 w-full z-50">
                <Header />
            </div>

            {/* Navbar */}
            <div className="h-[80px] md:pl-56 fixed top-[100px] w-full">
                <Navbar />
            </div>

            {/* Sidebar */}
            <div className="hidden md:flex h-full w-56 flex-col fixed top-[110px] z-40">
                <Sidebar />
            </div>

            {/* Main Content */}
            <main className="md:pl-56 pt-[164px] h-full">
                <ToasterProvider />
                {children}
            </main>
        </div>
    );
};

export default CourseDashboardLayout;
