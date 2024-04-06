import PropTypes from 'prop-types'
import '../App.css'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'
import StateBarChart from '../components/StateBarChart';


const Home = () => {

    const [count, setCount] = useState(0)
    const mainURL= "https://api.openbrewerydb.org/v1/breweries?per_page=200";
    const [allBars,setBars] = useState([]);
    const [totalBars,setTotalBars] = useState(0);
    const [searchBars,setSearchBars] = useState([]);
    const [barsWithWebsites, setBarsWithWebsites] = useState([]);
    const [barsWithPhoneNumbers, setBarsWithPhoneNumbers] = useState([]);
    const [search,setSearch] = useState("");
    const [popCity,setPopCity] = useState("");
    const [popState,setPopState] = useState("");
    const [closestBar, setClosestBar] = useState('');
    const [closestBarLink, setClosestBarLink] = useState('');
    const chiLat = 41.8781;
    const chiLong = -87.6298;


    useEffect(() => {
        async function fetchData() {

        try {
            const res = await axios.get(mainURL);
            const data = res.data;
            setBars(data);
            setTotalBars(data.length);
        } catch (error) {
            // Handle errors here
            console.error("Error fetching data:", error);
        }

        }
        
        fetchData();
    }, []);

    useEffect(() => {
        // Chicago's coordinates
        const chiLat = 41.8781;
        const chiLong = -87.6298;

        if (searchBars.length > 0) {
            const closest = findClosestBar(chiLat, chiLong, searchBars);
            setClosestBar(closest);
        }
    }, [searchBars]);

    const updateSearch = (event) =>{
        setSearch(event.target.value);
        console.log("new search: " + search);
    }

    function searchByName(){
        const newBars = allBars.filter(bar => bar.name.toLowerCase().includes(search.toLowerCase()) );
        const barsWithWebsite = newBars.filter(bar => bar.website_url);
        const barsWithPhoneNumber = newBars.filter(bar => bar.phone);

        setSearchBars(newBars);
        calculateMostPopularCity(newBars);
        calculateMostPopularState(newBars);
        setBarsWithWebsites(barsWithWebsite);
        setBarsWithPhoneNumbers(barsWithPhoneNumber);

    }

    function calculateMostPopularCity(breweries) {

        const cityCounts = {};
    
        breweries.forEach(brewery => {
        const city = brewery.city;
        if (cityCounts[city]) {
            cityCounts[city]++;
        } else {
            cityCounts[city] = 1;
        }
        });
    
        let mostPopularCity = '';
        let maxCount = 0;
    
        for (const city in cityCounts) {
        if (cityCounts[city] > maxCount) {
            mostPopularCity = city;
            maxCount = cityCounts[city];
        }
        }

        console.log(maxCount);
        console.log(mostPopularCity);
    
        setPopCity(mostPopularCity);
    }

    function calculateMostPopularState(breweries) {

        const stateCounts = {};
    
        breweries.forEach(brewery => {
        const state = brewery.state;
        if (stateCounts[state]) {
            stateCounts[state]++;
        } else {
            stateCounts[state] = 1;
        }
        });
    
        let mostPopularState = '';
        let maxCount = 0;
    
        for (const state in stateCounts) {
        if (stateCounts[state] > maxCount) {
            mostPopularState = state;
            maxCount = stateCounts[state];
        }
        }

        console.log(maxCount);
        console.log(mostPopularState);
        
        setPopState(mostPopularState);

    }

    function findClosestBar(lat, lon, breweries) {
        let tempclosestBar = null;
        let tempClosestBarLink = null;
        let minDistance = Number.MAX_VALUE;

        breweries.forEach(brewery => {
            const distance = getDistanceFromLatLonInMiles(lat, lon, brewery.latitude, brewery.longitude);
            if (distance < minDistance) {
                minDistance = distance;
                tempclosestBar = brewery.name;
                tempClosestBarLink = brewery.website_url;
            }
        });
        setClosestBarLink(tempClosestBarLink);
        return tempclosestBar;
    }

    function showAllBars(){
        setSearchBars(allBars);
        calculateMostPopularCity(searchBars);
        calculateMostPopularState(searchBars);
    }

    function handleWebsite(){
        setSearchBars(barsWithWebsites);
        calculateMostPopularCity(searchBars);
        calculateMostPopularState(searchBars);
    }

    function handlePhone(){
        setSearchBars(barsWithPhoneNumbers);
        calculateMostPopularCity(searchBars);
        calculateMostPopularState(searchBars);
    }

    function printAllBars(array){
        for (let i = 0; i < array.length;i++){
        console.log(array[i].name);
        }
    }

    function deg2rad(deg) {
        return deg * (Math.PI/180);
    }
    
    function getDistanceFromLatLonInMiles(lat1, lon1, lat2, lon2) {
        const earthRadius = 3958.8; // Earth radius in miles
        const dLat = deg2rad(lat2 - lat1);
        const dLon = deg2rad(lon2 - lon1);
        const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = Math.floor(earthRadius * c); // Distance in miles

        return distance;
    }


    return (
        <>

        <Navbar/>

        <h1 className='title'>Total Bars: {totalBars}</h1>

        {/* <img src="https://imgix.ranker.com/list_img_v2/1264/541264/original/the-very-best-of-the-drunk-baby-meme-u2?fit=crop&fm=pjpg&q=80&dpr=2&w=1200&h=720"/> */}
        <img src="https://media1.tenor.com/m/HmbunwazK9sAAAAC/drunk.gif"/>

        <div className='search-container'>
            <input type="text" value={search} onChange={updateSearch} placeholder="Search bars by name..."></input>
            <button onClick={searchByName}>click to search</button>
        </div>
        


        <div className="filter-container">
            <button className="filter-btn" onClick={showAllBars}>All Breweries</button>
            <button className="filter-btn" onClick={searchByName}>Show All From Search</button>
            <button className="filter-btn" onClick={handleWebsite}>Has Website</button>
            <button className="filter-btn" onClick={handlePhone}>Has Phone Number</button>
        </div>

        <div className='stats'>
            <h2 className='stats-box'>Brewries Found: {searchBars.length}</h2>
            <h2 className='stats-box'>Most Popular State: {popState}</h2>
            <h2 className='stats-box'>Most Popular City: {popCity}</h2>
            <h2 className='stats-box'>Closest City to Chicago: <a target="_blank" href={closestBarLink}>{closestBar}</a></h2>
        </div>



        <div className='state-chart'><StateBarChart bars={allBars} /></div>


            {searchBars.length > 0 || !search==="" ? (
            <div className='table-container'>
            <table >
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Street</th>
                    <th>City</th>
                    <th>State</th>
                    <th>Website</th>
                    <th>Phone</th>
                    <th>Approx. Distance from Chicago</th>
                </tr>
                </thead>
                <tbody>
                {searchBars.map(bar => (
                        <tr key={bar.id}>
                        <td><Link to={`/barinfo/${bar.name}`}>{bar.name}</Link></td>
                        <td>{bar.street}</td>
                        <td>{bar.city}</td>
                        <td>{bar.state}</td>
                        <td><a target="_blank" href={bar.website_url}>{bar.website_url}</a></td>
                        <td>{bar.phone}</td>
                        <td>{getDistanceFromLatLonInMiles(chiLat, chiLong, bar.longitude, bar.latitude)} miles</td>
                        </tr>

                ))}
                </tbody>
            </table>
            </div>


        ) : (
            <div>
                <p>No bars found matching the search criteria. Here are all Brewries!</p>
                
                <div className='table-container'>

                <table >
                    <thead>
                        <tr>
                        <th>Name</th>
                        <th>Street</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Website</th>
                        <th>Phone</th>
                        <th>Approx. Distance from Chicago</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allBars.map(bar => (
                        <tr key={bar.id}>
                            <td><Link to={`/barinfo/${bar.name}`}>{bar.name}</Link></td>
                            <td>{bar.street}</td>
                            <td>{bar.city}</td>
                            <td>{bar.state}</td>
                            <td><a target="_blank"  href={bar.website_url}>{bar.website_url}</a></td>
                            <td>{bar.phone}</td>
                            <td>{getDistanceFromLatLonInMiles(chiLat, chiLong, bar.longitude, bar.latitude)} miles</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            </div>
        )}

        </>
    )
}

export default Home