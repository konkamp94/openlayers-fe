import { useContext } from "react";
import ContentHeader from "../shared/ContentHeader";
import { LocationsContext } from "../../context/locations.context";
import LocationList from "./LocationList";

const UserLocationList = () => {
    const { userLocations } = useContext(LocationsContext);
    return (
        <>
            <ContentHeader text='User Locations'/>
            {userLocations.length === 0 && <p>Click on the map to add a location</p>}
            <LocationList 
            locations={userLocations.map(location => ({id: location.id, name: location.name, lat: location.coordinates.coordinates[1], lng: location.coordinates.coordinates[0]}) )} />
        </>
    );
}

export default UserLocationList;