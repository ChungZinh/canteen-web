import { Button, Spinner, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiPlus } from "react-icons/hi";
import foodApi from "../../api/foodApi";
import { toast, ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function DashProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [isUpdate, setIsUpdate] = useState(false);

  // Dish dummy data
  useEffect(() => {
    // Fetch
    setLoading(true);
    const fetchFoods = async () => {
      const response = await foodApi.getAllFoods();
      if (response.data) {
        setProducts(response.data.foods);
        setLoading(false);
        console.log(response.data.foods);
      } else {
        toast.error("Failed to fetch foods");
        setLoading(false);
      }
    };
    fetchFoods();
  }, [currentUser?._id, isUpdate]);

  const handleSetSoldOut = async (id) => {
    const accessToken = localStorage.getItem("accessToken");
    const response = await foodApi.soldOut(id, currentUser, accessToken);
    if (response.data) {
      toast.success("Product is sold out");
      setIsUpdate(!isUpdate);
    } else {
      toast.error("Failed to sold out");
    }
  };

  const handleAvailable = async (id) => {
    const accessToken = localStorage.getItem("accessToken");
    const response = await foodApi.available(id, currentUser, accessToken);
    if (response.data) {
      toast.success("Product is available");
      setIsUpdate(!isUpdate);
    } else {
      toast.error("Failed to available");
    }
  };

  return (
    <div className="h-screen w-full bg-slate-200 p-6">
      <div className="flex items-center justify-between">
        <div className="">
          <h1 className="text-3xl font-semibold ">Products</h1>
          <p className="text-slate-500">Manage your products here</p>
        </div>
        <div className="flex gap-2 items-center">
          <Button className="mt-4 bg-slate-600">
            <Link to={`/dashboard?tab=addProducts`} className="flex">
              <HiPlus size={20} />
              <span className="ml-2">Add Product</span>
            </Link>
          </Button>

          <Button className="mt-4 bg-slate-600">
            <Link to={`/dashboard?tab=addCategory`} className="flex">
              <HiPlus size={20} />
              <span className="ml-2">Add Category</span>
            </Link>
          </Button>
        </div>
      </div>
      <>
        {loading ? (
          <div className="flex justify-center items-center h-[300px]">
            <Spinner className="text-primary" size="xl" />
          </div>
        ) : (
          <div className="mt-8">
            <Table striped>
              <Table.Head>
                <Table.HeadCell>Product name</Table.HeadCell>
                <Table.HeadCell>Image</Table.HeadCell>
                <Table.HeadCell>Category</Table.HeadCell>
                <Table.HeadCell>Price</Table.HeadCell>
                <Table.HeadCell>Quantity</Table.HeadCell>
                <Table.HeadCell>Actions</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {products.map((product) => (
                  <Table.Row key={product._id}>
                    <Table.Cell className="font-semibold">
                      {product.name}
                    </Table.Cell>
                    <Table.Cell>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </Table.Cell>
                    <Table.Cell>{product.category.name}</Table.Cell>
                    <Table.Cell>{product.price}</Table.Cell>
                    <Table.Cell>{product.quantity}</Table.Cell>
                    <Table.Cell>
                      <div className="flex items-center gap-2">
                        <Button
                          className="bg-slate-600"
                          onClick={() => {
                            navigate(`/dashboard?tab=addProducts`, {
                              state: { product },
                            });
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          className={`bg-${
                            product.isSoldOut ? "green" : "red"
                          }-500`}
                          onClick={() =>
                            product.isSoldOut
                              ? handleAvailable(product._id)
                              : handleSetSoldOut(product._id)
                          }
                        >
                          {product.isSoldOut ? "Available" : "Sold Out"}
                        </Button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        )}
      </>
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
