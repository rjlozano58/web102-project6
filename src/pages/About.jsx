import React from 'react'
import Navbar from '../components/Navbar'
import {useState, useEffect} from 'react'
import axios from 'axios'

function About() {

    const mainURL= "https://api.openbrewerydb.org/v1/breweries?per_page=200";
    const [allBars,setBars] = useState([]);
    const [totalBars,setTotalBars] = useState(0);
    const [stateCounts,setStateCounts] = useState([]);

    useEffect(() => {
        async function fetchData() {

        try {
            const res = await axios.get(mainURL);
            const data = res.data;
            setBars(data);
            setTotalBars(data.length);
            const counts = countStateOccurrences(data);
                setStateCounts(counts);
            
        } catch (error) {
            // Handle errors here
            console.error("Error fetching data:", error);
        }

        }
        
        
        fetchData();
    }, []);

    const countStateOccurrences = (bars) => {
        const stateSet = new Set();
        bars.forEach(bar => {
            stateSet.add(bar.state);
        });
        return Array.from(stateSet).map(state => bars.filter(bar => bar.state === state).length);
    };

  return (
    
    <div>
        <Navbar/>
        {Array.isArray(allBars) && allBars.map((bar, index) => (
            <li key={index}>
                {bar.state}: {stateCounts[index]}
            </li>
        ))}  
    </div>

  )
}

export default About