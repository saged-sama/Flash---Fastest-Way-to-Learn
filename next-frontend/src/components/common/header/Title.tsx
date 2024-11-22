import Link from "next/link";

export default function Title({ fontsize }: { fontsize: number }) {
    return (
        <Link href="/" className="logo">
            <h1 style={{ fontSize: `${fontsize}px`, fontWeight: 'bold' }}>FLASH</h1>
            <span>Learn Anything Faster Than Ever</span>
        </Link>
    )
}
