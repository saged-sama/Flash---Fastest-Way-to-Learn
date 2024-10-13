interface SessionRequestDTO{
    id: string;
    sessionId: string;
    userId: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    status: string;
}

export default function SessionRequestTile({ request }: { request: SessionRequestDTO }) {
    return (
        <div>
            <h1>Session Request</h1>
        </div>
    );
}   