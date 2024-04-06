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

    
        <h1 className='bar-info-title'>{id}</h1>

      <div className="info-container">
        <div className='name-box info-box'>
          <p>Name: {bar.name}</p>
          {/* <p>{bar.name}</p> */}
        </div>
        <div className='address-box info-box'>
          <p>Address: {bar.street}, {bar.city}, {bar.state}</p>
          {/* <p>{bar.street}, {bar.city}, {bar.state}</p> */}
        </div>
        <div className='website-box info-box'>
          { bar.website_url ? (
            <p>Website: <a target="_blank" href={bar.website_url}>{bar.website_url}</a></p>
          ) : (
            <p>No website:/</p>
          )
          
            }
        </div>
        <div className='phone-box info-box'>
            { bar.phone ? (
            <p>Phone: {bar.phone}</p>
          ) : (
            <p>No Phone Number:/</p>
          )
          
            }
        </div>
        
      </div>
    </>
  );
}

export default BarInfo;
