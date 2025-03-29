import React from "react";
import AdminLayout from "./Layout";
import { Route, Routes } from "react-router-dom";
import AccountManagement from "./Account";
import VerifyUserManagement from "./VerifyUser";
import DisputeManagement from "./Dispute";

export default function AdminRootPage() {
  return (
    <div>
      <AdminLayout>
        <Routes>
          <Route path="/account-management" element={<AccountManagement />} />
          <Route path="/verify-management" element={<VerifyUserManagement />} />
          <Route path="/dispute-management" element={<DisputeManagement />} />
        </Routes>
      </AdminLayout>
    </div>
  );
}
