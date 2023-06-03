import axios from "axios";
import { getItem } from "../utils/storage";

const getUserMenuInfo = async () => {
  const user = getItem("user");
  const token = getItem("token");

  try {
    const response = await axios.get(
      `http://localhost:8080/get/user/menu/${user.id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log("Response data from getUserMenuInfo", response.data);
    return response.data;
  } catch (error) {
    console.error("Get venue failed:", error);
  }
};

export default getUserMenuInfo;
