import { Button, Dropdown, Select, Table } from "flowbite-react";
import { useRef, useState } from "react";
import { HiSave } from "react-icons/hi";

export default function DashListCustomers() {
  const btnRef = useRef();
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState({ page: 1, limit: 10 });
  const [totalPages, setTotalPages] = useState(10);
  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setPage(pageNumber);
      setQuery((prevQuery) => ({
        ...prevQuery,
        page: pageNumber,
      }));
    }
  };

  const studentsData = [
    {
      id: 1,
      studentId: "123456",
      fullName: "John Doe",
      email: "johndoe@gmail.com",
      phone: "0123456789",
      address: "123 Street, City, Country",
      avatar:
        "https://cdn.pixabay.com/photo/2016/08/31/11/54/icon-1633249_1280.png",
      point: 100,
      countOfOrders: 5,
    },
    {
      id: 2,
      studentId: "234567",
      fullName: "Jane Smith",
      email: "janesmith@gmail.com",
      phone: "0987654321",
      address: "456 Avenue, City, Country",
      avatar:
        "https://cdn.pixabay.com/photo/2016/08/31/11/54/icon-1633249_1280.png",
      point: 90,
      countOfOrders: 3,
    },
    {
      id: 3,
      studentId: "345678",
      fullName: "Alice Johnson",
      email: "alicejohnson@gmail.com",
      phone: "0129876543",
      address: "789 Boulevard, City, Country",
      avatar:
        "https://cdn.pixabay.com/photo/2016/08/31/11/54/icon-1633249_1280.png",
      point: 85,
      countOfOrders: 4,
    },
    {
      id: 4,
      studentId: "456789",
      fullName: "Michael Brown",
      email: "michaelbrown@gmail.com",
      phone: "0234567890",
      address: "321 Road, City, Country",
      avatar:
        "https://cdn.pixabay.com/photo/2016/08/31/11/54/icon-1633249_1280.png",
      point: 95,
      countOfOrders: 6,
    },
    {
      id: 5,
      studentId: "567890",
      fullName: "Emily Davis",
      email: "emilydavis@gmail.com",
      phone: "0345678901",
      address: "654 Path, City, Country",
      avatar:
        "https://cdn.pixabay.com/photo/2016/08/31/11/54/icon-1633249_1280.png",
      point: 75,
      countOfOrders: 2,
    },
    {
      id: 6,
      studentId: "678901",
      fullName: "David Wilson",
      email: "davidwilson@gmail.com",
      phone: "0456789012",
      address: "987 Way, City, Country",
      avatar:
        "https://cdn.pixabay.com/photo/2016/08/31/11/54/icon-1633249_1280.png",
      point: 80,
      countOfOrders: 1,
    },
    {
      id: 7,
      studentId: "789012",
      fullName: "Sophia Martinez",
      email: "sophiamartinez@gmail.com",
      phone: "0567890123",
      address: "135 Lane, City, Country",
      avatar:
        "https://cdn.pixabay.com/photo/2016/08/31/11/54/icon-1633249_1280.png",
      point: 92,
      countOfOrders: 8,
    },
    {
      id: 8,
      studentId: "890123",
      fullName: "William Garcia",
      email: "williamgarcia@gmail.com",
      phone: "0678901234",
      address: "246 Street, City, Country",
      avatar:
        "https://cdn.pixabay.com/photo/2016/08/31/11/54/icon-1633249_1280.png",
      point: 88,
      countOfOrders: 7,
    },
    {
      id: 9,
      studentId: "901234",
      fullName: "Mia Hernandez",
      email: "miahernandez@gmail.com",
      phone: "0789012345",
      address: "357 Drive, City, Country",
      avatar:
        "https://cdn.pixabay.com/photo/2016/08/31/11/54/icon-1633249_1280.png",
      point: 95,
      countOfOrders: 9,
    },
    {
      id: 10,
      studentId: "012345",
      fullName: "James Lee",
      email: "jameslee@gmail.com",
      phone: "0890123456",
      address: "468 Road, City, Country",
      avatar:
        "https://cdn.pixabay.com/photo/2016/08/31/11/54/icon-1633249_1280.png",
      point: 77,
      countOfOrders: 3,
    },
  ];

  return (
    <div className="h-screen w-full bg-slate-200 p-6 overflow-y-scroll">
      {/* ADD PRODUCT */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold ">List Customers</h1>
          <p className="text-slate-500">List of all customers</p>
        </div>
      </div>

      {/* TABLE */}
      <div className="">
        {/* {loading ? (
          <div className="flex justify-center items-center h-[300px]">
            <Spinner className="text-primary" size="xl" />
          </div>
        ) : ( */}
        <div className="mt-8">
          <Table striped>
            <Table.Head>
              <Table.HeadCell>Customer</Table.HeadCell>
              <Table.HeadCell>Student ID</Table.HeadCell>
              <Table.HeadCell>PHONE</Table.HeadCell>
              <Table.HeadCell>POINT</Table.HeadCell>
              <Table.HeadCell>ORDERS</Table.HeadCell>
              <Table.HeadCell>Actions</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {studentsData.map((student) => (
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
                  <Table.Cell>{student.point}</Table.Cell>
                  <Table.Cell>{student.countOfOrders}</Table.Cell>
                  <Table.Cell>
                    <div className="flex items-center gap-2">
                      <Button className="bg-slate-600">
                        <HiSave size={20} />
                      </Button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          {/* PAGINATION */}
          <div className=" p-2 flex justify-between">
            <div className="flex items-center gap-2">
              <span>Rows per page:</span>
              <Select className="w-[80px]">
                <option>10</option>
                <option>20</option>
                <option>30</option>
              </Select>
            </div>

            <div className="flex items-center justify-end gap-2">
              <div className="flex items-center gap-2">
                <Button
                  size={"xs"}
                  color={"#475569"}
                  disabled={page === 1}
                  onClick={() => handlePageChange(page - 1)}
                >
                  Previous
                </Button>
                {Array.from({ length: totalPages }, (_, index) => (
                  <Button
                    key={index + 1}
                    size={"xs"}
                    color={"#475569"}
                    onClick={() => handlePageChange(index + 1)}
                    className={
                      page === index + 1 ? "bg-slate-600 text-white" : ""
                    }
                  >
                    {index + 1}
                  </Button>
                ))}
                <Button
                  size={"xs"}
                  color={"#475569"}
                  disabled={page === totalPages}
                  onClick={() => handlePageChange(page + 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
        {/* )} */}
      </div>
    </div>
  );
}
