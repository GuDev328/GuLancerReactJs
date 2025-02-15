import { Dropdown } from "antd";
import React from "react";
import PropTypes from "prop-types";

export default function MyDropdown({ items, children }) {
  const formatItem = items.map((item, index) => {
    return {
      key: index,
      ...item,
    };
  });

  const handleMenuClick = (e) => {
    formatItem[e.key].onClick();
  };

  return (
    <Dropdown menu={{ items, onClick: handleMenuClick }} trigger={["click"]}>
      {children}
    </Dropdown>
  );
}

MyDropdown.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      onClick: PropTypes.func,
    })
  ).isRequired,
  children: PropTypes.node,
};
