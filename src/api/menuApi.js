import axiosClient from "./axiosClient";

const menuApi = {
  addMenuForDay(data, currentUser, accessToken) {
    const url = "/menus";
    return axiosClient.post(url, data, {
      headers: {
        "x-client-id": currentUser?._id,
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },

  getMenuForDay(day, query) {
    const url = `/menus/${day}${query}`;
    return axiosClient.get(url);
  },
};

export default menuApi;
