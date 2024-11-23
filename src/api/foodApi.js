import axiosClient from "./axiosClient";

const foodApi = {
  getAllFoods(query) {
    const url = `/foods${query}`;
    return axiosClient.get(url);
  },

  getStatistics() {
    const url = "/foods/statistics";
    return axiosClient.get(url);
  },

  getTop10SellingProducts() {
    const url = "/foods/top-selling";
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
    return axiosClient.put(
      url,
      {}, // Empty body (no payload)
      {
        headers: {
          "x-client-id": currentUser?._id,
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  },

  available(id, currentUser, accessToken) {
    const url = `/foods/available/${id}`;
    return axiosClient.put(
      url,
      {}, // Empty body (no payload)
      {
        headers: {
          "x-client-id": currentUser?._id,
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  },

  getFood(id, currentUser, accessToken) {
    const url = `/foods/${id}`;
    return axiosClient.get(url, {
      headers: {
        "x-client-id": currentUser?._id,
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
};

export default foodApi;
