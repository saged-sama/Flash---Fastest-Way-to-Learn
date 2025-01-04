"use client";

import { getAnalytics } from "@/lib/course/get-analytics";
import { DataCard } from "./_components/data-card";
import { Chart } from "./_components/chart";
import { useSpringBase } from "@/context/SpringBaseContext";
import { useEffect, useState } from "react";

const TeacherAnalyticsPage = () => {
  const { springbase } = useSpringBase();
  const [analyticsData, setAnalyticsData] = useState<any>({
    data: [],
    totalRevenue: 0,
    totalSales: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!springbase) return;
    const fetchAnalytics = async () => {

      try {
        setLoading(true);
        const analytics = await getAnalytics(springbase);
        setAnalyticsData(analytics);
      } catch (error) {
        console.error("Failed to fetch analytics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [springbase]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const { data, totalRevenue, totalSales } = analyticsData;

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <DataCard label="Total Revenue" value={totalRevenue} format={true} />
        <DataCard label="Total Sales" value={totalSales} format={false} />
      </div>
      <Chart data={data} />
    </div>
  );
};

export default TeacherAnalyticsPage;
