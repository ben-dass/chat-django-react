import axios, { AxiosInstance } from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';

const useAxiosWithInterceptor = (): AxiosInstance => {
	const jwtAxios = axios.create({ baseURL: API_BASE_URL });
	const navigate = useNavigate();

	const goRoot = () => navigate('/test');

	jwtAxios.interceptors.response.use(
		(response) => {
			return response;
		},
		async (error) => {
			// const originalRequest = error.config;
			if (error.response?.status === 403) {
				goRoot();
			}
			throw error;
		}
	);

	return jwtAxios;
};

export default useAxiosWithInterceptor;
