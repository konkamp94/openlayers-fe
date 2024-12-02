import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { useContext, useEffect, useRef, useState } from "react";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Feature, Overlay } from "ol";
import Point from "ol/geom/Point";
import Style from "ol/style/Style";
import Icon from "ol/style/Icon";
import { Box, IconButton } from "@mui/material";
import LocationForm from "./LocationForm";
import { LocationsContext } from "../../context/locations.context";
import CloseIcon from '@mui/icons-material/Close';
import {fromLonLat, toLonLat} from 'ol/proj';
import Text from "ol/style/Text";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import LineString from "ol/geom/LineString";
import { set } from "ol/transform";

const HomeMap = () => {
    const [map, setMap] = useState<any>(null);
    const [userLocationMarkersLayer, setUserLocationsMarkersLayer] = useState<any>(null);
    const [formDisplay, setFormDisplay] = useState<any>('none');
    const [lastFormOverlay, setLastFormOverlay] = useState<any>(null);
    const [lastRouteLayer, setLastRouteLayer] = useState<any>(null);
    const [clickedLocation, setClickedLocation] = useState<any>(null);
    const { predefinedLocations, userLocations, setCalculateRouteLocations, routeData } = useContext(LocationsContext);
    const formRef = useRef();
    
    //initialize map
    useEffect(() => {
      const map = new Map({
        target: "map",
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        view: new View({
          center: [0, 0],
          zoom: 2,
        }),
      });

      setMap(map);

      return () => {
        map.setTarget(undefined);
      };
    }, []);

    // display predefined locations
    useEffect(() => {
      if(map && predefinedLocations) {
            const markersFeatures: Feature<Point>[] = [];
            predefinedLocations.forEach((location) => {
              const markerFeature = new Feature({
                id: location.id,
                name: location.name,
                type: 'predefined-location-marker',
                geometry: new Point(fromLonLat(location.coordinates.coordinates)),
              })
    
              markersFeatures.push(markerFeature);
            })
    
            const styleIcon = new Style({
              image: new Icon({
                src: '/predefined-map-marker.png',
                anchor: [0.5, 1],
                scale: 0.08,
              })
            })
            const styleLabel = new Style({
              text: new Text({
                font: '24px Calibri,sans-serif',
                overflow: true,
                fill: new Fill({
                  color: '#000'
                }),
                stroke: new Stroke({
                  color: '#fff',
                  width: 3
                }),
                offsetY: -50
              })
            })
    
            const markersLayer = new VectorLayer({
              source: new VectorSource({
                features: markersFeatures
              }),
              style: (feature) => {
                styleLabel.getText()?.setText(feature.get('name'));
                return [styleIcon, styleLabel];
              }
            })
            map.addLayer(markersLayer);
        }
    }, [predefinedLocations, map]);

    // display user locations
    useEffect(() => {
      if(map && userLocations) {
        removeFormOverlay();
        removeUserLocationsMarkersLayer();
        const markersFeatures: Feature<Point>[] = [];
        userLocations.forEach((location) => {
          const markerFeature = new Feature({
            id: location.id,
            name: location.name,
            type: 'user-location-marker',
            geometry: new Point(fromLonLat(location.coordinates.coordinates)),
          })

          markersFeatures.push(markerFeature);
        })

        const styleIcon = new Style({
          image: new Icon({
            // src: 'https://openlayers.org/en/latest/examples/data/icon.png',
            src: '/map-marker.png',
            anchor: [0.5, 1],
            scale: 0.6,
          })
        })
        const styleLabel = new Style({
          text: new Text({
            font: '24px Calibri,sans-serif',
            overflow: true,
            fill: new Fill({
              color: '#000'
            }),
            stroke: new Stroke({
              color: '#fff',
              width: 3
            }),
            offsetY: -50
          })
        })

        const markersLayer = new VectorLayer({
          source: new VectorSource({
            features: markersFeatures
          }),
          style: (feature) => {
            styleLabel.getText()?.setText(feature.get('name'));
            return [styleIcon, styleLabel];
          }
        })
        setUserLocationsMarkersLayer(markersLayer);
        map.addLayer(markersLayer);
      }
    }, [userLocations, map]);

    // map events
    useEffect(() => {
      if(map) {
        map.on('click', (event) => {
          let hasMarker = false;
          map.forEachFeatureAtPixel(event.pixel, (feature) => { 
            if(feature.get('type') === 'predefined-location-marker') {
              alert(`You cannot edit a predefined location`)
              hasMarker = true;
            } else if(feature.get('type') === 'user-location-marker') {              
              setClickedLocation({x: feature.getGeometry().getCoordinates()[0], 
                                  y: feature.getGeometry().getCoordinates()[1], 
                                  name: feature.get('name'), 
                                  id: feature.get('id')});
              hasMarker = true;
            }
          })
          if(!hasMarker) {
            setClickedLocation({x: event.coordinate[0], y: event.coordinate[1], name: '', id: null});
          }
        });

        map.on('contextmenu', (event) => {
          event.preventDefault();
          map.forEachFeatureAtPixel(event.pixel, (feature) => {
            if(feature.get('type') === 'user-location-marker' || feature.get('type') === 'predefined-location-marker') {
              setCalculateRouteLocations((prev) => {
                const locationExists = !!prev.find((location) => location.id === feature.get('id'));
                if(locationExists) { return prev }
                const [lng, lat] = toLonLat(feature.getGeometry().getCoordinates());
                return [...prev, {id: feature.get('id'), name: feature.get('name'), lng, lat}]
              })  
            }
          });
        });
      }
    }, [map]);

    // display form for adding user location on click location
    useEffect(() => {
      if(map && clickedLocation) {
        const form = new Overlay({
          element: formRef.current,
          autoPan: {
            animation: {
              duration: 250,
            },
          },
        })
        setFormDisplay('block');
        form.setPosition([clickedLocation.x, clickedLocation.y]);
        setLastFormOverlay(form);
        map.addOverlay(form);

      }
    }, [map, clickedLocation]);

    useEffect(() => {
      if(map && !routeData && lastRouteLayer) {
        removeRouteLayer();
      }

      if(map && routeData) {
          const geometry = new LineString(routeData.features[0].geometry.coordinates.map((coordinate: number[]) => fromLonLat(coordinate)));
          const feature = new Feature({
            type: 'route',
            geometry
          });
          const routeLayer = new VectorLayer({
            source: new VectorSource({
              features: [feature],
            }),
            style: new Style({
              stroke: new Stroke({
                width: 6,
                color: [237, 212, 0, 0.8],
              }),
            }),
          });
          map.addLayer(routeLayer);
          setLastRouteLayer(routeLayer);
      }
    }, [map, routeData])

    const removeFormOverlay = () => {
      map.removeOverlay(lastFormOverlay);
    }

    const removeUserLocationsMarkersLayer = () => {
      map.removeLayer(userLocationMarkersLayer);
    }

    const removeRouteLayer = () => {
      map.removeLayer(lastRouteLayer);
    }

    return (
        <>  
          <Box id="map" style={{width: "100%", height: "50vh"}}/>
          <Box ref={formRef} sx={{ display: formDisplay}}>
              <IconButton
                sx={{
                position: "absolute",
                top: -3,
                right: -3,
                }}
                onClick={removeFormOverlay}
              >
                <CloseIcon />
              </IconButton>
              <LocationForm x={clickedLocation?.x} y={clickedLocation?.y} name={clickedLocation?.name} id={clickedLocation?.id}/>
          </Box>
        </>
    );
}

export default HomeMap;