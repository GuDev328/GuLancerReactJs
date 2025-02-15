import React from "react";
import MyDropdown from "./MyDropdown";
import PropTypes from "prop-types";

export default function DotMenuDropdown({ items }) {
  return (
    <MyDropdown items={items}>
      <i className="fa-solid m-1 cursor-pointer fa-ellipsis-stroke-vertical"></i>
    </MyDropdown>
  );
}

DotMenuDropdown.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      onClick: PropTypes.func,
    })
  ).isRequired,
};
