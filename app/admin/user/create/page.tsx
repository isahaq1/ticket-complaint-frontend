// src/app/add-user/page.tsx
import React from "react";
import UserForm from "@/components/UserForm";

const AddUserPage = () => {
    return (
        <div className="w-3/4 mx-auto">
            <h1 className="text-2xl font-bold mb-5">Add New User</h1>
            <UserForm />
        </div>
    );
};

export default AddUserPage;
