import { Box, Button, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { LocationsContext } from "../../context/locations.context";
import { toLonLat } from "ol/proj";
import useCreateUserLocation from "../../hooks/api/useCreateUserLocation";
import useUpdateUserLocation from "../../hooks/api/useUpdateUserLocation";
import CircularProgress from '@mui/material/CircularProgress';
import useDeleteUserLocation from "../../hooks/api/useDeleteUserLocation";

const LocationForm = ({ x, y, name, id}) => {
    const [locationData, setLocationData] = useState<any>({name: '', lat: '', lon: ''});
    const { createUserLocation, isLoadingCreateUserLocation } = useCreateUserLocation();
    const { updateUserLocation, isLoadingUpdateUserLocation } = useUpdateUserLocation();
    const { deleteUserLocation, isLoadingDeleteUserLocation } = useDeleteUserLocation();
    // const { setUserLocations } = useContext(LocationsContext);
    
    useEffect(() => {
        if(!x || !y) return;
        setLocationData((prev) => ({
            name,
            lng: toLonLat([x, y])[0],
            lat: toLonLat([x, y])[1],
        }));
    }, [x, y, name]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLocationData((prev) => ({
          ...prev,
          [name]: value,
        }));
      };
      
      // change x, y with lan lot for save api call
      const handleSubmit = () => {
        if (id) {
          updateUserLocation({ id, body: { name: locationData.name, lng: locationData.lng, lat: locationData.lat } });
          return;
        }
        createUserLocation({ name: locationData.name, lng: locationData.lng, lat: locationData.lat });
      };

    return (
        <>
            <Box
            component="form"
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                maxWidth: 400,
                margin: "0 auto",
                padding: 3,
                boxShadow: 3,
                borderRadius: 2,
                backgroundColor: "white",
            }}
            >
                <TextField
                    label="Name"
                    name="name"
                    value={locationData.name}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    label="Longitude"
                    name="lon"
                    value={locationData.lng}
                    disabled
                    fullWidth
                />  
                <TextField
                    label="Latitude"
                    name="lat"
                    value={locationData.lat}
                    disabled
                    fullWidth
                />
                    <Button variant="contained" color="primary" onClick={handleSubmit} disabled={isLoadingCreateUserLocation || isLoadingUpdateUserLocation}>
                        {id ? "Update Location" : "Save Location"}  {isLoadingCreateUserLocation || isLoadingUpdateUserLocation ? <CircularProgress color="info" size={20}/> : null} 
                    </Button>
                    {id ?
                    <Button variant="contained" color="error" onClick={() => {deleteUserLocation(id)}} disabled={isLoadingDeleteUserLocation}>
                        Delete Location {isLoadingDeleteUserLocation ? <CircularProgress color="info" size={20}/> : null}
                    </Button> : null}
            </Box>
        </>
    );
}

export default LocationForm;