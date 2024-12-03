import {
  Button,
  Datepicker,
  Label,
  Table,
  Textarea,
  TextInput,
} from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { HiSave } from "react-icons/hi";
import { formatDate } from "../../utils/formatDate";
import foodApi from "../../api/foodApi";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import discountApi from "../../api/discountApi";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup"; // Optional validation library

export default function DashAddDiscount() {
  const [applicableProducts, setApplicableProducts] = useState([]); // State for products
  const [currentProductCode, setCurrentProductCode] = useState(""); // For input
  const { currentUser } = useSelector((state) => state.user);
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const tabFromUrl = urlParams.get("tab");
  const { discount } = location.state || {};
  const [selectedStartDate, setSelectedStartDate] = useState(
    formatDate(Date.now())
  );
  const [selectedEndDate, setSelectedEndDate] = useState(
    formatDate(Date.now())
  );
  const btnRef = useRef();

  // Formik setup
  const formik = useFormik({
    initialValues: {
      code: discount ? discount.code : "",
      discountPercentage: discount ? discount.discountPercentage : "",
      minOrderValue: discount ? discount.minOrderValue : "",
      description: discount ? discount.description : "",
      applicableProducts: discount ? discount.applicableProducts || [] : [],
      startDate: discount ? discount.startDate : selectedStartDate,
      endDate: discount ? discount.endDate : selectedEndDate,
    },
    validationSchema: Yup.object({
      code: Yup.string().required("Mã giảm giá là bắt buộc"),
      discountPercentage: Yup.number()
        .min(0)
        .max(100)
        .required("Phần trăm giảm giá là bắt buộc"),
      minOrderValue: Yup.number().required("Giá trị tối thiểu là bắt buộc"),
      description: Yup.string().required("Mô tả là bắt buộc"),
    }),
    onSubmit: async (values) => {
      try {
        const response =
          tabFromUrl === "addDiscount"
            ? await discountApi.create(values, currentUser, accessToken)
            : await discountApi.update(
                discount._id,
                values,
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
      }
    },
  });

  // Set initial data for editing
  useEffect(() => {
    if (discount) {
      setSelectedStartDate(discount.startDate);
      setSelectedEndDate(discount.endDate);
      if (discount.applicableProducts) {
        setApplicableProducts(
          discount.applicableProducts.map((productCode) => ({
            code: productCode,
          }))
        );
      }
    }
  }, [discount]);

  const handleAddProduct = async () => {
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
        setApplicableProducts((prev) => [...prev, newProduct]);
        setCurrentProductCode("");
        formik.setFieldValue("applicableProducts", [
          ...formik.values.applicableProducts,
          newProduct.code,
        ]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveProduct = (productCode) => {
    setApplicableProducts((prev) =>
      prev.filter((product) => product.code !== productCode)
    );
    formik.setFieldValue(
      "applicableProducts",
      formik.values.applicableProducts.filter((code) => code !== productCode)
    );
  };

  return (
    <div className="h-screen w-full bg-slate-200 p-6 overflow-y-scroll">
      <div className="">
        <div className="flex items-center justify-between">
          <div className="">
            <h1 className="text-3xl font-semibold">
              {tabFromUrl === "addDiscount"
                ? "Thêm giảm giá"
                : "Cập nhật giảm giá"}
            </h1>
            <p className="text-slate-500">
              {tabFromUrl === "addDiscount"
                ? "Thêm giảm giá"
                : "Cập nhật giảm giá"}
            </p>
          </div>
          <div className="">
            <Button
              className="mt-4 bg-slate-600"
              onClick={() => btnRef.current.click()}
            >
              <HiSave size={20} />
              <span className="ml-2">
                {tabFromUrl === "addDiscount" ? "Lưu" : "Cập nhật"} giảm giá
              </span>
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-8 bg-white p-4 rounded-md shadow-md">
        <form onSubmit={formik.handleSubmit}>
          <div className="space-y-2">
            <Label className="mt-4">Mã giảm giá</Label>
            <TextInput
              placeholder="Nhập mã giảm giá"
              name="code"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.code}
              color={formik.errors.code && "failure"}
              helperText={formik.touched.code && formik.errors.code}
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
              onChange={formik.handleChange}
              value={formik.values.discountPercentage}
              color={formik.errors.discountPercentage && "failure"}
              helperText={
                formik.touched.discountPercentage &&
                formik.errors.discountPercentage
              }
              onBlur={formik.handleBlur}
            />
          </div>
          <div className="flex gap-4 mt-4">
            <div className="w-1/2">
              <Label className="mt-4">Ngày bắt đầu</Label>
              <Datepicker
                name="startDate"
                onSelectedDateChanged={(date) => {
                  const newStartDate = date ? formatDate(date) : Date.now();
                  formik.setFieldValue("startDate", newStartDate);
                }}
                value={formik.values.startDate}
                onBlur={formik.handleBlur}
                color={formik.errors.startDate && "failure"}
                helperText={formik.touched.startDate && formik.errors.startDate}
              />
            </div>
            <div className="w-1/2">
              <Label className="mt-4">Ngày kết thúc</Label>
              <Datepicker
                name="endDate"
                onSelectedDateChanged={(date) => {
                  const newEndDate = date ? formatDate(date) : Date.now();
                  formik.setFieldValue("endDate", newEndDate);
                }}
                value={formik.values.endDate}
                onBlur={formik.handleBlur}
                color={formik.errors.endDate && "failure"}
                helperText={formik.touched.endDate && formik.errors.endDate}
              />
            </div>
          </div>
          <div className="mt-4">
            <Label className="mt-4">Giá trị tối thiểu của đơn hàng</Label>
            <TextInput
              placeholder="Nhập giá trị tối thiểu"
              name="minOrderValue"
              onChange={formik.handleChange}
              value={formik.values.minOrderValue}
              type="number"
              color={formik.errors.minOrderValue && "failure"}
              helperText={
                formik.touched.minOrderValue && formik.errors.minOrderValue
              }
              onBlur={formik.handleBlur}
            />
          </div>
          <div className="mt-4">
            <Label className="mt-4">Mô tả</Label>
            <Textarea
              placeholder="Nhập mô tả"
              name="description"
              onChange={formik.handleChange}
              value={formik.values.description}
              rows={4}
            />
          </div>
          <div className="mt-4">
            <Label className="mt-4">Các sản phẩm áp dụng</Label>
            <div className="flex gap-4">
              <TextInput
                placeholder="Nhập mã sản phẩm"
                name="applicableProducts"
                onChange={(e) => setCurrentProductCode(e.target.value)}
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
                    <Table.HeadCell>Hành động</Table.HeadCell>
                  </Table.Head>
                  <Table.Body>
                    {applicableProducts.map((product, idx) => (
                      <Table.Row key={idx}>
                        <Table.Cell>{product.code}</Table.Cell>
                        <Table.Cell>{product.name}</Table.Cell>
                        <Table.Cell>{product.price}</Table.Cell>
                        <Table.Cell>
                          <Button
                            onClick={() => handleRemoveProduct(product.code)}
                            className="bg-red-500"
                          >
                            Xóa
                          </Button>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </div>
            )}
          </div>
          <div className="mt-4">
            <Button type="submit" className="bg-slate-600 w-full">
              {tabFromUrl === "addDiscount" ? "Lưu" : "Cập nhật"} giảm giá
            </Button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
