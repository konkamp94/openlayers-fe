import BasicTable from "../shared/BasicTable";
const LocationList = ({ locations }: {locations: {id:number, name:string, lng: number, lat: number}[]}) => {

    return (
        <>  
            {locations.length > 0 ? <BasicTable rows={locations} labels={Object.keys(locations[0])} /> : null}
        </>
        
    );
};

export default LocationList;