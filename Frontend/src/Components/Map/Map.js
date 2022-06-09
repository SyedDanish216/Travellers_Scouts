import React from 'react';
import mapboxgl from 'mapbox-gl';
import "./Map.css"

mapboxgl.accessToken='pk.eyJ1IjoiYmx1ZXRzaGlydCIsImEiOiJjbDNmdTl3cXgwMnphM2RxdzdqY2hmNHdnIn0.R8SrGwPG55MNpMka5TpQ2Q';

class Map extends React.Component{

	// Set up states for updating map 
	constructor(props){
		super(props);
		this.state = {
			coordinates: this.props.geometry.coordinates,
			zoom: 13
		}
	}

	// Create map and lay over markers
	componentDidMount(){
		const map = new mapboxgl.Map({
			container: this.mapContainer,
			style: 'mapbox://styles/mapbox/streets-v11', 
			center: this.state.coordinates,
			zoom: this.state.zoom
		})

    // map.doubleClickZoom.disable()
    map.addControl(new mapboxgl.NavigationControl());

    map.on('load', function() {

      // Add source for admin-1 Boundaries
      map.addSource('admin-1', {
        type: 'vector',
        url: 'mapbox://mapbox.boundaries-adm1-v3'
      });
    
      // Add a layer with boundary polygons
      map.addLayer(
        {
          id: 'admin-1-fill',
          type: 'fill',
          source: 'admin-1',
          'source-layer': 'boundaries_admin_1',
          paint: {
            'fill-color': '#CCCCCC'
          }
        },
        
        'waterway-label'
      );
    });

	}

	render(){
		return(
			<div>
				<div ref={el => this.mapContainer = el} className="map-container"/>
			</div>
		)
	}
}

export default Map;