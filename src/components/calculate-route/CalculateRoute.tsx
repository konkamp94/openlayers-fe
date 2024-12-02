import { useContext } from "react"
import { LocationsContext } from "../../context/locations.context"
import ContentHeader from "../shared/ContentHeader";
import LocationList from "../locations/LocationList";
import useCalculateRoute from "../../hooks/api/useCalculateRoute";
import { Box, Button, CircularProgress } from "@mui/material";

const CalculateRoute = () => {
    const { calculateRouteLocations, setCalculateRouteLocations, setRouteData } = useContext(LocationsContext)
    const { calculateRoute, isCalculatingRoute } = useCalculateRoute((routeData) => { 
        setRouteData(routeData)
    })
    return (
        <>
            <Box display="flex" flexDirection="row">
                <ContentHeader text='Calculate Route Locations'/>
                <Button sx={{marginLeft: 'auto'}} variant="contained" color="warning" onClick={() => {
                    setRouteData(null)
                    setCalculateRouteLocations([])
                }}>Clear</Button>
            </Box>
            <Box>
                { calculateRouteLocations.length === 0 && <p>Add at least 2 Locations to Calculate a Route by right clicking the markers on the map</p>}
            </Box>
            <LocationList locations={calculateRouteLocations} />
            <Button 
                variant="contained" 
                color="primary" 
                sx={{ float: 'right', width: '100%', marginTop:2 }} 
                disabled={calculateRouteLocations.length < 2 || isCalculatingRoute} 
                onClick={() => calculateRoute({locations: calculateRouteLocations.map(location => [location.lng, location.lat])})}
                >Calculate Route {isCalculatingRoute ? <CircularProgress color="info" size={20}/> : null}
            </Button>
        </>
    )
}

export default CalculateRoute