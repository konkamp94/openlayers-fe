import { useQuery } from "react-query"
import locationsService from "../../services/locations.service"
import { AxiosError } from "axios"

const useGetPredefinedLocations = () => {

    const { data: predefinedLocationsData, isLoading: isLoadingPredefinedLocationsData } = useQuery(['predefined-locations'],
        async () => await locationsService.getPredefinedLocations(),
        {
            //TODO handle error
            onError: (error: AxiosError) => { console.log(error) },
            refetchOnWindowFocus: false
        })

    return { predefinedLocationsData, isLoadingPredefinedLocationsData }
}

export default useGetPredefinedLocations