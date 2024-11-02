"use client"
import React, { useEffect, useState } from "react";
import ComplaintDetails from "@/components/complaint/ComplaintDetails";
import CommentForm from "@/components/complaint/CommentForm";
import CommentList from "@/components/complaint/CommentList";
import axiosInstance from '@/utils/axiosInstance';

interface Complaint {
  title: string;
  description: string;
  complaint_by:string;
  priority:string;
  complaint_at:string;
  category:string;
  status:string;
}

interface ComplaintPageProps {
params: Promise<{ id: string }>;
}

const ComplaintPage: React.FC<ComplaintPageProps> = ({ params }) => {


  const [complaint, setComplaint] = useState<Complaint | null>(null);
  const [refreshComments, setRefreshComments] = useState(false);

  const resolvedParams =  params;
  const complaintId = resolvedParams.id

  

  const fetchComplaint = async () => {
    try {
     
      const response = await axiosInstance.get(`/complaints/${complaintId}`);
      setComplaint(response.data.data);
    } catch (error) {
      console.error("Failed to load complaint", error);
    }
  };

  const handleCommentAdded = () => {
    setRefreshComments(!refreshComments);
  };

  useEffect(() => {
    fetchComplaint();
  }, [complaintId]);

  return (
    <div className="p-4 w-full mx-auto">
      {complaint && <ComplaintDetails title={complaint.title} complaint_by={complaint.complaint_by} complaint_at={complaint.complaint_at} priority={complaint.priority} category={complaint.category} status={complaint.status} description={complaint.description}/>}
      <CommentList complaintId={complaintId} key={refreshComments} />
      <CommentForm complaintId={complaintId} onCommentAdded={handleCommentAdded} />
    </div>
  );
};

export default ComplaintPage;
