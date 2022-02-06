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

	return (
		<div>
			<Typography variant='h3' sx={{textAlign: 'center', mt: 3}}>
				Authorization
			</Typography>

			{loading && (
				<Typography
					variant='h5'
					sx={{
						display: 'flex',
						justifyContent: 'center',
						textAlign: 'center',
						mt: 3,
					}}>
					...Loading <Preloader />
				</Typography>
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
					/>
				</Box>
				<Box>
					<TextField
						onChange={(e) => setUser({...user, password: e.target.value})}
						placeholder='password'
						type='password'
						value={password}
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
