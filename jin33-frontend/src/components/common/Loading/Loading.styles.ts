import { SxProps, Theme } from '@mui/material';

export const getLoadingStyles = (theme: Theme) => {
    const styles: Record<string, SxProps<Theme>> = {
        container: {
            display: 'block',
            justifyContent: 'flex-start',
            alignItems: 'flex-start'
        },
        centered: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 9999,
        }
    };

    return styles;
}; 