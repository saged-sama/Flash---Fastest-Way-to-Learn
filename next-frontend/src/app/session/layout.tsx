'use client';

export default function SessionLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>){
    return (
        <div className="flex justify-center w-screen h-full">
            {children}
        </div>
    );
}