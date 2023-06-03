import { useState, useEffect } from 'react';
import { fetchAmenities } from '../api/amenitiesApi';

function useAmenities() {
  const [amenities, setAmenities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchAmenities();
        setAmenities(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { amenities, loading, error };
}

export default useAmenities;
