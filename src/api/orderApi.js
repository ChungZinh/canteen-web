import axiosClient from "./axiosClient";

const orderApi = {
  //get all orders
  getAll(query, currentUser, accessToken) {
    const url = `/orders${query}`;
    return axiosClient.get(url, {
      headers: {
        "x-client-id": currentUser?._id,
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },

  //create order
  create(data, currentUser, accessToken) {
    const url = "/orders";
    return axiosClient.post(url, data, {
      headers: {
        "x-client-id": currentUser?._id,
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },

  //delete order
  delete(id, currentUser, accessToken) {
    const url = `/orders/${id}`;
    return axiosClient.delete(url, {
      headers: {
        "x-client-id": currentUser?._id,
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
};

export default orderApi;
