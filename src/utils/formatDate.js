import { format } from "date-fns";
import { vi } from "date-fns/locale";

export const formatDate = (dateString) => {
  const date = new Date(dateString);

  const formattedDate = `${date.getFullYear()}/${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${date.getDate().toString().padStart(2, "0")}`;

  return formattedDate;
};

export const formatCreatedAt = (dataString) => {
  const date = new Date(dataString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export const formatCreatedAt_v1 = (createdAt) => {
  const date = new Date(createdAt);
  const options = {
    weekday: "short", // e.g., 'Wed'
    year: "numeric", // e.g., '2020'
    month: "short", // e.g., 'Aug'
    day: "numeric", // e.g., '13'
  };

  const formattedDate = date.toLocaleDateString("en-US", options);
  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true, // e.g., '4:30 PM'
  });

  return `${formattedDate}, ${formattedTime}`;
};

const getOrdinalSuffix = (day) => {
  if (day > 3 && day < 21) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

export const formatDate_v1 = (date) => {
  const dayName = format(date, "iiii", { locale: vi }); // Ví dụ: Tuesday
  const month = format(date, "MMMM", { locale: vi }); // Ví dụ: March
  const year = format(date, "yyyy"); // Ví dụ: 2021
  const dayNumber = format(date, "d"); // Ví dụ: 2
  const dayWithSuffix = `${dayNumber}${getOrdinalSuffix(Number(dayNumber))}`; // Ví dụ: 2nd

  return `${dayName}, ${dayWithSuffix} ${month} ${year}`;
};

// Hàm để hiển thị khoảng thời gian
export const timeAgo = (createdAt) => {
  const currentTime = new Date(); // Thời gian hiện tại
  const createdDate = new Date(createdAt); // Chuyển chuỗi ngày thành đối tượng Date

  // Kiểm tra nếu createdAt không phải là một đối tượng Date hợp lệ
  if (isNaN(createdDate.getTime())) {
    return "Ngày không hợp lệ"; // Trả về thông báo nếu ngày không hợp lệ
  }

  const timeDifference = currentTime - createdDate; // Tính hiệu số thời gian (mili giây)

  const seconds = Math.floor(timeDifference / 1000); // Chuyển mili giây thành giây
  const minutes = Math.floor(seconds / 60); // Chuyển giây thành phút
  const hours = Math.floor(minutes / 60); // Chuyển phút thành giờ
  const days = Math.floor(hours / 24); // Chuyển giờ thành ngày
  const months = Math.floor(days / 30); // Chuyển ngày thành tháng
  const years = Math.floor(days / 365); // Chuyển ngày thành năm

  if (years > 0) return `${years} năm trước`;
  if (months > 0) return `${months} tháng trước`;
  if (days > 0) return `${days} ngày trước`;
  if (hours > 0) return `${hours} giờ trước`;
  if (minutes > 0) return `${minutes} phút trước`;
  return `${seconds} giây trước`;
};

export const formatTimeLine = (isoDateTime)  => {
  const date = new Date(isoDateTime);

  // Lấy các phần tử ngày, tháng, năm, giờ, phút
  const day = String(date.getDate()).padStart(2, '0'); // Ngày (dd)
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng (mm)
  const year = date.getFullYear(); // Năm (yyyy)

  const hours = String(date.getHours()).padStart(2, '0'); // Giờ (HH)
  const minutes = String(date.getMinutes()).padStart(2, '0'); // Phút (MM)

  // Kết hợp các phần tử thành chuỗi định dạng mong muốn
  return `${day}/${month}/${year} - ${hours}:${minutes}`;
}
