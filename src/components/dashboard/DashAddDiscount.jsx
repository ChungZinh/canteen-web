import { Button, Datepicker, Label, Table, Textarea, TextInput } from "flowbite-react";
import { useRef, useState } from "react";
import { HiSave } from "react-icons/hi";
import { formatDate } from "../../utils/formatDate";
import { s } from "framer-motion/client";
import foodApi from "../../api/foodApi";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import discountApi from "../../api/discountApi";
import { useNavigate } from "react-router-dom";

export default function DashAddDiscount() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [applicableProducts, setApplicableProducts] = useState([]); // State for products
  const [currentProductCode, setCurrentProductCode] = useState(""); // For input
  const { currentUser } = useSelector((state) => state.user);
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const [selectedStartDate, setSelectedStartDate] = useState(
    formatDate(Date.now())
  );
  const [selectedEndDate, setSelectedEndDate] = useState(
    formatDate(Date.now())
  );
  const btnRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeStartDate = (date) => {
    setSelectedStartDate(date ? formatDate(date) : Date.now());
    setFormData((prev) => ({ ...prev, startDate: selectedStartDate }));
  };

  const handleChangeEndDate = (date) => {
    setSelectedEndDate(date ? formatDate(date) : Date.now());
    setFormData((prev) => ({ ...prev, endDate: selectedEndDate }));
  };

  const handleAddProduct = async () => {
    // Mock data for product details, replace this with real data if available
    try {
      const response = await foodApi.getFood(
        currentProductCode,
        currentUser,
        accessToken
      );

      if (response.data) {
        const newProduct = {
          code: response.data._id,
          name: response.data.name,
          price: response.data.price,
          image: response.data.image,
        };
        // Thêm sản phẩm mới vào danh sách applicableProducts
        setApplicableProducts((prev) => [...prev, newProduct]);

        // Reset mã sản phẩm sau khi thêm
        setCurrentProductCode("");

        // Cập nhật formData, thêm mã sản phẩm mới vào applicableProducts
        setFormData((prev) => ({
          ...prev,
          applicableProducts: [
            ...(prev.applicableProducts || []),
            newProduct.code,
          ],
        }));
      }
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const handleRemoveProduct = (productCode) => {
    setApplicableProducts((prev) =>
      prev.filter((product) => product.code !== productCode)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await discountApi.create(
        formData,
        currentUser,
        accessToken
      );
      if (response.data) {
        toast.success(response.data.message);
        navigate("/dashboard?tab=listDiscounts");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      return;
    }
  };

  return (
    <div className="h-screen w-full bg-slate-200 p-6 overflow-y-scroll">
      <div className="">
        <div className="flex items-center justify-between">
          <div className="">
            <h1 className="text-3xl font-semibold ">Thêm giảm giá</h1>
            <p className="text-slate-500">Thêm giảm giá mới</p>
          </div>
          <div className="">
            <Button
              className="mt-4 bg-slate-600"
              //ref.current.click();
              onClick={() => btnRef.current.click()}
            >
              <HiSave size={20} />
              <span className="ml-2">
                {isEditing ? "Cập nhật" : "Lưu"} giảm giá
              </span>
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-8 bg-white p-4 rounded-md shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label className="mt-4">Mã giảm giá</Label>
            <TextInput
              placeholder="Nhập mã giảm giá"
              name="code"
              onChange={handleChange}
              value={formData.code}
            />
          </div>
          <div className="space-y-2 mt-4">
            <Label className="mt-4">Phần trăm giảm giá(từ 0 đến 100%)</Label>
            <TextInput
              placeholder="Nhập phần trăm giảm giá"
              name="discountPercentage"
              type="number"
              min={0}
              max={100}
              onChange={handleChange}
              value={formData.discountPercentage}
            />
          </div>
          <div className="flex gap-4 mt-4">
            <div className="w-1/2">
              <Label className="mt-4">Ngày bắt đầu</Label>
              <Datepicker
                name="startDate"
                onSelectedDateChanged={handleChangeStartDate}
                value={selectedStartDate}
              />
            </div>
            <div className="w-1/2">
              <Label className="mt-4">Ngày kết thúc</Label>
              <Datepicker
                name="endDate"
                onSelectedDateChanged={handleChangeEndDate}
                value={selectedEndDate}
              />
            </div>
          </div>
          <div className="mt-4">
            <Label className="mt-4">Giá trị tối thiểu của đơn hàng</Label>
            <TextInput
              placeholder="Nhập giá trị tối thiểu"
              name="minOrderValue"
              onChange={handleChange}
              value={formData.minOrderValue}
            />
          </div>
          <div className="mt-4">
            <Label className="mt-4">Mô tả</Label>
            <Textarea
              placeholder="Nhập mô tả"
              name="description"
              onChange={handleChange}
              value={formData.description}
              rows={4}
            />
          </div>
          <div className="mt-4">
            <Label className="mt-4">Các sản phẩm áp dụng</Label>
            <div className="flex gap-4">
              <TextInput
                placeholder="Nhập mã sản phẩm"
                name="applicableProducts"
                onChange={(e) => setCurrentProductCode(e.target.value)} // Update current input
                value={currentProductCode}
                className="w-3/4"
              />
              <Button onClick={handleAddProduct} className="bg-slate-600 w-1/4">
                Thêm sản phẩm
              </Button>
            </div>
            {applicableProducts.length > 0 && (
              <div className="mt-2">
                <Table striped>
                  <Table.Head>
                    <Table.HeadCell>Mã sản phẩm</Table.HeadCell>
                    <Table.HeadCell>Tên sản phẩm</Table.HeadCell>
                    <Table.HeadCell>Giá</Table.HeadCell>
                    <Table.HeadCell>Huỷ</Table.HeadCell>
                  </Table.Head>
                  <Table.Body className="divide-y">
                    {applicableProducts.map((product) => (
                      <Table.Row key={product.code}>
                        <Table.Cell>{product.code}</Table.Cell>
                        <Table.Cell>
                          <div className="flex items-center gap-2">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-10 h-10 rounded-md object-cover"
                            />
                            <span className="font-semibold">
                              {product.name}
                            </span>
                          </div>
                        </Table.Cell>
                        <Table.Cell>{product.price}</Table.Cell>
                        <Table.Cell>
                          <Button
                            onClick={() => handleRemoveProduct(product.code)}
                            className="bg-red-500"
                          >
                            Huỷ
                          </Button>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </div>
            )}
          </div>
          {/* Button hidden */}
          <Button ref={btnRef} type="submit" className="hidden" />
        </form>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}
