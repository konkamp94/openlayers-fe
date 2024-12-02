export interface LocationsContextValue {
    predefinedLocations: any[],
    userLocations: any[],
    calculateRouteLocations: any[],
    routeData: any,
    isLoading: boolean,
    setRouteData: (data: any) => void,
    setUserLocations: (locations: any[]) => void,
    setCalculateRouteLocations: (locations: any[]) => void
} 