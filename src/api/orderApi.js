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

  getById(id, currentUser, accessToken) {
    const url = `/orders/${id}`;
    return axiosClient.get(url, {
      headers: {
        "x-client-id": currentUser?._id,
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },

  getOrderForChef(query, currentUser, accessToken) {
    const url = `/orders/chef${query}`;
    return axiosClient.get(url, {
      headers: {
        "x-client-id": currentUser?._id,
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },

  chefUpdateStatus(id, data, currentUser, accessToken) {
    const url = `/orders/chef/${id}`;
    return axiosClient.put(url, data, {
      headers: {
        "x-client-id": currentUser?._id,
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },

  getStatistics(currentUser, accessToken) {
    const url = `/orders/statistic`;
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

  completedOrder(id, data) {
    const url = `/orders/complete-order/${id}`;
    return axiosClient.put(url, data);
  },

  refundOrder( data, currentUser, accessToken) {
    const url = `/orders/refund`;
    return axiosClient.post(url, data, {
      headers: {
        "x-client-id": currentUser?._id,
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
};

export default orderApi;
