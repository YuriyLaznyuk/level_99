export interface IAuthState {
	isAuth: boolean;
	name: string;
	loading: boolean;
	list: IList[];
	loadingList: boolean;
}
export interface IUser {
	name: string;
	email: string;
	password: string;
}

export interface IList {
	id: string;
	name: string;
	status: number;
	post: string;
	age: number;
}

export enum AuthActionType {
	AUTH_USER = 'AUTH_USER',
	LOGOUT_USER = 'LOGOUT_USER',
	LOADING_USER = 'LOADING_USER',
	LOADING_LIST = 'LOADING_LIST',
	CREATE_LIST = 'CREATE_LIST',
}

export type LoadingUser = {
	type: AuthActionType.LOADING_USER;
	payload: boolean;
};

export type LoadingList = {
	type: AuthActionType.LOADING_LIST;
	payload: boolean;
};

export type CreateList = {
	type: AuthActionType.CREATE_LIST;
	payload: IList[];
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
export type AuthAction =
	| AuthUser
	| LogOutUser
	| LoadingUser
	| LoadingList
	| CreateList;
