import axios from "axios";
import { setLoadingState } from "../store/modules/loaderSlice";
import { getItem } from "../utils/storage";

const getVenue = (venueId, isAuthenticated) => async (dispatch) => {
  const token = getItem("token");

  dispatch(setLoadingState(true));
  try {
    let config = {};
    if (isAuthenticated) {
      config = {
        headers: { Authorization: `Bearer ${token}` },
      };
    }
    const response = await axios.get(
      `http://localhost:8080/get/venue/${venueId}`,
      config
    );
    console.log("Response data from getVenue", response.data);
    dispatch(setLoadingState(false));
    return response.data;
  } catch (error) {
    dispatch(setLoadingState(false));
    console.error("Get venue failed:", error);
  }
};

export default getVenue;
