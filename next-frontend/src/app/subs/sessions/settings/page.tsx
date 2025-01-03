import SessionsLayout from "@/components/session/sessionLayout";
import SessionSettings from "@/components/session/sessionSettings";

export default function Settings(){
    const breadcrumbs = [
        {
            title: "Subscripted",
        },
        {
            title: "Sessions"
        },
        {
            title: "Settings"
        }
    ];
    return (
        <SessionsLayout breadcrumbs={breadcrumbs}>
            <SessionSettings />
        </SessionsLayout>
    )
}