import { useParams } from "react-router-dom";

function useLocationParams() {
  const params = useParams();
  const locationParts = params["*"]
    ? params["*"].split("/").map((part) => part.replace(/_/g, " "))
    : [];
  return locationParts;
}

export default useLocationParams;
