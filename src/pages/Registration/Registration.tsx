import React, {useState} from 'react';
import {Box, Button, TextField, Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {useAction} from '../../hooks/useAction';
import {IUser} from '../../types/auth';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/reducers';
import Preloader from '../../components/Preloader/Preloader';

const Registration = () => {
	const {createUser} = useAction();
	const {loading} = useSelector((state: RootState) => state.auth);
	const [user, setUser] = useState<IUser>({name: '', email: '', password: ''});
	const {name, email, password} = user;
	const navigate = useNavigate();

	return (
		<div>
			<Typography variant='h3' sx={{textAlign: 'center', mt: 3}}>
				Registration
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
				<Box>
					<TextField
						onChange={(e) => setUser({...user, name: e.target.value})}
						placeholder='name'
						value={name}
					/>
				</Box>
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
					<Button
						onClick={() => createUser(user, navigate)}
						variant='contained'>
						SUBMIT
					</Button>
				</Box>
			</Box>
		</div>
	);
};

export default Registration;
