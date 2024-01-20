import React from 'react';

const AnalyticsPage = async () => {
    const pro = await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('resolved ');
        }, 2000)
    })
    return <h2>Analytics</h2>;
};

export default AnalyticsPage;
