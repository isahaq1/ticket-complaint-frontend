"use client"
import React from 'react';
import ComplaintForm from '@/components/complaint/ComplaintForm';
import { useRouter } from 'next/navigation';

const CreateComplaintPage: React.FC = () => {
    const router = useRouter();

    const handleSuccess = () => {
        router.push('/admin/complaint/list');
    };

    return (
        <div>
            <h1>Create Complaint</h1>
            <ComplaintForm onSubmitSuccess={handleSuccess} />
        </div>
    );
};

export default CreateComplaintPage;
