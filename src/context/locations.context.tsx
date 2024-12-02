import { createContext, ReactNode, useEffect, useState} from "react";
import { LocationsContextValue } from "./interfaces.context";
import useGetUserLocations from "../hooks/api/useGetUserLocations";
import useGetPredefinedLocations from "../hooks/api/useGetPredefinedLocations";

const initialLocationsContextValue = {} as LocationsContextValue 
export const LocationsContext = createContext<LocationsContextValue>(initialLocationsContextValue)

export const LocationsProvider = ({ children}: { children: ReactNode}) => {
    const { userLocationsData, isLoadingUserLocationsData } = useGetUserLocations()
    const { predefinedLocationsData, isLoadingPredefinedLocationsData } = useGetPredefinedLocations()

    const [predefinedLocations, setPredefinedLocations] = useState<any>([])
    const [userLocations, setUserLocations] = useState<any>([])
    const [calculateRouteLocations, setCalculateRouteLocations] = useState<any[]>([])
    const [routeData, setRouteData] = useState<any>(null)

    useEffect(() => {
      if(userLocationsData) {
        setUserLocations(userLocationsData.data)
      }
    }, [userLocationsData])

    useEffect(() => {
        if(predefinedLocationsData) {
          setPredefinedLocations(predefinedLocationsData.data)
        }
    }, [predefinedLocationsData])

    return (<LocationsContext.Provider value={{ predefinedLocations, userLocations, setUserLocations, calculateRouteLocations, setCalculateRouteLocations, routeData, setRouteData, isLoading: isLoadingUserLocationsData || isLoadingPredefinedLocationsData }}>
                {children}
            </LocationsContext.Provider>)
}