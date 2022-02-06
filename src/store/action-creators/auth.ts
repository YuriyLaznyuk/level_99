import {Dispatch} from 'redux';
import {AuthAction, AuthActionType, IUser} from '../../types/auth';

const host = window.location.origin;
const _host = `http://localhost:7654`;
const url = host === _host ? host : _host;

export const logOutUser = () => (dispatch: Dispatch<AuthAction>) => {
	localStorage.removeItem('token');
	dispatch({type: AuthActionType.LOGOUT_USER});
};

export const createUser =
	(user: IUser, navigate: (st: string) => void) =>
	async (dispatch: Dispatch<AuthAction>) => {
		dispatch({type: AuthActionType.LOADING_USER, payload: true});
		try {
			setTimeout(async () => {
				const response = await fetch(`${url}/api/registration`, {
					method: 'POST',
					headers: {'Content-Type': 'application/json; charset=utf-8'},
					body: JSON.stringify(user),
				});
				const json = await response.json();
				dispatch({type: AuthActionType.LOADING_USER, payload: false});
				alert(json.message);

				if (json.message === 'user create') {
					navigate('/authorization');
				}
			}, 3000);
		} catch (e) {
			dispatch({type: AuthActionType.LOADING_USER, payload: false});
			alert((e as Error).message);
		}
	};
export const loginUser =
	(
		payload: {email: string; password: string},
		navigate: (st: string) => void,
	) =>
	async (dispatch: Dispatch<AuthAction>) => {
		dispatch({type: AuthActionType.LOADING_USER, payload: true});
		try {
			const response = await fetch(`${url}/api/authorization`, {
				method: 'POST',
				headers: {'Content-Type': 'application/json; charset=utf-8'},
				body: JSON.stringify(payload),
			});
			const json = await response.json();
			if (json.message === 'success') {
				localStorage.setItem('token', json.token);
				dispatch({
					type: AuthActionType.AUTH_USER,
					payload: {auth: true, name: json.user.name},
				});
				dispatch({type: AuthActionType.LOADING_USER, payload: false});
				alert(json.message);
				navigate('/analytics');
			} else {
				alert(json.message);
				dispatch({type: AuthActionType.LOADING_USER, payload: false});
			}
		} catch (e) {
			dispatch({type: AuthActionType.LOADING_USER, payload: false});
			alert((e as Error).message);
		}
	};

export const tokenAuth = () => async (dispatch: Dispatch<AuthAction>) => {
	try {
		const response = await fetch(`${url}/api/auth`, {
			method: 'POST',
			headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
		});
		const json = await response.json();
		if (json.token) {
			localStorage.setItem('token', json.token);
			dispatch({
				type: AuthActionType.AUTH_USER,
				payload: {auth: true, name: json.user.name},
			});
		} else {
			dispatch({type: AuthActionType.LOGOUT_USER});
		}
	} catch (e) {
		console.log((e as Error).message);
		localStorage.removeItem('token');
		dispatch({type: AuthActionType.LOGOUT_USER});
	}
};

export const getDraw =
	(canvasRef: HTMLCanvasElement | any) => (dispatch: Dispatch<AuthAction>) => {
		dispatch({type: AuthActionType.LOADING_USER, payload: true});

		setTimeout(() => {
			const canvas = canvasRef.current;
			const ctx = canvas?.getContext('2d') as any;
			const height = ctx.canvas.height;
			ctx.fillStyle = '#000';
			ctx.lineWidth = 3;
			ctx.beginPath();
			ctx.strokeStyle = '#ccc';
			const coordinates = [];
			for (let i = 0; i < 40; i++) {
				const x = Math.floor(Math.random() * 690);
				const y = Math.floor(Math.random() * 490);
				coordinates.push({x: x, y: y});
			}

			coordinates.sort((a, b) => a.x - b.x);

			for (let i = 0; i < coordinates.length; i++) {
				if (i === 0) {
					ctx.moveTo(coordinates[i].x, height - coordinates[i].y);
				} else {
					ctx.lineTo(coordinates[i].x, height - coordinates[i].y);
				}
			}

			ctx.stroke();
			ctx.font = '16px';
			ctx.fillStyle = 'blue';

			ctx.fillText('0', 5, height - 10);
			ctx.fillText('100', 5, height - 110);
			ctx.fillText('200', 5, height - 210);
			ctx.fillText('300', 5, height - 310);
			ctx.fillText('400', 5, height - 410);

			ctx.fillText('100', 105, height - 10);
			ctx.fillText('200', 205, height - 10);
			ctx.fillText('300', 305, height - 10);
			ctx.fillText('400', 405, height - 10);
			ctx.fillText('500', 505, height - 10);
			ctx.fillText('600', 605, height - 10);
			dispatch({type: AuthActionType.LOADING_USER, payload: false});
		}, 3000);
	};
