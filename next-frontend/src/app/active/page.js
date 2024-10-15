import ActiveSession from "@/components/activeSession/activeSessions";

export default function Active() {

    const activeList = [
        {
            id: 1,
            instructor: "Sarower Jahan Rafin",
            topic: "Machine Learning",
            price: "$49/hour",
            photoUrl: "https://cdn.pixabay.com/photo/2024/02/09/16/37/ai-generated-8563397_960_720.png"
        },
        {
            id: 2,
            instructor: "Sarower Jahan Rafin",
            topic: "Data Science",
            price: "$49/hour",
            photoUrl: "https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
        },
        {
            id: 3,
            instructor: "John Doe",
            topic: "Artificial Intelligence",
            price: "$59/hour",
            photoUrl: "https://media.istockphoto.com/id/1160926571/photo/portrait-of-male-elementary-school-teacher-standing-in-classroom.jpg?s=2048x2048&w=is&k=20&c=vviOvXdZnkq9uc1GT7bXrNj43x3EUelKpQlgMxMIBhg="
        },
        {
            id: 4,
            instructor: "Jane Smith",
            topic: "Deep Learning",
            price: "$55/hour",
            photoUrl: "https://cdn.pixabay.com/photo/2024/09/05/20/13/ai-generated-9026023_960_720.jpg"
        },
        {
            id: 5,
            instructor: "Emily Davis",
            topic: "Natural Language Processing",
            price: "$60/hour",
            photoUrl: "https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
        },
        {
            id: 6,
            instructor: "Michael Brown",
            topic: "Computer Vision",
            price: "$62/hour",
            photoUrl: "https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
        },
        {
            id: 7,
            instructor: "Linda Johnson",
            topic: "Reinforcement Learning",
            price: "$58/hour",
            photoUrl: "https://cdn.pixabay.com/photo/2024/04/09/03/24/man-8684920_1280.jpg"
        },
        {
            id: 8,
            instructor: "David Wilson",
            topic: "Big Data Analytics",
            price: "$50/hour",
            photoUrl: "https://media.istockphoto.com/id/1468138682/photo/happy-elementary-teacher-in-front-of-his-students-in-the-classroom.jpg?s=2048x2048&w=is&k=20&c=t4IHUSfyRczWv7Fm6eh0Qxfs5u805cNSyVc3PSxsdMY="
        },
        {
            id: 9,
            instructor: "Susan Lee",
            topic: "Robotics",
            price: "$65/hour",
            photoUrl: "https://cdn.pixabay.com/photo/2023/01/29/08/07/man-7752631_1280.jpg"
        },
        {
            id: 10,
            instructor: "Kevin White",
            topic: "Cloud Computing",
            price: "$55/hour",
            photoUrl: "https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
        },
        {
            id: 11,
            instructor: "Sophia Martinez",
            topic: "Quantum Computing",
            price: "$70/hour",
            photoUrl: "https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
        },
        {
            id: 12,
            instructor: "Chris Anderson",
            topic: "Internet of Things (IoT)",
            price: "$57/hour",
            photoUrl: "https://cdn.pixabay.com/photo/2023/01/29/08/07/man-7752631_1280.jpg"
        }
    ];

    return (
        <div className="my-10">

            <div className="flex items-center justify-center py-20">
                <h1 className="text-6xl text-center "> Active Sessions </h1>
                {/* Blinking green signal */}
                <div className="w-4 h-4 ml-4 bg-green-500 rounded-full animate-blink "></div>
            </div>

            <div className="container mx-auto grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-5">
                {
                    activeList.map(item => (
                        <ActiveSession key={item.id} {...item}></ActiveSession>
                    ))
                }
            </div>

        </div>
    );
}
