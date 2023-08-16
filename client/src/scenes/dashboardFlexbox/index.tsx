import { Box, useMediaQuery } from '@mui/material';

const flexContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1.5rem',
    width: '100%',
    height: '100%',
};

const flexItemStyle = {
    backgroundColor: '#fff',
    flexGrow: 1,
    minHeight: '80px', // Adjust as needed
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};

const DashboardFlexbox = () => {
    const isAboveMediumScreens = useMediaQuery('(min-width: 1200px)');

    return (
        <Box sx={flexContainerStyle}>
            <Box sx={isAboveMediumScreens ? { ...flexItemStyle, flexBasis: '33.33%' } : flexItemStyle}>
                A
            </Box>
            <Box sx={isAboveMediumScreens ? { ...flexItemStyle, flexBasis: '33.33%' } : flexItemStyle}>
                B
            </Box>
            <Box sx={isAboveMediumScreens ? { ...flexItemStyle, flexBasis: '33.33%' } : flexItemStyle}>
                C
            </Box>
            <Box sx={flexItemStyle}>D</Box>
            <Box sx={flexItemStyle}>E</Box>
            <Box sx={flexItemStyle}>F</Box>
            <Box sx={flexItemStyle}>G</Box>
            <Box sx={flexItemStyle}>H</Box>
            <Box sx={flexItemStyle}>I</Box>
            <Box sx={flexItemStyle}>J</Box>
        </Box>
    );
};

export default DashboardFlexbox;
