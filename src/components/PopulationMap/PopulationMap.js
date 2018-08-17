
import React from 'react';
import mapboxgl from 'mapbox-gl'
import RangeSlider from './RangeSlider'
import {switchPopulationDate} from './Utilities'
import {lowestPopulation, highestPopulation} from './Data'
import Legend from './Legend'
import PopulationCount from './PopulationCount'
import ChartBox from './ChartBox'
        
mapboxgl.accessToken = "pk.eyJ1Ijoibm9lbHRlY2giLCJhIjoiY2o2azRiazZ2MTVlZDMxbXdvdTU1OW03YSJ9.eYd9NVbg2cgcrAqs0da8eA"
let hoveredStateId = null;
class PopulationMap extends React.Component {
    state = {
        style:"mapbox://styles/noeltech/cjjku7xsx0vay2spj959b5p5s?optimize=true",
        lng:122.55,
        lat:10.726,
        zoom:12.3, 
        rangeSliderValue : 0,
        highestPopulation : highestPopulation,
        lowestPopulation : lowestPopulation  ,
        year: 1970,
        totalPopulation: 209738
    };   

    handleSliderChange = (rangeClickValue) => {
        const populationDate = switchPopulationDate(rangeClickValue);
        this.setState({rangeSliderValue : rangeClickValue, year:populationDate[2] , totalPopulation:populationDate[1]})
        this.handleStyleChange(rangeClickValue)
       
    }

    handleStyleChange = (value) => {
        const populationDate = switchPopulationDate(value);
             const map = this.map;
             map.setPaintProperty('iloilo_city_barangay','fill-color',[
                "interpolate",
                [
                    "linear"
                ],
                [
                    "get",
                    populationDate[0]
                ],
                1000,
                "hsl(60, 100%, 95%)",
                2000,
                "hsl(53, 100%, 87%)",
                3000,
                "hsl(45, 98%, 78%)",
                4000,
                "hsl(40, 99%, 65%)",
                5000,
                "hsl(32, 99%, 58%)",
                6000,
                "hsl(26, 85%, 50%)",
                8000,
                "hsl(22, 98%, 40%)",
                10000,
                "hsl(19, 95%, 31%)",
                13000,
                "hsl(19, 89%, 21%)"
            ])
    }

    getBarangaylist = (populationDate) => {
        const features = this.map.queryRenderedFeatures({ layers: ['iloilo_city_barangay'] });
        let barangayList = [];
        features.map(feature => {
            barangayList.push({
                barangayName: feature.properties.BarangayNa, 
                population: feature.properties[populationDate]
            })
        })
        return barangayList;
    }

    getHighestPopulation = (barangayList) => {
        return  barangayList.sort((a, b)=> {
                    return  b.population - a.population
                    }).slice(0,5)     
    }

    getLowestPopulation = (barangayList) => {
        return  barangayList.filter((list) => list.population !== 0 )
                                    .sort((a, b) => a.population - b.population)
                                    .slice(0,5)
           
    }

    populationSwitch = (rangeValue) => {
        const populationDate = switchPopulationDate(rangeValue);
            const barangayList = this.getBarangaylist(populationDate[0])
            const highestPopulation = this.getHighestPopulation(barangayList);
            const lowestPopulation = this.getLowestPopulation(barangayList);
            this.setState({
                lowestPopulation: lowestPopulation,
                highestPopulation : highestPopulation
            })
    }

     highlightFeature = (e) => {

       console.log("from higllight feature : ",hoveredStateId)
        if (hoveredStateId) {           
            this.map.setFeatureState({ 
                source: "composite",
                sourceLayer:"IloiloCityBarangay_toMapbox-c2slan", 
                id: hoveredStateId},
                 { hover: false}
                ); 
                    
        }
        hoveredStateId = e.features[0].id;
        this.map.setFeatureState({
            source: "composite",
            sourceLayer:"IloiloCityBarangay_toMapbox-c2slan", 
            id: hoveredStateId}, 
            { hover: true});  
    }

    removeHighlight = () => {
        console.log("from remove higllight feature : ",hoveredStateId)
        if (hoveredStateId) {
            this.map.setFeatureState({
                source: "composite",
                sourceLayer:"IloiloCityBarangay_toMapbox-c2slan", 
                id : hoveredStateId}, 
                { hover: false}); 
        }
        hoveredStateId = null;
    }
    
    // shouldComponentUpdate(nextProps, nextState){
    //     if (this.state.hoveredStateId !== nextState.hoveredStateId){
    //         return false
    //     } else return true
    // }
    popupFeatureInfo(e,barangayName,populationValue,popup){
        const itemDescription = `<p>Brgy. ${barangayName}</p>
                                 <p>Population : ${populationValue}</p> `;
        popup.setLngLat(e.lngLat)
            .setHTML(itemDescription)
            .addTo(this.map)
    }

    
    componentDidMount(){
        const {lng, lat,zoom } = this.state;
            this.map = new mapboxgl.Map({
            container: this.mapContainer,
            style: this.state.style,
            center: [lng, lat],
            zoom,
            // attributionControl: false
        });
        const popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false
        });

        this.map.on("mousemove", "iloilo_city_barangay", (e) => {
           this. map.getCanvas().style.cursor = 'pointer'
            if (e.features.length > 0) {
                const barangayName = e.features[0].properties.BarangayNa
                
                const propertyValue = switchPopulationDate(this.state.rangeSliderValue);
                const populationValue = e.features[0].properties[propertyValue[2]]
                this.highlightFeature(e);
                this.popupFeatureInfo(e,barangayName,populationValue,popup)
            }
        });
        
        
        // When the mouse leaves the state-fill layer, update the feature state of the
        // previously hovered feature.
        this.map.on("mouseleave", "iloilo_city_barangay", ()=>{ 
            this. map.getCanvas().style.cursor = ''
               this.removeHighlight()
               popup.remove();
            
        });
    }   

    render(){
        return (
            <div style={{flexGrow:"1", display:"flex", position: "relative", flexDirection:"column"} }>
                <div ref={el => this.mapContainer = el} className="webmap" style={{flexGrow:"1"}} ></div>
                <RangeSlider
                    currentValue={this.state.rangeSliderValue} 
                    onSliderChange={this.handleSliderChange}
                    populationSwitch= {this.populationSwitch}
                />
                <ChartBox
                    highChartLimit = {this.state.highestPopulation[0].population}
                    highPopulation={this.state.highestPopulation}  
                    lowPopulation={this.state.lowestPopulation}   
                    lowChartLimit = {this.state.lowestPopulation[4].population / .5 }
                />
                <Legend/>
                <PopulationCount year={this.state.year} totalPopulation={this.state.totalPopulation}/>
            </div>
        )
    }    
}

 export default PopulationMap;
