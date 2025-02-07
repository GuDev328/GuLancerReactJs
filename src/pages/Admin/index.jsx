import React from "react";
import AdminLayout from "./Layout";
import { Route, Routes } from "react-router-dom";
import AccountManagement from "./Account";

export default function AdminRootPage() {
  return (
    <div>
      <AdminLayout>
        <Routes>
          <Route path="/account-management" element={<AccountManagement />} />
        </Routes>
      </AdminLayout>
    </div>
  );
}
