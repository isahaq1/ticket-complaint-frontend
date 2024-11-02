import axiosInstance from '@/utils/axiosInstance';


interface DashboardSummary {
    total_user: number;
    totalComplaint: number;
    total_open: number;
    totalprogess: number;
    totalresolved: number;
    totalclosed: number;
}

export const getDashboardSummary = async (): Promise<DashboardSummary> => {
  try {
    const response = await axiosInstance.get("/dashboard"); // Expected to return { totalUsers: 1234, totalRevenue: 10000, pendingOrders: 50 }
    return response.data.data;
  } catch (error) {
    console.error("Error fetching dashboard summary:", error);
    throw error;
  }
};
