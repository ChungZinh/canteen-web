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

  //get all orders
};

export default orderApi;
