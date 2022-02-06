import React, {useEffect} from 'react';
import Navbar from './components/Navbar/Navbar';
import {Route, Routes} from 'react-router-dom';
import Registration from './pages/Registration/Registration';
import Authorization from './pages/Authorization/Authorization';
import Analytics from './pages/Analytics/Analytics';
import {useAction} from './hooks/useAction';
import {useSelector} from 'react-redux';
import {RootState} from './store/reducers';
import './app.scss';

const App = () => {
	const {tokenAuth} = useAction();
	const {isAuth} = useSelector((state: RootState) => state.auth);
	useEffect(() => {
		if (localStorage.getItem('token')) {
			tokenAuth();
		}
	}, []);
	return (
		<div className='app'>
			<Navbar />
			<Routes>
				<Route path='/' element={<Registration />} />
				<Route path='/authorization' element={<Authorization />} />
				{isAuth && <Route path='/analytics' element={<Analytics />} />}
			</Routes>
		</div>
	);
};

export default App;
