import React from "react";
import AdminLayout from "./Layout";
import { Route, Routes } from "react-router-dom";
import AccountManagement from "./Account";
import VerifyUserManagement from "./VerifyUser";
import DisputeManagement from "./Dispute";
import Report from "./Report";
import DetailGroup from "./Report/DetailGroup";
import DisputePage from "../Both/Dispute";
import GroupManagement from "./Group";
import Dashboard from "./Dashboard";
export default function AdminRootPage() {
  return (
    <div>
      <AdminLayout>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/account-management" element={<AccountManagement />} />
          <Route path="/verify-management" element={<VerifyUserManagement />} />
          <Route path="/dispute-management" element={<DisputeManagement />} />
          <Route path="/report-management" element={<Report />} />
          <Route path="/community-management" element={<GroupManagement />} />
          <Route
            path="/report-management/detail-group/:id"
            element={<DetailGroup />}
          />
          <Route path="/dispute/:dispute_id" element={<DisputePage />} />
        </Routes>
      </AdminLayout>
    </div>
  );
}
