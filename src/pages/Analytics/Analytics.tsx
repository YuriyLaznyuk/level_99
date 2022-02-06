import React, {useEffect, useRef} from 'react';
import {Box, Typography} from '@mui/material';
import {useAction} from '../../hooks/useAction';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/reducers';
import Preloader from '../../components/Preloader/Preloader';

const Analytics = () => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const {getDraw} = useAction();
	const {loading} = useSelector((state: RootState) => state.auth);

	useEffect(() => {
		getDraw(canvasRef);
	}, []);
	return (
		<Box
			component='div'
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				flexDirection: 'column',
				overflow: 'auto',
			}}>
			<Typography variant='h3' sx={{mt: 3, textAlign: 'center'}}>
				Analytics
			</Typography>
			{loading && (
				<Box mt={4}>
					<Preloader />
				</Box>
			)}
			<Box
				sx={{
					mt: 4,
					borderLeft: !loading ? '2px solid' : '',
					borderBottom: !loading ? '2px solid' : '',
				}}>
				<canvas ref={canvasRef} width={700} height={500}></canvas>
			</Box>
		</Box>
	);
};

export default Analytics;
