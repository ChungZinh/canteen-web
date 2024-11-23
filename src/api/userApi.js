import axiosClient from "./axiosClient";

const userApi = {
  getUsers(query, currentUser, accessToken) {
    const url = `/users${query}`;
    return axiosClient.get(url, {
      headers: {
        "x-client-id": currentUser?._id,
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },

  getUserById(userId, query, currentUser, accessToken) {
    const url = `/users/${userId}${query}`;
    return axiosClient.get(url, {
      headers: {
        "x-client-id": currentUser?._id,
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
};

export default userApi;
