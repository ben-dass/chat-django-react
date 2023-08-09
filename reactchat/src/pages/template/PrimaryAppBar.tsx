/* eslint-disable react-hooks/exhaustive-deps */
import { useTheme } from '@mui/material/styles';
import {
	AppBar,
	Box,
	Drawer,
	IconButton,
	Link,
	Toolbar,
	Typography,
	useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useEffect, useState } from 'react';
import ExploreCategories from '../../components/SecondaryDrawer/ExploreCategories';
import AccountButton from '../../components/PrimaryAppBar/AccountButton';

const PrimaryAppBar = () => {
	const theme = useTheme();
	const [sideMenu, setSideMenu] = useState(false);

	const isSmallScreen = useMediaQuery(theme.breakpoints.up('sm'));

	const list = () => (
		<Box
			sx={{ paddingTop: `${theme.primaryAppBar.height}px`, minWidth: 200 }}
			onClick={() => setSideMenu(false)}
		>
			<ExploreCategories />
		</Box>
	);

	useEffect(() => {
		if (isSmallScreen && sideMenu) {
			setSideMenu(false);
		}
	}, [isSmallScreen]);

	return (
		<AppBar
			sx={{
				zIndex: (theme) => theme.zIndex.drawer + 2,
				backgroundColor: theme.palette.background.default,
				borderBottom: `1px solid ${theme.palette.divider}`,
			}}
		>
			<Toolbar
				variant="dense"
				sx={{
					height: theme.primaryAppBar.height,
					minHeight: theme.primaryAppBar.height,
				}}
			>
				<Box sx={{ display: { xs: 'block', sm: 'none' } }}>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						sx={{ mr: 2 }}
						onClick={() => setSideMenu(!sideMenu)}
					>
						<MenuIcon />
					</IconButton>
				</Box>

				<Drawer
					anchor="left"
					open={sideMenu}
					onClose={() => setSideMenu(!sideMenu)}
				>
					{list()}
				</Drawer>

				<Link
					href="/"
					underline="none"
					color={'inherit'}
				>
					<Typography
						variant="h6"
						noWrap
						component={'div'}
						sx={{ display: { fontWeight: 700, letterSpacing: '-0.5px' } }}
					>
						DJ CHAT
					</Typography>
				</Link>
				<Box sx={{ flexGrow: 1 }}></Box>
				<AccountButton />
			</Toolbar>
		</AppBar>
	);
};

export default PrimaryAppBar;
