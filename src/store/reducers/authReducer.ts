import {AuthAction, AuthActionType, IAuthState} from '../../types/auth';

const initialState: IAuthState = {
	isAuth: false,
	name: '',
	loading: false,
	list: [],
	loadingList: false,
};
export const authReducer = (state = initialState, action: AuthAction) => {
	switch (action.type) {
		case AuthActionType.AUTH_USER:
			return {...state, isAuth: action.payload.auth, name: action.payload.name};
		case AuthActionType.LOGOUT_USER:
			return {...state, isAuth: false, name: ''};
		case AuthActionType.LOADING_USER:
			return {...state, loading: action.payload};
		case AuthActionType.CREATE_LIST:
			return {...state, list: action.payload};
		case AuthActionType.LOADING_LIST:
			return {...state, loadingList: action.payload};
		default:
			return state;
	}
};
