import axiosClient from "./axiosClient";


const authApi = {
  signIn(data) {
    const url = "/auth/signin";
    return axiosClient.post(url, data);
  },

  signUp(data) {
    const url = "/auth/signup";
    return axiosClient.post(url, data);
  },

  signOut(data, accessToken, currentUser) {
    const url = "/auth/logout";
    return axiosClient.post(url, data, {
      headers: {
        "x-client-id": currentUser?._id,
        "Authorization": `Bearer ${accessToken}`,
      },
    });
  },
};

export default authApi;
