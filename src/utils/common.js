import dayjs from "dayjs";

export const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export function formatDateTime(isoDate) {
  if (!isoDate) return undefined;
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

export function formatDate(isoDate) {
  if (!isoDate) return undefined;
  return dayjs(isoDate).format("DD/MM/YYYY");
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
      (number / 1_000_000).toFixed(1).replace(/\.0$/, "").replace(".", ",") +
      "M"
    );
  } else if (number >= 1_000) {
    return (
      (number / 1_000).toFixed(1).replace(/\.0$/, "").replace(".", ",") + "K"
    );
  }
  return number.toString().replace(".", ",");
}

export function timeAgo(dateString) {
  const now = new Date();
  const past = new Date(dateString);

  // Chuyển thời gian UTC sang múi giờ
  const pastInVn = new Date(past.getTime() + -7 * 60 * 60 * 1000);

  const diffInSeconds = Math.floor((now - pastInVn) / 1000);

  const seconds = diffInSeconds;
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) {
    return `${seconds} giây trước`;
  } else if (minutes < 60) {
    return `${minutes} phút trước`;
  } else if (hours < 24) {
    return `${hours} giờ trước`;
  } else {
    return `${days} ngày trước`;
  }
}

export function formatCurrency(value) {
  return Number(value).toLocaleString("vi-VN") + "đ";
}

export function formatTimeVi(isoString) {
  const date = new Date(isoString);

  // Trừ đi 7 giờ để chuyển về múi giờ Việt Nam
  date.setHours(date.getHours() - 7);

  const now = new Date();
  now.setHours(now.getHours() - 7);

  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  if (isToday) {
    return date.toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  } else {
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }
}
