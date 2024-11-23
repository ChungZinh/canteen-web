import React, { useEffect, useState } from "react";
import bg2 from "../assets/imgs/bg4.png";
import { Button, Card, Modal, TextInput } from "flowbite-react";
import userApi from "../api/userApi";
import { useSelector } from "react-redux";
import { buildQueryString } from "../utils/buildQueryString";
import { toast } from "react-toastify";
import { generatePaymentQR } from "../utils/generatePaymentQR";

export default function DepositMoney() {
  const [user, setUser] = useState({});
  const { currentUser } = useSelector((state) => state.user);
  const accessToken = localStorage.getItem("accessToken");
  const [query, setQuery] = useState("");
  const [amount, setAmount] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [qrCode, setQrCode] = useState("");
  useEffect(() => {
    const fetchUser = async () => {
      const queryB = buildQueryString(query);
      const response = await userApi.getUserById(
        currentUser._id,
        queryB,
        currentUser,
        accessToken
      );
      setUser(response.data.user);
    };
    fetchUser();
  }, [currentUser, accessToken, query]);

  const amountExample = [50000, 100000, 200000, 500000, 1000000, 2000000];

  const handleSelectAmount = (amount) => {
    setAmount(amount);
  };

  const generateQRCode = async () => {
    if (amount <= 0) {
      toast.error("Vui lòng chọn số tiền nạp");
      return;
    }

    const transactionId = `TXN${Date.now()}`;

    const qrCode = await generatePaymentQR(
      amount,
      transactionId,
      transactionId
    );

    setQrCode(qrCode);

    setOpenModal(true);
  };

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <div
        className="w-screen h-[400px] mt-[80px] flex justify-center items-center bg-opacity-70 backdrop-blur-sm"
        style={{
          backgroundImage: `url(${bg2})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h1 className="text-center text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-playwrite mb-[80px] text-black">
          Nạp tiền
        </h1>
      </div>
      <Card className="w-[60%] mx-auto mb-10">
        <div className="flex justify-between border-b pb-4">
          <h1>
            Xin chào <span className="font-semibold"> {user.fullName}</span>!
          </h1>
          <p>
            Số dư hiện tại của bạn là:{" "}
            <span className="font-semibold">
              {user?.wallet?.balance.toLocaleString()}₫
            </span>
          </p>
        </div>
        <div className="mt-4">
          <TextInput
            placeholder={amount + "₫"}
            sizing="lg"
            onChange={(e) => setAmount(e.target.value)}
          />
          {/* LIST AMOUNT EXAMPLE */}
          <div className="flex flex-wrap  w-[80%] gap-2 mx-auto  justify-between mt-8">
            {amountExample.map((item, index) => (
              <button
                key={index}
                onClick={() => handleSelectAmount(item)}
                className={`bg-gray-200 text-black px-4 py-2 rounded-md ${
                  amount === item ? "bg-blue-500 text-white" : ""
                }`}
              >
                {item.toLocaleString()}₫
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 border-t pt-6">
          <Button
            onClick={() => generateQRCode()}
            className="w-full bg-blue-500 text-white"
          >
            Nạp tiền
          </Button>
        </div>
      </Card>
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-center text-2xl font-semibold mb-4">
              Quét mã QR để nạp {amount.toLocaleString()}₫
            </h1>
            <img src={qrCode} alt="QR Code" />
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
