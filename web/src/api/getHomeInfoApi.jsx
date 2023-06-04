import axios from "axios";

const getHomeInfoApi = async () => {
  try {
    const response = await axios.get(`http://fullstack-holidays-1:8080/get/amenities`);
    console.log("Response data from getHomeInfoApi", response.data);
    return response.data;
  } catch (error) {
    console.error("Get venue failed:", error);
  }
};

export default getHomeInfoApi;
