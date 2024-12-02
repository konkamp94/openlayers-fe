import { useMutation, useQueryClient } from 'react-query';
import { AxiosError } from "axios";
import locationsService from "../../services/locations.service";

const useUpdateUserLocation = (onSuccess: (() => void) | null = null) => {
    const queryClient = useQueryClient();

    const { mutate, isLoading } = useMutation(
        ({ id, body }: { id: number, body: { name: string; lng: number; lat: number; } }) =>
            locationsService.updateUserLocation(id, body), {
        onSuccess: () => {
            queryClient.invalidateQueries(['user-locations']);
            if (onSuccess) { onSuccess() }
        },
        onError: (error: AxiosError) => {
            console.log(error);
        }
    });

    return {
        updateUserLocation: mutate,
        isLoadingUpdateUserLocation: isLoading
    };
};

export default useUpdateUserLocation;