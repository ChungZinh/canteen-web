import { Button, Dropdown, Pagination, Select, Table } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { HiSave } from "react-icons/hi";
import userApi from "../../api/userApi";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { MdModeEdit, MdMoreVert } from "react-icons/md";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { buildQueryString } from "../../utils/buildQueryString";

export default function DashListCustomers() {
  const btnRef = useRef();
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const { currentUser } = useSelector((state) => state.user);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const onPageChange = (pageN) => {
    if (pageN < 1 || pageN > totalPages) return;
    setCurrentPage(pageN);
    setQuery((prev) => ({ ...prev, page: pageN }));
  };

  const handleDetail = (student) => {
    navigate(`/dashboard?tab=detailCustomer`, { state: { student } });
  };

  useEffect(() => {
    setLoading(true);
    const fetchCustomers = async () => {
      const accessToken = localStorage.getItem("accessToken");
      const queryB = buildQueryString(query);
      const response = await userApi.getUsers(queryB, currentUser, accessToken);
      if (response.data) {
        setCustomers(response.data.users);
        setTotalPages(response.data.totalPages);
        setLoading(false);
      } else {
        toast.error("Failed to fetch customers");
        setLoading(false);
      }
    };
    fetchCustomers();
  }, [page, query, currentUser]);

  return (
    <div className="h-screen w-full bg-slate-200 p-6 overflow-y-scroll">
      {/* ADD PRODUCT */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold ">Danh sách khách hàng</h1>
          <p className="text-slate-500">Danh sách khách hàng của cửa hàng</p>
        </div>
      </div>

      {/* TABLE */}
      <div className="">
        <div className="mt-8">
          <Table striped>
            <Table.Head>
              <Table.HeadCell>Khách hàng</Table.HeadCell>
              <Table.HeadCell>Student ID</Table.HeadCell>
              <Table.HeadCell>SĐT</Table.HeadCell>
              <Table.HeadCell>Điểm</Table.HeadCell>
              <Table.HeadCell>Số đơn hàng</Table.HeadCell>
              <Table.HeadCell>Actions</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {customers.map((student) => (
                <Table.Row key={student.id}>
                  <Table.Cell className="font-semibold">
                    <div className="flex items-center gap-2">
                      <img
                        src={student.avatar}
                        alt={student.fullName}
                        className="w-10 h-10 object-center rounded-full"
                      />
                      <div className="space-y-1">
                        <div className="font-semibold">{student.fullName}</div>
                        <div className="text-xs font-light text-slate-500">
                          {student.email}
                        </div>
                      </div>
                    </div>
                  </Table.Cell>
                  <Table.Cell>{student.studentId}</Table.Cell>
                  <Table.Cell>{student.phone}</Table.Cell>
                  <Table.Cell>{student.points}</Table.Cell>
                  <Table.Cell>{student?.orders?.length}</Table.Cell>
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
                          onClick={() => handleDetail(student)}
                          className="flex items-center"
                        >
                          <MdModeEdit size={20} />
                          <span className="ml-2">Chỉnh sửa</span>
                        </div>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <div
                          // onClick={() => handleDeleteCategory(category._id)}
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
          {/* PAGINATION */}
          <div className="">
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
