import {
  Button,
  Dropdown,
  Label,
  Select,
  Spinner,
  Table,
  Textarea,
  TextInput,
} from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { HiSave } from "react-icons/hi";
import { useLocation, useNavigate } from "react-router-dom";
import categoryApi from "../../api/categoryApi";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { uploadFileToS3 } from "../../aws/s3UploadImage";
import { s3Config } from "../../aws/s3Config";
import foodApi from "../../api/foodApi";
import { MdModeEdit, MdMoreVert } from "react-icons/md";
import { IoIosRemoveCircleOutline } from "react-icons/io";

export default function DashAddProduct() {
  const [categories, setCategories] = useState([]);
  const [categoryAdded, setCategoryAdded] = useState(false);
  const btnRef = useRef();
  const btnRefCategory = useRef();
  const location = useLocation();
  const [tab, setTab] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const { product } = location.state || {};

  const navigation = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await categoryApi.getAll();
      if (response.data) {
        setCategories(response.data);
      } else {
        toast.error("Failed to fetch categories");
      }
    };

    fetchCategories();
  }, [currentUser?._id, categoryAdded]);

  const handleUpload = async () => {
    console.log("Uploading image");
    setLoading(true);
    if (!image) {
      setLoading(false);
      return;
    }
    uploadFileToS3(
      "kltn-foods",
      image,
      s3Config,
      (url) => {
        console.log("Image uploaded", url);
        setImageUrl(url);
        setLoading(false);
        setFormData({ ...formData, image: url });
        toast.success("Image uploaded successfully");
      },
      (error) => {
        console.error("Error uploading image", error);
        toast.error("Failed to upload image");
        setLoading(false);
      }
    );
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await foodApi.create(formData, currentUser, accessToken);
      console.log("Response", response.data);
      if (response.data) {
        toast.success(response.message);
        setFormData({
          name: "",
          stock: "",
          price: "",
          description: "",
          category: "",
          image: "",
        });
        navigation("/dashboard?tab=products");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Error adding product", error);
      toast.error("Failed to add product");
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await categoryApi.create(
        formData,
        currentUser,
        accessToken
      );
      if (response.data) {
        toast.success(response.message);
        setFormData({
          name: "",
          description: "",
          image: "",
        });
        setCategoryAdded((prev) => !prev);
      }
    } catch (error) {
      console.error("Error adding category", error);
      toast.error("Failed to add category");
    }
    console.log("Add category");
  };

  const handleDeleteCategory = async (id) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await categoryApi.delete(id, currentUser, accessToken);
      if (response.data) {
        toast.success(response.message);
        setCategoryAdded((prev) => !prev);
      }
    } catch (error) {
      console.error("Error deleting category", error);
      toast.error("Failed to delete category");
    }
  };

  const handleEdit = async (category) => {
    setIsEditing(true);
    setSelectedCategory(category._id);
    setFormData({
      name: category.name,
      description: category.description,
      image: category.image,
    });
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await categoryApi.update(
        selectedCategory,
        formData,
        currentUser,
        accessToken
      );
      if (response.data) {
        toast.success(response.message);
        setCategoryAdded((prev) => !prev);
        setIsEditing(false);
        setFormData({
          name: "",
          description: "",
          image: "",
        });
      }
    } catch (error) {
      console.error("Error updating category", error);
      toast.error("Failed to update category");
    }
  };

  // set formData when editing
  useEffect(() => {
    if (product) {
      setIsEditing(true);
      setFormData({
        name: product.name,
        stock: product.stock,
        price: product.price,
        description: product.description,
        category: product.category,
        image: product.image,
      });
    }
  }, [product]);

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await foodApi.update(
        product._id,
        formData,
        currentUser,
        accessToken
      );
      if (response.data) {
        toast.success(response.message);
        setFormData({
          name: "",
          stock: "",
          price: "",
          description: "",
          category: "",
          image: "",
        });
        navigation("/dashboard?tab=products");
      }
    } catch (error) {
      console.error("Error updating product", error);
      toast.error("Failed to update product");
    }
  };

  return (
    <div className="h-screen w-full bg-slate-200 p-6 overflow-y-scroll">
      {/* ADD PRODUCT */}
      {tab === "addProducts" ? (
        <div className="">
          <div className="flex items-center justify-between">
            <div className="">
              <h1 className="text-3xl font-semibold ">
                {isEditing ? "Cập nhật" : "Thêm"} món ăn
              </h1>
              <p className="text-slate-500">
                {isEditing ? "Cập nhật" : "Thêm"} món ăn vào danh sách
              </p>
            </div>
            <div className="">
              <Button
                className="mt-4 bg-slate-600"
                //ref.current.click();
                onClick={() => btnRef.current.click()}
              >
                <HiSave size={20} />
                <span className="ml-2">
                  {isEditing ? "Cập nhật" : "Thêm"} món ăn
                </span>
              </Button>
            </div>
          </div>
          <div className="mt-8 bg-white p-4 rounded-md shadow-md">
            <form onSubmit={isEditing ? handleUpdateProduct : handleAddProduct}>
              <div className="space-y-2">
                <Label className="mt-4">Tên món ăn</Label>
                <TextInput
                  placeholder="Nhập tên món ăn"
                  name="name"
                  onChange={handleChange}
                  value={formData.name}
                />
              </div>

              <div className="space-y-2 mt-4">
                <Label className="mt-4">Số lượng </Label>
                <TextInput
                  placeholder="Nhập số lượng"
                  name="stock"
                  type="number"
                  onChange={handleChange}
                  value={formData.stock}
                />
              </div>

              <div className="space-y-2 flex items-center justify-center gap-4 mt-4">
                <div className="w-1/2 space-y-2">
                  <Label className="mt-4">Danh mục món ăn</Label>
                  <Select name="category" onChange={handleChange}>
                    <option>Chọn danh mục món ăn</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </Select>
                </div>
                <div className="w-1/2 space-y-1">
                  <Label className="mt-4">Giá món ăn</Label>
                  <TextInput
                    placeholder="Nhập giá"
                    name="price"
                    onChange={handleChange}
                    type="number"
                    value={formData.price}
                  />
                </div>
              </div>

              <div className="space-y-2 mt-4">
                <Label className="mt-4">Hình ảnh món ăn</Label>
                <div className="flex gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  <Button
                    className="w-[105px] px-2 inline text-center"
                    onClick={handleUpload}
                  >
                    {loading ? (
                      <div className="">
                        <Spinner size={"sm"} />
                        <span className="pl-3">Loading...</span>
                      </div>
                    ) : (
                      "Tải lên"
                    )}
                  </Button>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <Label className="mt-4">Mô tả món ăn</Label>
                <Textarea
                  rows={8}
                  placeholder="Nhập mô tả món ăn"
                  name="description"
                  onChange={handleChange}
                  value={formData.description}
                />
              </div>

              {/* Button hidden */}
              <Button ref={btnRef} type="submit" className="hidden" />
            </form>
          </div>
        </div>
      ) : (
        <div className="">
          <div className="flex items-center justify-between">
            <div className="">
              <h1 className="text-3xl font-semibold ">Danh mục món ăn</h1>
              <p className="text-slate-500">Thêm, sửa, xóa danh mục món ăn</p>
            </div>
            <div className="">
              <Button
                className="mt-4 bg-slate-600"
                onClick={() => btnRefCategory.current.click()}
              >
                <HiSave size={20} />
                <span className="ml-2">
                  {isEditing ? "Cập nhật" : "Thêm"} danh mục
                </span>
              </Button>
            </div>
          </div>
          <div className="mt-8 bg-white p-4 rounded-md shadow-md">
            <form
              onSubmit={isEditing ? handleUpdateCategory : handleAddCategory}
            >
              <div className="space-y-2">
                <Label className="mt-4">Tên danh mục</Label>
                <TextInput
                  placeholder="Nhập tên danh mục"
                  name="name"
                  onChange={handleChange}
                  value={formData.name}
                />
              </div>
              <div className="space-y-2 mt-4">
                <Label className="mt-4">Hình ảnh danh mục</Label>
                <div className="flex gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  <Button
                    className="w-[90px] inline text-center"
                    onClick={handleUpload}
                  >
                    {loading ? (
                      <div className="">
                        <Spinner size={"sm"} />
                        <span className="pl-3">Loading...</span>
                      </div>
                    ) : (
                      "Tải lên"
                    )}
                  </Button>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <Label className="mt-4">Mô tả danh mục</Label>
                <Textarea
                  rows={8}
                  name="description"
                  onChange={handleChange}
                  placeholder="Nhập mô tả danh mục"
                  value={formData.description}
                />
              </div>

              {/* Button hidden */}
              <Button ref={btnRefCategory} type="submit" className="hidden" />
            </form>
            <div className="mt-4">
              <Table striped>
                <Table.Head>
                  <Table.HeadCell>Tên danh mục</Table.HeadCell>
                  <Table.HeadCell>Mô tả</Table.HeadCell>
                  <Table.HeadCell>Hình ảnh</Table.HeadCell>
                  <Table.HeadCell>Action</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                  {categories.map((category) => (
                    <Table.Row key={category.id}>
                      <Table.Cell>{category.name}</Table.Cell>
                      <Table.Cell>{category.description}</Table.Cell>
                      <Table.Cell>
                        <img
                          src={category.image}
                          alt={category.name}
                          className="w-16 h-16 object-cover"
                        />
                      </Table.Cell>
                      <Table.Cell>
                        <Dropdown
                          arrowIcon={false}
                          inline
                          label={
                            <MdMoreVert size={20} className="text-slate-500" />
                          }
                        >
                          <Dropdown.Item>
                            <div
                              onClick={() => handleEdit(category)}
                              className="flex items-center"
                            >
                              <MdModeEdit size={20} />
                              <span className="ml-2">Chỉnh sửa</span>
                            </div>
                          </Dropdown.Item>
                          <Dropdown.Item>
                            <div
                              onClick={() => handleDeleteCategory(category._id)}
                              className="flex items-center"
                            >
                              <IoIosRemoveCircleOutline size={20} />
                              <span className="ml-2">Xóa</span>
                            </div>
                          </Dropdown.Item>
                        </Dropdown>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>
          </div>
        </div>
      )}
      {/* ToastContainer để hiển thị thông báo */}
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
