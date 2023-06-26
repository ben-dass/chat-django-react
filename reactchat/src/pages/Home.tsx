import { CssBaseline } from '@mui/material';
import PrimaryAppBar from './template/PrimaryAppBar';
import Box from '@mui/material/Box';
import PrimaryDraw from './template/PrimaryDraw';
import SecondaryDraw from './template/SecondaryDraw';
import Main from './template/Main';

const Home = () => (
	<Box sx={{ display: 'flex' }}>
		<CssBaseline />
		<PrimaryAppBar />
		<PrimaryDraw />
		<SecondaryDraw />
		<Main />
		Home
	</Box>
);

export default Home;
