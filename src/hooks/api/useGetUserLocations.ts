import locationsService from "../../services/locations.service"
import { useQuery } from "react-query"
import { AxiosError } from "axios"

const useGetUserLocations = () => {

    const { data: userLocationsData, isLoading: isLoadingUserLocationsData } = useQuery(['user-locations'],
        async () => await locationsService.getUserLocations(),
        {
            //TODO handle error
            onError: (error: AxiosError) => { console.log(error) },
            refetchOnWindowFocus: false
        })

    return { userLocationsData, isLoadingUserLocationsData }
}

export default useGetUserLocations