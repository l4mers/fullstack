import axios from "axios";
import { getItem } from "../utils/storage";

const editProfileApi = async (body) => {
  const user = getItem("user");
  const token = getItem("token");

  try {
    const response = await axios.put(
      `http://localhost:8080/get/user/media/${user.id}`,
      body,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log("Response data from editProfileApi", response.data);
    return response.data;
  } catch (error) {
    console.error("Get venue failed:", error);
  }
};

export default editProfileApi;
