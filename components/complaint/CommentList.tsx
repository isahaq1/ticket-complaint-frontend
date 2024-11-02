import React, { useEffect, useState } from "react";
import axiosInstance from '@/utils/axiosInstance';

interface Comment {
  id: number;
  comment: string;
  comment_at: string;
  commented_by:string;
}

interface CommentListProps {
  complaintId: number; // Ensure this prop is passed correctly
}

const CommentList: React.FC<CommentListProps> = ({ complaintId }) => {
  const [comments, setComments] = useState<Comment[]>([]);

  const fetchComments = async () => {
    if (!complaintId) return; // Ensure complaintId is defined
    try {
      const response = await axiosInstance.get(`/complaints/${complaintId}/comments`);
      setComments(response.data.data);
    } catch (error) {
      console.error("Failed to load comments", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [complaintId]); // Trigger fetchComments when complaintId changes

  return (
    <div>
      <h2>Comments</h2>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.id} className="border p-2 my-2">
            <p><strong>{comment.commented_by}</strong> - {comment.comment_at}</p>
            <p>{comment.comment}</p>
          </div>
        ))
      ) : (
        <p>No comments yet.</p>
      )}
    </div>
  );
};

export default CommentList;
