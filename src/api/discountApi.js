import axiosClient from "./axiosClient";

const discountApi = {

  get(currentUser, accessToken) {
    const url = "/discounts";
    return axiosClient.get(url, {
      headers: {
        "x-client-id": currentUser?._id,
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },

  create(data, currentUser, accessToken) {
    const url = "/discounts";
    return axiosClient.post(url, data, {
      headers: {
        "x-client-id": currentUser?._id,
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
};

export default discountApi;
