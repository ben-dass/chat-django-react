import { CssBaseline } from '@mui/material';
import PrimaryAppBar from './template/PrimaryAppBar';
import Box from '@mui/material/Box';
import PrimaryDraw from './template/PrimaryDraw';
import PopularChannels from '../components/PrimaryDrawer/PopularChannels';
import SecondaryDraw from './template/SecondaryDraw';
import Main from './template/Main';
import ExploreCategories from '../components/SecondaryDrawer/ExploreCategories';
import ExploreServer from '../components/Main/ExploreServer';

const Explore = () => (
	<Box sx={{ display: 'flex', overflow: 'hidden' }}>
		<CssBaseline />
		<PrimaryAppBar />
		<PrimaryDraw>
			<PopularChannels open={false} />
		</PrimaryDraw>
		<SecondaryDraw>
			<ExploreCategories />
		</SecondaryDraw>
		<Main>
			<ExploreServer />
		</Main>
	</Box>
);

export default Explore;
