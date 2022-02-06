import React, {useState} from 'react';
import {Box, Button, TextField, Typography} from '@mui/material';
import {useAction} from '../../hooks/useAction';
import {useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/reducers';
import Preloader from '../../components/Preloader/Preloader';

const Authorization = () => {
	const [user, setUser] = useState({email: '', password: ''});
	const {email, password} = user;
	const {loginUser} = useAction();
	const {loading} = useSelector((state: RootState) => state.auth);
	const navigate = useNavigate();
	const validPassword = /^\w{3,}$/.test(password);
	const validEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email);

	return (
		<div>
			<Typography variant='h3' sx={{textAlign: 'center', mt: 3}}>
				Authorization
			</Typography>

			{loading && (
				<Box
					component='div'
					sx={{
						display: 'flex',
						justifyContent: 'center',
						textAlign: 'center',
						mt: 3,
					}}>
					<Preloader />
				</Box>
			)}
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					flexDirection: 'column',
					mt: 4,
				}}>
				<Box sx={{my: 2}}>
					<TextField
						onChange={(e) => setUser({...user, email: e.target.value})}
						placeholder='email'
						value={email}
						error={!validEmail && email.length > 0}
						label={!validEmail && email.length > 0 ? 'invalid email' : ''}
					/>
				</Box>
				<Box>
					<TextField
						onChange={(e) => setUser({...user, password: e.target.value})}
						placeholder='password'
						type='password'
						value={password}
						error={!validPassword && password.length > 0}
						label={!validPassword && password.length > 0 ? 'minimum 3' : ''}
					/>
				</Box>
				<Box sx={{mt: 2}}>
					<Button onClick={() => loginUser(user, navigate)} variant='contained'>
						SUBMIT
					</Button>
				</Box>
			</Box>
		</div>
	);
};

export default Authorization;
