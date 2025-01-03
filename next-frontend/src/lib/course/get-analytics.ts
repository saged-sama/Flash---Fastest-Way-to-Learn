import { error } from "console";
import { getPurchase } from "./purchase";

const groupByCourse = (purchases: any[]) => {
    const grouped: { [courseTitle: string]: number} = {};

    purchases.forEach((purchase) => {
        const courseTitle = purchase.course.title;
        if (!grouped[courseTitle]) {
            grouped[courseTitle] = 0;
        }
        grouped[courseTitle] += purchase.course.price;
    });
    return grouped;
}

export const getAnalytics = async (userId: string) => {
    try {
        const purchases = await getPurchase(userId);
        const groupedEarnings = groupByCourse(purchases);
        
        const data = Object.entries(groupedEarnings).map(([courseTitle, total]) => ({
            name: courseTitle,
            total: total,
        }));

        const totalRevenue = data.reduce((acc, curr) => acc + curr.total, 0);
        const totalSales = purchases.length;

        return {
            data,
            totalRevenue,
            totalSales
        }

    } catch(error) {
        console.log("[GET_ANALYTICS: ", error)
        return {
            data: [],
            totalRevenue: 0,
            totalSales: 0
        }
    }
}