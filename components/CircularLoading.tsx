import { Box, CircularProgress } from '@mui/material';

const CircularLoading = () => {
    return (
        <Box
            alignContent={'center'}
            justifyContent={'center'}
            display={'flex'}
            sx={{ width: '100%' }}
        >
            <CircularProgress />
        </Box>
    );
};

export default CircularLoading;
