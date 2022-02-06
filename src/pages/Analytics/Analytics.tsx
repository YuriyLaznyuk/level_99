import React, {useEffect, useRef} from 'react';
import {Box, Typography} from '@mui/material';
import {useAction} from '../../hooks/useAction';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/reducers';
import Preloader from '../../components/Preloader/Preloader';
import {DataGrid, GridColDef, GridRowsProp} from '@mui/x-data-grid';

const Analytics = () => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const {getDraw, getList} = useAction();
	const {loading, loadingList, list} = useSelector(
		(state: RootState) => state.auth,
	);
	const rows: GridRowsProp = list;
	const columns: GridColDef[] = [
		{field: 'name', headerName: 'Name', width: 150},
		{field: 'status', headerName: 'Status', width: 150},
		{field: 'post', headerName: 'Post', width: 150},
		{field: 'age', headerName: 'Age', width: 150},
	];
	useEffect(() => {
		getDraw(canvasRef);
	}, []);
	useEffect(() => {
		if (loadingList) {
			getList();
		}
	}, [loadingList]);
	return (
		<Box
			component='div'
			sx={{
				display: {md: 'flex', xs: 'block'},

				justifyContent: 'center',
				alignItems: 'center',
				flexDirection: 'column',
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
					overflow: 'auto',
				}}>
				<canvas ref={canvasRef} width={700} height={500}></canvas>
			</Box>
			{loadingList && (
				<Box mt={4}>
					<Preloader />
				</Box>
			)}
			{list.length > 0 && (
				<Box
					component='div'
					sx={{
						height: 500,
						width: {md: 650, xs: '100%'},
						my: 4,
						py: 4,
					}}>
					<Typography variant='h4' sx={{textAlign: 'center'}}>
						random list
					</Typography>
					<DataGrid columns={columns} rows={rows} />
				</Box>
			)}
		</Box>
	);
};

export default Analytics;
