import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import {CssBaseline} from '@mui/material';
import {Provider} from 'react-redux';
import {store} from './store';

ReactDOM.render(
	<BrowserRouter>
		<CssBaseline>
			<Provider store={store}>
				<App />
			</Provider>
		</CssBaseline>
	</BrowserRouter>,
	document.getElementById('root'),
);
