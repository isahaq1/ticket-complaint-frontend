"use client"
import React from 'react';
import ComplaintList from '@/components/complaint/ComplaintList';

const ListComplaintPage: React.FC = () => {
    return (
        <div>
            <h1>Complaints</h1>
            <ComplaintList />
        </div>
    );
};

export default ListComplaintPage;
