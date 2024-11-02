import React, { useState } from "react";
import axiosInstance from '@/utils/axiosInstance';

interface CommentFormProps {
  complaintId: number;
  onCommentAdded: () => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ complaintId, onCommentAdded }) => {
  const [comment, setComment] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!comment) return;

    try {
      
     const response =  await axiosInstance.post(`/complaints/${complaintId}/comments`, { comment });
console.log(response);
      setComment("");
      onCommentAdded();
    } catch (error) {
      console.error("Failed to add comment", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add a comment"
        className="w-full p-2 border border-gray-300 rounded-md"
        required
      />
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
        Add Comment
      </button>
    </form>
  );
};

export default CommentForm;
