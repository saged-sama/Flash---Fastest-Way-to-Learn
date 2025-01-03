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

export default function Title({ fontsize }: { fontsize: number }) {
    return (
        <Link href="/" className={`logo ${abel.className} container mx-auto`}>
            <h1
                style={{ fontSize: `${fontsize}px` }}
                className="font-extrabold text-orange-300"
            >
                FLASH
            </h1>
            <span>Learn Anything Faster Than Ever</span>
        </Link>
    );
}