import { a } from "framer-motion/client";
import axiosClient from "./axiosClient";

const foodApi = {
  getAllFoods() {
    const url = "/foods";
    return axiosClient.get(url);
  },

  create(data, currentUser, accessToken) {
    const url = "/foods";
    return axiosClient.post(url, data, {
      headers: {
        "x-client-id": currentUser?._id,
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },

  update(id, data, currentUser, accessToken) {
    const url = `/foods/${id}`;
    return axiosClient.put(url, data, {
      headers: {
        "x-client-id": currentUser?._id,
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },

  soldOut(id, currentUser, accessToken) {
    const url = `/foods/sold-out/${id}`;
    return axiosClient.delete(url, null, {
      headers: {
        "x-client-id": currentUser?._id,
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },

  available(id, currentUser, accessToken) {
    const url = `/foods/available/${id}`;
    return axiosClient.delete(url, null, {
      headers: {
        "x-client-id": currentUser?._id,
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
};

export default foodApi;