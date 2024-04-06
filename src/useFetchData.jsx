import { useState, useEffect } from 'react';
import axios from 'axios';

const mainURL = "https://api.openbrewerydb.org/v1/breweries?per_page=200";

function useFetchData(ID) {
  const [allBars, setBars] = useState([]);
  const [bar, setBar] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(mainURL);
        const data = res.data;
        setBars(data);

        const foundBar = data.find(b => b.name === ID);
        if (foundBar) {
          setBar(foundBar);
          console.log("Found this bar:", foundBar.name);
        } else {
          console.log("Bar not found with ID:", ID);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [ID]); // Adding ID as a dependency

  return { allBars, bar };
}

export default useFetchData;