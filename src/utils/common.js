export const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
};

export function formatDateTime(isoDate) {
    const dateObj = new Date(isoDate);

    // Lấy các phần của ngày
    const day = dateObj.getUTCDate();
    const month = dateObj.getUTCMonth() + 1; // Tháng trong JavaScript bắt đầu từ 0
    const year = dateObj.getUTCFullYear();

    // Lấy giờ và phút
    let hours = dateObj.getUTCHours();
    const minutes = dateObj.getUTCMinutes();

    // Xác định AM/PM
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    //hours = hours ? hours : 12; // Nếu giờ là 0, chuyển thành 12

    // Định dạng chuỗi kết quả
    const formattedDate = `${day.toString().padStart(2, "0")}/${month
        .toString()
        .padStart(2, "0")}/${year} ${hours}:${minutes
        .toString()
        .padStart(2, "0")} ${ampm}`;

    return formattedDate;
}

export function formatNumber(number) {
    if (number >= 1_000_000_000) {
        return (
            (number / 1_000_000_000)
                .toFixed(1)
                .replace(/\.0$/, "")
                .replace(".", ",") + "B"
        );
    } else if (number >= 1_000_000) {
        return (
            (number / 1_000_000)
                .toFixed(1)
                .replace(/\.0$/, "")
                .replace(".", ",") + "M"
        );
    } else if (number >= 1_000) {
        return (
            (number / 1_000).toFixed(1).replace(/\.0$/, "").replace(".", ",") +
            "K"
        );
    }
    return number.toString().replace(".", ",");
}
