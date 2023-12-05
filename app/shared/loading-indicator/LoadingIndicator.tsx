import React from 'react';
import { CircularProgress } from '@mui/material';
import PropTypes from 'prop-types';

const LoadingIndicator = ({ size = '1.45rem' }) => {
    return (
        <div style={{ display: 'grid', placeItems: 'center' }}>
            <CircularProgress size={size} />
        </div>
    );
};

LoadingIndicator.propTypes = {
    size: PropTypes.string,
};
export default LoadingIndicator;
