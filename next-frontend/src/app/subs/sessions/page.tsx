import AllSessions from "@/components/session/allSessions";
import SessionsLayout from "@/components/session/sessionLayout";

export default function Active() {
    const breadcrumbs = [
        {
            title: "Subscripted",
        },
        {
            title: "Sessions"
        },
        {
            title: "Sessions"
        }
    ];
    return (
        <SessionsLayout breadcrumbs={breadcrumbs}>
            <AllSessions />
        </SessionsLayout>
    );
}
