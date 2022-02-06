export interface IAuthState {
	isAuth: boolean;
	name: string;
	loading: boolean;
}
export interface IUser {
	name: string;
	email: string;
	password: string;
}

export enum AuthActionType {
	AUTH_USER = 'AUTH_USER',
	LOGOUT_USER = 'LOGOUT_USER',
	LOADING_USER = 'LOADING_USER',
}

export type LoadingUser = {
	type: AuthActionType.LOADING_USER;
	payload: boolean;
};

export type AuthUser = {
	type: AuthActionType.AUTH_USER;
	payload: {
		auth: boolean;
		name: string;
	};
};
export type LogOutUser = {
	type: AuthActionType.LOGOUT_USER;
};
export type AuthAction = AuthUser | LogOutUser | LoadingUser;
