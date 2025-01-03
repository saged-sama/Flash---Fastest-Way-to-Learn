import React from "react";
import { Bebas_Neue, Abel } from 'next/font/google';
import Link from 'next/link';

const bebasNeue = Bebas_Neue({
  weight: '400', // Set the font weight to 400 (regular)
  subsets: ['latin'], // Specify the character subsets 
  display: 'swap', // Improve initial page load performance
});

const abel = Abel({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

interface HeadingProps {
  subtitle: string;
  title: string;
}

const Heading: React.FC<HeadingProps> = ({ subtitle, title }) => {
  return (
    <>
      <div id="heading">
        <h3 className={`logo ${bebasNeue.className}  text-6xl font-extrabold`} > {subtitle}</h3>
        {/* <h1 className="">{title}</h1> */}
      </div >
    </>
  );
};

export default Heading;
