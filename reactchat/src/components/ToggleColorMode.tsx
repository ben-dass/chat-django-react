import React, { useEffect, useMemo, useState } from 'react';
import { CssBaseline, useMediaQuery } from '@mui/material';
import createMuiTheme from '../theme/theme';
import { ThemeProvider } from '@emotion/react';
import { ColorModeContext } from '../context/DarkModeContext';
import Cookies from 'js-cookie';

interface ToggleColorModeProps {
	children: React.ReactNode;
}

const ToggleColorMode: React.FC<ToggleColorModeProps> = ({ children }) => {
	const storedMode = Cookies.get('colorMode') as 'light' | 'dark';
	const preferredDarkMode =
		useMediaQuery('([prefers-color-scheme: dark])') || 'light';
	let defaultMode = storedMode || (preferredDarkMode ? 'dark' : 'light');

	if (defaultMode != 'light' && defaultMode != 'dark') {
		defaultMode = 'light';
	}

	const [mode, setMode] = useState<'light' | 'dark'>(defaultMode);

	const toggleColorMode = React.useCallback(() => {
		setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
	}, []);

	const colorMode = useMemo(() => ({ toggleColorMode }), [toggleColorMode]);

	const theme = React.useMemo(() => createMuiTheme(mode || 'light'), [mode]);

	useEffect(() => {
		Cookies.set('colorMode', mode);
	}, [mode]);

	return (
		<ColorModeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				{children}
			</ThemeProvider>
		</ColorModeContext.Provider>
	);
};

export default ToggleColorMode;
