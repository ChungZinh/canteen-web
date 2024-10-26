import { del } from "framer-motion/client";
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

  update(discountId, data, currentUser, accessToken) {
    const url = `/discounts/${discountId}`;
    return axiosClient.put(url, data, {
      headers: {
        "x-client-id": currentUser?._id,
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },

  delete(discountId, currentUser, accessToken) {
    const url = `/discounts/${discountId}`;
    return axiosClient.delete(url, {
      headers: {
        "x-client-id": currentUser?._id,
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },

  use(data, currentUser, accessToken) {
    const url = "/discounts/use";
    return axiosClient.post(url, data, {
      headers: {
        "x-client-id": currentUser?._id,
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
};

export default discountApi;
