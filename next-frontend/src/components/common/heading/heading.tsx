import React from "react";

interface HeadingProps {
  subtitle: string;
  title: string;
}

const Heading: React.FC<HeadingProps> = ({ subtitle, title }) => {
  return (
    <>
      <div id="heading">
        <h3>{subtitle}</h3>
        <h1>{title}</h1>
      </div>
    </>
  );
};

export default Heading;
