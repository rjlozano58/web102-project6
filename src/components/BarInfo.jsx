import React from 'react';
import Navbar from './Navbar';
import { useParams } from 'react-router-dom';
import useFetchData from '../useFetchData';
import '../App.css';

const BarInfo = () => {
  const { id } = useParams();
  const { allBars, bar } = useFetchData(id);


  if (!bar) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />

      <h1>More info on {id}...</h1>

      <div className="info-container">
        <div className='name-box info-box'>
          <p>Name</p>
          <p>{bar.name}</p>
        </div>
        <div className='address-box info-box'>
          <p>Address</p>
          <p>{bar.street}, {bar.city}, {bar.state}</p>
        </div>
        <div className='website-box info-box'>
          <p>Website</p>
          { bar.website_url ? (
            <p><a target="_blank" href={bar.website_url}>{bar.website_url}</a></p>
          ) : (
            <p>No website:/</p>
          )
          
            }
        </div>
        <div className='phone-box info-box'>
          <p>Phone</p>
          <p>{bar.phone}</p>
        </div>
        
      </div>
    </>
  );
}

export default BarInfo;
