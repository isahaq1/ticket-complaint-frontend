import React from "react";

interface ComplaintDetailsProps {
  title: string;
  description: string;
  complaint_by:string;
  priority:string;
  complaint_at:string;
  category:string;
  status:string;
}

const ComplaintDetails: React.FC<ComplaintDetailsProps> = ({ title, description ,complaint_by,priority,complaint_at,category,status}) => (
  <div className="p-4 border rounded-md shadow-md bg-white mb-4">
    <h2 className="text-xl font-bold">{title}</h2>
    <h3 className="text-sm font-bold">Complaint By: {complaint_by}</h3>
    <h3 className="text-sm font-bold">Complaint AT: {complaint_at}</h3>
    <h3 className="text-sm font-bold">Priority: {priority}</h3>
    <h3 className="text-sm font-bold">Category: {category}</h3>
    <h3 className="text-sm font-bold">Status: {status}</h3>
    <p className="mt-2 text-gray-600">{description}</p>
  </div>
);

export default ComplaintDetails;
