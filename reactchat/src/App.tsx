import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import createMuiTheme from './theme/theme';
import Home from './pages/Home';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route>
			<Route
				path="/"
				element={<Home />}
			/>
		</Route>
	)
);

const App = () => {
	const theme = createMuiTheme();
	return (
		<ThemeProvider theme={theme}>
			<RouterProvider router={router} />
		</ThemeProvider>
	);
};

export default App;
