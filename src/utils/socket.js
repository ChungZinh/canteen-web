import { io } from "socket.io-client"; // Kết nối với WebSocket server

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:3001"; // Đổi URL nếu cần
const socket = io(SOCKET_URL, {
  reconnection: true, // Tự động kết nối lại khi bị mất kết nối
  transports: ["websocket"], // Ưu tiên sử dụng giao thức WebSocket
});

// Lắng nghe sự kiện kết nối
socket.on("connect", () => {
  console.log("Connected to WebSocket server:", socket.id);
});

// Lắng nghe sự kiện ngắt kết nối
socket.on("disconnect", (reason) => {
  console.warn("Disconnected from WebSocket server:", reason);
});

export default socket;
