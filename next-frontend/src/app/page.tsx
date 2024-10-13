import Header from "@/components/common/header/Header";  // Adjust the import path as necessary
import Home from "@/components/home/Home";  // Renaming the Home component to avoid name conflict
import About  from "@/components/about/About";
import CourseHome from "@/components/allcourses/CourseHome";

export default function App() {  // Renaming the page component to avoid conflict
  return (
    <>
      <Header />
      <Home />  {/* Using the renamed component */}
      <About/>
      <CourseHome/>
    </>
  );
}

