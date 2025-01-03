import { getAnalytics } from "@/lib/course/get-analytics";
import { getCurrentUser } from "@/lib/utils";
import { DataCard } from "./_components/data-card";
import { Chart } from "./_components/chart";

const TeacherAnalyticsPage = async () => {
    const {data, totalRevenue, totalSales} = await getAnalytics(getCurrentUser());



    return (
        <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <DataCard 
                    label="Total Revenue"
                    value={totalRevenue}
                    format={true}
                />
                <DataCard 
                    label="Total Sales"
                    value={totalSales}
                    format={false}
                />
            </div>
            <Chart 
                data={data}
            />
        </div>
    );
}

export default TeacherAnalyticsPage
