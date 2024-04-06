import React from 'react';
import Navbar from '../components/Navbar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function About() {
  const mainURL = 'https://api.openbrewerydb.org/v1/breweries?per_page=200';
  const [stateCounts, setStateCounts] = useState({});

  useEffect(() => {
    async function fetchData() {
        try {
            const res = await axios.get(mainURL);
            const data = res.data;
            const counts = countStateOccurrences(data);
            setStateCounts(counts);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    fetchData();
  }, []);

  const countStateOccurrences = (bars) => {
    const counts = {};
    bars.forEach((bar) => {
        const { state, phone, website_url } = bar;
        if (!counts[state]) {
            counts[state] = { total: 0, phone: 0, website: 0 };
        }
        counts[state].total += 1;
        if (phone) {
            counts[state].phone += 1;
        }
        if (website_url) {
            counts[state].website += 1;
        }
    });
    return counts;
  };

  return (
    <div>
        <Navbar />
        <h2>About BrewBound</h2>
        <p>
            Welcome to our app! We provide information about bars and breweries
            across different states. Below you can find the number of bars in each
            state, as well as how many have phone numbers and websites provided.
        </p>
        <h3>Bars in Each State</h3>
        <table>
            <thead>
                <tr>
                    <th>State</th>
                    <th>Number of Bars</th>
                    <th>Bars with Phone Numbers</th>
                    <th>Bars with Websites</th>
                </tr>
            </thead>
            <tbody>
                {Object.entries(stateCounts).map(([state, { total, phone, website }]) => (
                    <tr key={state}>
                        <td>{state}</td>
                        <td>{total}</td>
                        <td>{phone}</td>
                        <td>{website}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  );
}

export default About;

