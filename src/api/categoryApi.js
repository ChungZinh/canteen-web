import axiosClient from "./axiosClient";

const categoryApi = {
  getAll() {
    const url = "/categories";
    return axiosClient.get(url);
  },

  create(data, currentUser, accessToken) {
    const url = "/categories";
    return axiosClient.post(url, data, {
      headers: {
        "x-client-id": currentUser?._id,
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },

  delete(id, currentUser, accessToken) {
    const url = `/categories/${id}`;
    return axiosClient.delete(url, {
      headers: {
        "x-client-id": currentUser?._id,
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },

  update(id, data, currentUser, accessToken) {
    const url = `/categories/${id}`;
    return axiosClient.delete(url, data, {
      headers: {
        "x-client-id": currentUser?._id,
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
};

export default categoryApi;
