import { Avatar, Badge, Button, Card, Table, TableHead } from "flowbite-react";
import { TbCoin } from "react-icons/tb";
import { useSelector } from "react-redux";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const wallet = {
    balance: 70000,
    transaction: [
      {
        id: 1,
        amount: 10000,
        date: "2022-10-10",
        description: "Nạp tiền vào ví",
      },
      {
        id: 2,
        amount: -15000,
        date: "2022-10-11",
        description: "Mua mì tôm",
      },
      {
        id: 3,
        amount: -15000,
        date: "2022-10-12",
        description: "Mua coca cola",
      },
    ],
  };

  const listOrders = [
    {
      id: 1,
      date: "2022-10-10",
      products: [
        {
          name: "Mì tôm",
          quantity: 2,
          price: 10000,
        },
        {
          name: "Coca cola",
          quantity: 1,
          price: 5000,
        },
      ],
      status: "Đã giao",
      total: 25000,
    },
    {
      id: 2,
      date: "2022-10-11",
      products: [
        {
          name: "Mì tôm",
          quantity: 2,
          price: 10000,
        },
        {
          name: "Coca cola",
          quantity: 1,
          price: 5000,
        },
      ],
      status: "Đã giao",
      total: 25000,
    },
    {
      id: 3,
      date: "2022-10-12",
      products: [
        {
          name: "Mì tôm",
          quantity: 2,
          price: 10000,
        },
        {
          name: "Coca cola",
          quantity: 1,
          price: 5000,
        },
      ],
      status: "Đã giao",
      total: 25000,
    },
  ];
  return (
    <div className="overflow-x-hidden">
      <div className="max-w-screen-xl mx-auto mt-[120px]  justify-center items-center  bg-opacity-70 backdrop-blur-sm">
        <Card className="h-[320px]  w-full">
          <div
            className="h-2/3 "
            style={{
              backgroundImage: `url("https://img.freepik.com/free-vector/white-abstract-background_23-2148810113.jpg?t=st=1729518083~exp=1729521683~hmac=11b1b6d17cd6293835c9388053f266792eeb1e5a076a16e3a37a32668f13c693&w=1380")`,
              // backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
          <div className="h-1/3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <Avatar
                  alt="User settings"
                  img={currentUser?.avatar}
                  className="border h-[100px] w-[100px]"
                />
                <div className="">
                  <h1 className="text-2xl font-bold">
                    {currentUser?.fullName}
                  </h1>
                  <p className="text-lg">
                    MSSV: {currentUser?.studentId || "Chưa cập nhật"}
                  </p>
                </div>
              </div>
              <div className="">
                {/* POINT */}
                <div className="flex items-center gap-4 bg-slate-200 p-2 rounded-md border">
                  <div className="flex items-center gap-2">
                    <TbCoin className="h-6 w-6" />
                    <span className="text-lg font-bold">
                      {wallet.balance.toLocaleString()}đ
                    </span>
                  </div>
                  <Button className="bg-slate-600">Nạp Tiền</Button>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="mt-8 flex gap-8">
          <Card className="w-1/3">
            <h1 className="text-2xl font-bold border-b pb-4">
              Thông tin cá nhân
            </h1>
            <div className="">
              <div className="space-y-2">
                <div className="">
                  <h2 className="text-lg font-semibold">Họ và tên:</h2>
                  <p>{currentUser?.fullName}</p>
                </div>
                <div className="">
                  <h2 className="text-lg font-semibold">Email:</h2>
                  <p>{currentUser?.email}</p>
                </div>
                <div className="">
                  <h2 className="text-lg font-semibold">Số điện thoại:</h2>
                  <p>{currentUser?.phone}</p>
                </div>
                <div className="border-t pt-4">
                  <Button className="bg-slate-600 w-full border-t">
                    Chỉnh sửa
                  </Button>
                </div>
              </div>
            </div>
          </Card>
          <Card className="w-2/3 h-fit">
            <h1 className="text-2xl font-bold border-b pb-4">
              Lịch sử giao dịch
            </h1>
            <div className="">
              <Table striped>
                <Table.Head>
                  <Table.HeadCell>STT</Table.HeadCell>
                  <Table.HeadCell>Số tiền</Table.HeadCell>
                  <Table.HeadCell>Ngày</Table.HeadCell>
                  <Table.HeadCell>Mô tả</Table.HeadCell>
                </Table.Head>
                <Table.Body>
                  {wallet.transaction.map((item) => (
                    <Table.Row key={item.id}>
                      <Table.Cell>{item.id}</Table.Cell>
                      <Table.Cell>
                        {item.amount > 0 ? (
                          <Badge color="success">
                            {item.amount.toLocaleString()}đ
                          </Badge>
                        ) : (
                          <Badge color="failure">
                            {item.amount.toLocaleString()}đ
                          </Badge>
                        )}
                      </Table.Cell>
                      <Table.Cell>{item.date}</Table.Cell>
                      <Table.Cell>{item.description}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>
          </Card>
        </div>

        <div className="mt-8 mb-8">
          <Card className="w-full">
            <h1 className="text-2xl font-bold border-b pb-4">
              Lịch sử mua hàng
            </h1>
            <div className="">
              <div className="">
                <Table striped>
                  <Table.Head>
                    <Table.HeadCell>STT</Table.HeadCell>
                    <Table.HeadCell>Ngày</Table.HeadCell>
                    <Table.HeadCell>Tên sản phẩm</Table.HeadCell>
                    <Table.HeadCell>Số lượng</Table.HeadCell>
                    <Table.HeadCell>Giá</Table.HeadCell>
                    <Table.HeadCell>Trạng thái</Table.HeadCell>
                    <Table.HeadCell>Tổng tiền</Table.HeadCell>
                  </Table.Head>
                  <Table.Body>
                    {listOrders.map((order, index) => (
                      <Table.Row key={order.id}>
                        <Table.Cell>{index + 1}</Table.Cell>
                        <Table.Cell>{order.date}</Table.Cell>
                        <Table.Cell colSpan={3}>
                          <table className="w-full">
                            <tbody>
                              {order.products.map((product, idx) => (
                                <tr key={idx}>
                                  <td>{product.name}</td>
                                  <td>{product.quantity}</td>
                                  <td>{product.price.toLocaleString()}đ</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </Table.Cell>
                        <Table.Cell>{order.status}</Table.Cell>
                        <Table.Cell>{order.total.toLocaleString()}đ</Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
