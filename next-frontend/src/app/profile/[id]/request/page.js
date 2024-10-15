import Request from "@/components/request/Request"
export default function request(params) {
    const id = params.params.id;
    // Now we have to fetch the request for a specific id here ..........


    //Temp requests:

    const requests = [
        {
            id: 1,
            sessionId: 54,
            userId: 2,
            description: "Hello, this is a new session request",
            createdAt: "2024-10-01",
            updatedAt: "2024-10-02",
            state: "Pending"
        },
        {
            id: 2,
            sessionId: 5,
            userId: 3,
            description: "Request for session review",
            createdAt: "2024-10-03",
            updatedAt: "2024-10-04",
            state: "Ongoing"
        },
        {
            id: 3,
            sessionId: 6,
            userId: 4,
            description: "Follow-up on previous session",
            createdAt: "2024-10-05",
            updatedAt: "2024-10-06",
            state: "Finished"
        },
        {
            id: 4,
            sessionId: 7,
            userId: 5,
            description: "Need assistance with project . THis project is made for blah blah blah ... and i am doing blah blah blah",
            createdAt: "2024-10-07",
            updatedAt: "2024-10-08",
            state: "Pending"
        },
        {
            id: 5,
            sessionId: 8,
            userId: 6,
            description: "Starting a new learning session",
            createdAt: "2024-10-09",
            updatedAt: "2024-10-10",
            state: "Ongoing"
        },
        {
            id: 6,
            sessionId: 9,
            userId: 7,
            description: "Checking for project updates",
            createdAt: "2024-10-11",
            updatedAt: "2024-10-12",
            state: "Finished"
        },
        {
            id: 7,
            sessionId: 10,
            userId: 8,
            description: "Collaborating on a session",
            createdAt: "2024-10-13",
            updatedAt: "2024-10-14",
            state: "Pending"
        },
        {
            id: 8,
            sessionId: 11,
            userId: 9,
            description: "Assistance needed on module 2",
            createdAt: "2024-10-14",
            updatedAt: "2024-10-15",
            state: "Ongoing"
        },
        {
            id: 9,
            sessionId: 12,
            userId: 10,
            description: "Finishing up the last project",
            createdAt: "2024-10-10",
            updatedAt: "2024-10-11",
            state: "Finished"
        },
        {
            id: 10,
            sessionId: 13,
            userId: 11,
            description: "Request for session feedback",
            createdAt: "2024-10-12",
            updatedAt: "2024-10-13",
            state: "Pending"
        }
    ];

    return (
        <div>
            <h1 className='text-5xl font-extrabold text-center m-10'>Total Request : {requests.length}</h1>

            <div className="flex flex-col w-full items-start text-left gap-5">
                {
                    requests.map(req => {
                        return <Request key={req.id} request={req} />
                    })
                }
            </div>
        </div>
    )
} 
