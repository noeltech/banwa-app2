import React from 'react';
import ReactDOM from 'react-dom';
// import configureStore from './store/configureStore';

// import AppRouter from './routers/AppRouter'
 import 'mapbox-gl/dist/mapbox-gl.css'
// import 'react-rangeslider/lib/index.css'

import Header from './components/Header'
import PopulationMap from './components/PopulationMap/PopulationMap'
import 'normalize.css/normalize.css';
import './styles/styles.scss';



const jsx = (
   <div className='app1'>
        <Header/>
        <PopulationMap/>
   </div> 
   
)
ReactDOM.render(jsx, document.getElementById('app'));
