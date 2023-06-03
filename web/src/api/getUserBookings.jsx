import axios from "axios";
import { setLoadingState } from "../store/modules/loaderSlice";
import { getItem } from "../utils/storage";

const getUserBookings = () => async (dispatch) => {
  const user = getItem("user");
  const token = getItem("token");

  dispatch(setLoadingState(true));
  try {
    const response = await axios.get(
      `http://localhost:8080/get/booking/user/${user.id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log("Response data from getUserBookings", response.data);
    dispatch(setLoadingState(false));
    return response.data;
  } catch (error) {
    dispatch(setLoadingState(false));
    console.error("Get venue failed:", error);
  }
};

export default getUserBookings;
