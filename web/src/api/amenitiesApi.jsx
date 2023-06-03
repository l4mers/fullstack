export async function fetchAmenities() {
  try {
    const response = await fetch('http://localhost:8080/get/amenities');
    if (!response.ok) {
      throw new Error('An error occurred while fetching amenities');
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    throw error;
  }
}
