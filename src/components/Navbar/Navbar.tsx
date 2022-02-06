import React, {useState, MouseEvent} from 'react';
import {
	AppBar,
	Box,
	Button,
	IconButton,
	Menu,
	MenuItem,
	Toolbar,
	Typography,
} from '@mui/material';
import {Link} from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

import './navbar.scss';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/reducers';
import {useAction} from '../../hooks/useAction';

const Navbar = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const handleClick = (e: MouseEvent<HTMLButtonElement>) =>
		setAnchorEl(e.currentTarget);
	const handleClose = () => setAnchorEl(null);
	const open = Boolean(anchorEl);
	const {name, isAuth} = useSelector((state: RootState) => state.auth);
	const {logOutUser} = useAction();
	return (
		<div className='navbar'>
			<AppBar position='static' color='default'>
				<Box sx={{margin: '10px 40px'}}>
					<Toolbar>
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								width: '100%',
							}}>
							<Box
								sx={{
									display: {md: 'flex', xs: 'none'},
									justifyContent: 'center',
									alignItems: 'center',
								}}>
								<Button>
									<Link to='/'>registration</Link>
								</Button>
								<Button>
									<Link to='/authorization'>authorization</Link>
								</Button>
								{isAuth && (
									<Button>
										<Link to='/analytics'>analytics</Link>
									</Button>
								)}
							</Box>

							<Box sx={{display: {xs: 'flex', md: 'none'}}}>
								<IconButton
									size='large'
									aria-controls={open ? 'basic-menu' : undefined}
									aria-expanded={open ? 'true' : undefined}
									aria-haspopup='true'
									onClick={handleClick}
									color='inherit'>
									<MenuIcon sx={{fontSize: '2.4rem'}} />
								</IconButton>
								<Menu
									sx={{display: {xs: 'block', md: 'none'}}}
									id='basic-menu'
									anchorEl={anchorEl}
									open={open}
									onClose={handleClose}>
									<MenuItem onClick={handleClose}>
										<Link to='/'>registration</Link>
									</MenuItem>
									<MenuItem onClick={handleClose}>
										<Link to='/authorization'>authorization</Link>
									</MenuItem>
									{isAuth && (
										<MenuItem onClick={handleClose}>
											<Link to='/analytics'>analytics</Link>
										</MenuItem>
									)}
								</Menu>
							</Box>
							<Box
								sx={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
								}}>
								{isAuth && (
									<Button
										onClick={logOutUser}
										variant='contained'
										color='warning'
										sx={{mr: 2}}>
										logout
									</Button>
								)}
								<Typography variant='h6'>{name}</Typography>
							</Box>
						</Box>
					</Toolbar>
				</Box>
			</AppBar>
		</div>
	);
};

export default Navbar;
