'use client'
import Home from "../components/home/Home";  // Renaming the Home component to avoid name conflict
import About from "../components/about/About";
import CourseHome from "../components/allcourses/CourseHome";
import Header from "@/components/common/header/Header";

const App: React.FC = () => {  // Renaming the page component to avoid conflict
  return (
    <div>
      <Header />
      <Home />  {/* Using the renamed component */}
      <About />
      <CourseHome />
    </div>
  );
}

export default App;