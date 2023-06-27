import { Box, Typography, useTheme } from '@mui/material';
import axios from 'axios';

const SecondaryDraw = () => {
	const theme = useTheme();

	axios
		.get('http://localhost:8000/api/server/select/?category=cat1')
		.then((response) => {
			console.log(response.data);
		})
		.catch((error) => {
			console.log(error);
		});

	return (
		<Box
			sx={{
				mt: `${theme.primaryAppBar.height}px`,
				height: `calc(100vh - ${theme.primaryAppBar.height}px)`,
				minWidth: `${theme.secondaryDraw.width}px`,
				borderRight: `1px solid ${theme.palette.divider}`,
				display: { sx: 'none', xs: 'block' },
				overflow: 'auto',
			}}
		>
			{[...Array(50)].map((_, i) => (
				<Typography
					key={i}
					paragraph
				>
					{i + 1}
				</Typography>
			))}
		</Box>
	);
};

export default SecondaryDraw;
