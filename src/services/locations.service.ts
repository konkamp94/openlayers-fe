import { AxiosResponse } from "axios";
import { axiosInstance } from "./axios.config";
import axios from 'axios';
import { CalculateRouteBody } from "./interfaces.service";
class LocationsService {

    static instance: LocationsService | null = null;

    static getInstance = () => {
        if (!this.instance) {
            this.instance = new LocationsService();
        }

        return this.instance;
    };
    async getPredefinedLocations(): Promise<AxiosResponse> {
        return axios.get('http://127.0.0.1:3000/locations/predefined-location/');
    }

    async getUserLocations(): Promise<AxiosResponse> {
        return axios.get('http://127.0.0.1:3000/locations/user-location/');
    }

    async createUserLocation(body: { name: string, lng: number, lat: number }): Promise<AxiosResponse> {
        return axios.post('http://127.0.0.1:3000/locations/user-location/', body);
    }

    async updateUserLocation(id: number, body: { name: string, lng: number, lat: number }): Promise<AxiosResponse> {
        return axios.patch(`http://127.0.0.1:3000/locations/user-location/${id}`, body);
    }

    async deleteUserLocation(id: number): Promise<AxiosResponse> {
        return axios.delete(`http://127.0.0.1:3000/locations/user-location/${id}`);
    }

    async calculateRoute(body: CalculateRouteBody): Promise<AxiosResponse> {
        return axios.post('http://127.0.0.1:3000/locations/calculate-route/', body);
    }
}

export default LocationsService.getInstance()