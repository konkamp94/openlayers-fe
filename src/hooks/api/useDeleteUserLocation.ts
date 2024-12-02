import { useMutation, useQueryClient } from 'react-query';
import { AxiosError } from "axios";
import locationsService from "../../services/locations.service";

const useDeleteUserLocation = (onSuccess: (() => void) | null = null) => {
    const queryClient = useQueryClient();

    const { mutate, isLoading } = useMutation(locationsService.deleteUserLocation, {
        onSuccess: () => {
            queryClient.invalidateQueries(['user-locations']);
            if (onSuccess) { onSuccess() }
        },
        onError: (error: AxiosError) => {
            console.log(error);
        }
    });

    return {
        deleteUserLocation: mutate,
        isLoadingDeleteUserLocation: isLoading
    };
};

export default useDeleteUserLocation;