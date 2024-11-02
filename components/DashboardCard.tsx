import React from "react";

interface DashboardCardProps {
  title: string;
  value: string | number;
  description: string;
  bgColor?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  description,
  bgColor = "bg-white",
}) => {
  return (
    <div className={`${bgColor} shadow-md rounded-lg p-6`}>
      <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
      <p className="text-3xl font-bold text-blue-600 mt-2">{value}</p>
      <p className="text-gray-500 mt-1">{description}</p>
    </div>
  );
};

export default DashboardCard;
