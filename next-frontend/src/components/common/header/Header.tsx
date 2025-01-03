"use client";

import Head from "./Head";  // Custom Head component
import Navbar from "./Navbar";

const Header: React.FC = () => {

  return (
    <div className=''>
      < Head />
      <Navbar />
    </div>
  );
};

export default Header;
