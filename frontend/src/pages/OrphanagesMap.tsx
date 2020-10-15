import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import { FiArrowRight, FiPlus } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import "leaflet/dist/leaflet.css";

import MapMarkerImg from '../images/map-marker.svg';
import '../styles/pages/orphanages-map.css';
import happyMapIcon from '../utils/MapIcon';
import api from '../services/api';

interface Orphanage{
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}

function OrphanagesMap(){

  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  useEffect(() => {
    api.get('orphanages').then(response =>{

      setOrphanages(response.data);

    });
  }, []);

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={MapMarkerImg} alt="Happy" />

          <h2>Escolha um Orfanato no mapa</h2>
          <p>Muitas Crianças estão esperando sua visita </p>
        </header>

        <footer>
          <strong>Joinville</strong>
          <span>Santa Catarina</span>
        </footer>
      </aside>

      <Map 
        center={[-26.2640287,-48.7994574]}
        zoom={16.75}
        style={{
          width: '100%',
          height: '100%'
        }}
      >
        {/* {<TileLayer  url='https://a.tile.openstreetmap.org/{z}/{x}/{y}.png' />} */}
        <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}/>

        {orphanages.map(orphanage=>{

          return(
            <Marker 
              key={orphanage.id}
              position={[orphanage.latitude, orphanage.longitude]}
              icon={happyMapIcon}
            >
              <Popup 
                closeButton={false}
                minWidth={240}
                maxWidth={240}
                className="map-popup"
              >
                {orphanage.name}
                <Link to={`/orphanage/${orphanage.id}`}>
                  <FiArrowRight size={20} color="#fff"/>
                </Link>
              </Popup>
            </Marker>
          )

        })}

      </Map>

      <Link to="/orphanage/create" id="create-orphanage">
        <FiPlus size={32} color="#fff" />
      </Link>

    </div>
  )
}

export default OrphanagesMap;