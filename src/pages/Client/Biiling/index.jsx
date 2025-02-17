import { Tabs } from "antd";
import React from "react";
import BillingOrder from "./BillingOrder";

export default function BillingPage() {
  return (
    <div className="bg-white h-full m-3 p-3 rounded-xl">
      <Tabs
        tabPosition={"left"}
        items={[
          { label: "Tài khoản", key: 1, children: <BillingOrder /> },
          { label: "Biến động số dư", key: 2, children: <></> },
        ]}
      />
    </div>
  );
}
