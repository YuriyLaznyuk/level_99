import React from 'react';
import Navbar from './components/Navbar/Navbar';
import {Route, Routes} from 'react-router-dom';
import Registration from './pages/Registration/Registration';
import Authorization from './pages/Authorization/Authorization';
import Analytics from './pages/Analytics/Analytics';
import './app.scss';

const App = () => {
	return (
		<div className='app'>
			<Navbar />
			<Routes>
				<Route path='/' element={<Registration />} />
				<Route path='/authorization' element={<Authorization />} />
				<Route path='/analytics' element={<Analytics />} />
			</Routes>
		</div>
	);
};

export default App;
