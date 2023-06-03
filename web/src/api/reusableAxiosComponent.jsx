import axios from "axios";

const reusableAxiosComponent = (data, endpoint, request) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: request,
        url: `http://fullstack-holidays-1:8081/get/user/${endpoint}`,
        data: data,
      });
      console.log("Response data from User post", response.data);
      resolve(response.data);
    } catch (error) {
      console.error("Error:", error.response?.status);
      reject(error);
    }
  });
};

export default reusableAxiosComponent;
