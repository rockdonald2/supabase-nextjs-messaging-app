import '@/styles/globals.scss';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import type { AppProps } from 'next/app';
import AuthContextProvider from '@/utils/AuthContext';
import { RouteGuard } from '@/utils/RouteGuard';
import { useMediaQuery } from '@mui/material';

function App({ Component, pageProps }: AppProps) {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const theme = createTheme({
        palette: {
            mode: prefersDarkMode ? 'dark' : 'light',
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AuthContextProvider>
                <RouteGuard>
                    <Component {...pageProps} />
                </RouteGuard>
            </AuthContextProvider>
        </ThemeProvider>
    );
}

export default App;
