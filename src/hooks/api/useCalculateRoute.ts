import { useMutation } from 'react-query';
import { AxiosError } from "axios";
import locationsService from "../../services/locations.service";

const useCalculateRoute = (onSuccess: ((...args) => void) | null = null) => {

    const { mutate, isLoading } = useMutation(locationsService.calculateRoute, {
        onSuccess: (axiosResponse) => {
            if (onSuccess) { onSuccess(axiosResponse.data) }
        },
        onError: (error: AxiosError) => {
            console.log(error);
        }
    });

    return {
        calculateRoute: mutate,
        isCalculatingRoute: isLoading
    };
};

export default useCalculateRoute;