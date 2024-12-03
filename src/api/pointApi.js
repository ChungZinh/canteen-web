import axiosClient from "./axiosClient";

const pointApi = {
  applyPoint(data, accessToken, currentUser) {
    const url = "/points";
    return axiosClient.post(url, data, {
      headers: {
        "x-client-id": currentUser?._id,
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
};

export default pointApi;
