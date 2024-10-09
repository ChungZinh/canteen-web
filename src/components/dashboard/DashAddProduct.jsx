import {
  Button,
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
      const response = await foodApi.create(
        formData,
        currentUser,
        accessToken
      );
      console.log("Response", response.data);
      if (response.data) {
        toast.success(response.message);
        setFormData({
          name: "",
          quantity: "",
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
        quantity: product.quantity,
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
          quantity: "",
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
              <h1 className="text-3xl font-semibold ">Add Products</h1>
              <p className="text-slate-500">Add your products here</p>
            </div>
            <div className="">
              <Button
                className="mt-4 bg-slate-600"
                //ref.current.click();
                onClick={() => btnRef.current.click()}
              >
                <HiSave size={20} />
                <span className="ml-2">
                  {isEditing ? "Update" : "Add"} Product
                </span>
              </Button>
            </div>
          </div>
          <div className="mt-8 bg-white p-4 rounded-md shadow-md">
            <form onSubmit={isEditing ? handleUpdateProduct : handleAddProduct}>
              <div className="space-y-2">
                <Label className="mt-4">Product Name</Label>
                <TextInput
                  placeholder="Enter product name"
                  name="name"
                  onChange={handleChange}
                  value={formData.name}
                />
              </div>

              <div className="space-y-2 mt-4">
                <Label className="mt-4">Product Quantity</Label>
                <TextInput
                  placeholder="Enter product quantity"
                  name="quantity"
                  type="number"
                  onChange={handleChange}
                  value={formData.quantity}
                />
              </div>

              <div className="space-y-2 flex items-center justify-center gap-4 mt-4">
                <div className="w-1/2 space-y-2">
                  <Label className="mt-4">Product Category</Label>
                  <Select name="category" onChange={handleChange}>
                    <option>Select Category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </Select>
                </div>
                <div className="w-1/2 space-y-1">
                  <Label className="mt-4">Product Price</Label>
                  <TextInput
                    placeholder="Enter product price"
                    name="price"
                    onChange={handleChange}
                    type="number"
                    value={formData.price}
                  />
                </div>
              </div>

              <div className="space-y-2 mt-4">
                <Label className="mt-4">Product Image</Label>
                <div className="flex gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  <Button
                    className="px-4 inline text-center"
                    onClick={handleUpload}
                  >
                    {loading ? (
                      <div className="">
                        <Spinner size={"sm"} />
                        <span className="pl-3">Loading...</span>
                      </div>
                    ) : (
                      "Upload"
                    )}
                  </Button>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <Label className="mt-4">Product Description</Label>
                <Textarea
                  rows={8}
                  placeholder="Enter product description"
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
              <h1 className="text-3xl font-semibold ">Add Category</h1>
              <p className="text-slate-500">Add your category here</p>
            </div>
            <div className="">
              <Button
                className="mt-4 bg-slate-600"
                onClick={() => btnRefCategory.current.click()}
              >
                <HiSave size={20} />
                <span className="ml-2">
                  {isEditing ? "Update" : "Add"} Category
                </span>
              </Button>
            </div>
          </div>
          <div className="mt-8 bg-white p-4 rounded-md shadow-md">
            <form
              onSubmit={isEditing ? handleUpdateCategory : handleAddCategory}
            >
              <div className="space-y-2">
                <Label className="mt-4">Category Name</Label>
                <TextInput
                  placeholder="Enter category name"
                  name="name"
                  onChange={handleChange}
                  value={formData.name}
                />
              </div>
              <div className="space-y-2 mt-4">
                <Label className="mt-4">Product Image</Label>
                <div className="flex gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  <Button
                    className="px-4 inline text-center"
                    onClick={handleUpload}
                  >
                    {loading ? (
                      <div className="">
                        <Spinner size={"sm"} />
                        <span className="pl-3">Loading...</span>
                      </div>
                    ) : (
                      "Upload"
                    )}
                  </Button>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <Label className="mt-4">Product Description</Label>
                <Textarea
                  rows={8}
                  name="description"
                  onChange={handleChange}
                  placeholder="Enter product description"
                  value={formData.description}
                />
              </div>

              {/* Button hidden */}
              <Button ref={btnRefCategory} type="submit" className="hidden" />
            </form>
            <div className="mt-4">
              <Table striped>
                <Table.Head>
                  <Table.HeadCell>Category name</Table.HeadCell>
                  <Table.HeadCell>Description</Table.HeadCell>
                  <Table.HeadCell>Image</Table.HeadCell>
                  <Table.HeadCell>isDeleted</Table.HeadCell>
                  <Table.HeadCell>Edit</Table.HeadCell>
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
                        {category.isDeleted ? "Yes" : "No"}
                      </Table.Cell>
                      <Table.Cell>
                        <div className="flex items-center gap-2">
                          <Button
                            className="bg-slate-600"
                            onClick={() => handleEdit(category)}
                          >
                            Edit
                          </Button>
                          <Button
                            className="bg-red-600"
                            onClick={() => handleDeleteCategory(category._id)}
                          >
                            {category.isDeleted ? "Restore" : "Delete"}
                          </Button>
                        </div>
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
