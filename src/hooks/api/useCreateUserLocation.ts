import { useMutation, useQueryClient } from 'react-query';
import { AxiosError } from "axios";
import locationsService from "../../services/locations.service";

const useCreateUserLocation = (onSuccess: (() => void) | null = null) => {
    const queryClient = useQueryClient();

    const { mutate, isLoading } = useMutation(locationsService.createUserLocation, {
        onSuccess: () => {
            queryClient.invalidateQueries(['user-locations']);
            if (onSuccess) { onSuccess() }
        },
        onError: (error: AxiosError) => {
            console.log(error);
        }
    });

    return {
        createUserLocation: mutate,
        isLoadingCreateUserLocation: isLoading
    };
};

export default useCreateUserLocation;