"use client"
import React from 'react';
import ComplaintTrendReport from '@/components/complaint/ComplaintTrendChart';
import { useRouter } from 'next/navigation';

const TrendComplaint: React.FC = () => {

    return (
        <div>
            <h1>Complaint Trends</h1>
            <ComplaintTrendReport />
        </div>
    );
};

export default TrendComplaint;