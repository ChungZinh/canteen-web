import QRCode from "qrcode";

const generatePaymentQR = async (amount, transactionId, description) => {
  const qrData = `
    000201010211
    0010A000000727
    0208MSCBVNVX
    03056706042002
    5405${amount}
    5802VN
    6206${transactionId}|${description}
    6304
  `.replace(/\s+/g, ""); // Loại bỏ khoảng trắng

  try {
    const qrImage = await QRCode.toDataURL(qrData);
    console.log("QR Code tạo thành công:", qrImage);
    return qrImage; // Base64 URL của QR Code
  } catch (err) {
    console.error("Lỗi tạo QR Code:", err);
    return null;
  }
};

export { generatePaymentQR };
