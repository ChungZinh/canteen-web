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
