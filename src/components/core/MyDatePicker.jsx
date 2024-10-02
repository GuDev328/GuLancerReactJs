import { DatePicker } from "antd";
import React from "react";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import locale from "antd/es/date-picker/locale/vi_VN";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

import PropTypes from "prop-types";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("vi");

const MyDatePicker = ({ value, onChange, ...rest }) => {
    const handleChange = (date, dateString) => {
        if (date) {
            // Đặt giờ, phút, giây và mili giây về 0
            const localDate = date.hour(0).minute(0).second(0).millisecond(0);
            // Chuyển đổi sang chuỗi ISO với múi giờ địa phương
            const isoString = localDate.format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
            onChange(dayjs(isoString));
        } else {
            onChange(null);
        }
    };

    return (
        <DatePicker
            style={{ width: "100%" }}
            format="DD/MM/YYYY"
            locale={locale}
            value={value}
            onChange={handleChange}
            {...rest}
        />
    );
};

MyDatePicker.propTypes = {
    value: PropTypes.any,
    onChange: PropTypes.func,
};

export default MyDatePicker;
