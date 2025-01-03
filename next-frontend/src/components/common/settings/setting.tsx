export default function Setting({ title, input, description }: { title: string, input: React.ReactNode, description?: string }) {
    return (
        <div className="flex justify-between border-b w-full px-5 py-5">
            <div className="w-1/6 flex items-start justify-start px-3">
                <h1 className="font-bold">
                    {title}
                </h1>
            </div>
            <div className="flex flex-col w-5/6 px-3">
                {input}
                <p>{description}</p>
            </div>
        </div>
    );

}