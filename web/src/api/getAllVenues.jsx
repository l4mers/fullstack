import axios from "axios";

const getAllVenue = async (dispatch) => {
  try {
    const response = await axios.get(`http://localhost:8080/get/venues/all`);
    console.log("Response data from getVenue", response.data);
    return response.data;
  } catch (error) {
    console.error("Get venue failed:", error);
  }
};

export default getAllVenue;
