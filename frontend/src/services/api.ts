import { IUser } from '@/types';
import axiosInstance, { ISLEM_TOKEN_NAME, saveToken } from './config';

type RegisterUserTypes = IUser;

export const registerUser = async ({
	email,
	name,
	password,
}: RegisterUserTypes) => {
	try {
		const response = await axiosInstance.post('/user/create', {
			email,
			password,
			name,
		});
		return response.data.user;
	} catch (error) {
		console.log('error in registerUser', error);
		throw error;
	}
};

type LoginUserTypes = Omit<IUser, 'name'>;

export const loginUser: any = async ({ email, password }: LoginUserTypes) => {
	try {
		const response = await axiosInstance.post('/user/login', {
			email,
			password,
		});
		const _token = response.data.token;
		console.log(`token: ${_token}`);
		axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${_token}`;
		saveToken(ISLEM_TOKEN_NAME, _token);
		return response.data.user;
	} catch (error) {
		console.log('error in loginUser', error);
		throw error;
	}
};
