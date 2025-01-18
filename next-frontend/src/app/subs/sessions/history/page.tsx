import SessionHistory from "@/components/session/SessionHistory"
import SessionsLayout from "@/components/session/sessionLayout"

export default function History() {
    const breadcrumbs = [
        {
            title: "Subscripted",
        },
        {
            title: "Sessions"
        },
        {
            title: "History"
        }
    ]
    return (
        <SessionsLayout breadcrumbs={breadcrumbs}>
            <SessionHistory />
        </SessionsLayout>
    )
}