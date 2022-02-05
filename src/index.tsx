import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import {CssBaseline} from '@mui/material';

ReactDOM.render(
	<BrowserRouter>
		<CssBaseline>
			<App />
		</CssBaseline>
	</BrowserRouter>,
	document.getElementById('root'),
);
