import axiosClient from "./axiosClient";

const sendMailApi = {
  sendMailContact(data) {
    const url = "/contact/send-email";
    return axiosClient.post(url, data);
  },
};

export default sendMailApi;
