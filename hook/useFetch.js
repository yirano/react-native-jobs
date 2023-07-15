import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (endpoint, query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);

  const options = {
    method: 'GET',
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    headers: {
      // 'X-RapidAPI-Key': process.env.RAPID_API_KEY,
      'X-RapidAPI-Key': '1012151047msh1738b76e3e40ba7p122e7fjsn51c846dccf26',
      'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
    },
    params: {
      ...query
    },
  };

  const fetchData = async () => {
    setIsLoading(true);

    try { 
      const response = await axios.request(options)
      setData(response.data.data)
      setIsLoading(false)
    } catch (error) {
      setError(error)
      alert("There is an error")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  }

  return { data, isLoading, error, refetch };
};

export default useFetch;