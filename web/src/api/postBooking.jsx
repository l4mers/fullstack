import axios from "axios";
import { getItem } from "../utils/storage";

const postBooking = (venueId, body) => {
  const user = getItem("user");
  const token = getItem("token");

  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/get/booking?userId=${user.id}&venueId=${venueId}`,
        body,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Response data from Venue post", response.data);
      resolve(response.data);
    } catch (error) {
      console.error("Error:", error.response.status);
      reject(error);
    }
  });
};

export default postBooking;
