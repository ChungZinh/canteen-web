import { Dropdown, Spinner, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import discountApi from "../../api/discountApi";
import { useSelector } from "react-redux";
import { formatDate } from "../../utils/formatDate";
import { MdMoreVert } from "react-icons/md";
import { Link } from "react-router-dom";
import { LuEye } from "react-icons/lu";
import { IoIosRemoveCircleOutline } from "react-icons/io";

export default function DashListDiscount() {
  const [discounts, setDiscounts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useSelector((state) => state.user);
  const accessToken = localStorage.getItem("accessToken");
  useEffect(() => {
    const fetchDiscounts = async () => {
      try {
        const response = await discountApi.get(currentUser, accessToken);
        if (response.data) {
          setDiscounts(response.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.log("Failed to fetch discounts: ", error);
      }
    };
    fetchDiscounts();
  }, [currentUser, accessToken]);

  return (
    <div className="h-screen w-full bg-slate-200 p-6 overflow-y-scroll">
      {/* ADD PRODUCT */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold ">Danh sách mã giảm giá</h1>
          <p className="text-slate-500">Danh sách mã giảm giá</p>
        </div>
      </div>

      {/* TABLE */}
      <div className="mt-6">
        {isLoading ? (
          <div className="flex items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <Table striped>
            <Table.Head>
              <Table.HeadCell>
                <span className="text-slate-500">Mã giảm giá</span>
              </Table.HeadCell>
              <Table.HeadCell>
                <span className="text-slate-500">Ngày bắt đầu</span>
              </Table.HeadCell>
              <Table.HeadCell>
                <span className="text-slate-500">Ngày kết thúc</span>
              </Table.HeadCell>
              <Table.HeadCell>
                <span className="text-slate-500">Phần trăm giảm giá</span>
              </Table.HeadCell>
              <Table.HeadCell>
                <span className="text-slate-500">Số SP áp dụng</span>
              </Table.HeadCell>
              <Table.HeadCell>
                <span className="text-slate-500">Hành động</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {discounts.map((discount) => (
                <Table.Row key={discount._id}>
                  <Table.Cell>
                    <span className="text-slate-500">{discount.code}</span>
                  </Table.Cell>
                  <Table.Cell>
                    <span className="text-slate-500">
                      {formatDate(discount.startDate)}
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <span className="text-slate-500">
                      {formatDate(discount.endDate)}
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <span className="text-slate-500">
                      {discount.discountPercentage}%
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <span className="text-slate-500">
                      {discount.applicableProducts.length}
                    </span>
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
                        <Link to={`/dashboard?tab=editOrder`}>
                          <div className="flex items-center">
                            <LuEye size={20} />
                            <span className="ml-2">Edit</span>
                          </div>
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <div className="flex items-center">
                          <IoIosRemoveCircleOutline size={20} />
                          <span className="ml-2">Delete</span>
                        </div>
                      </Dropdown.Item>
                    </Dropdown>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        )}
      </div>
    </div>
  );
}