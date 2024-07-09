import React from 'react';
import './SkeletonLoader.css';

const SkeletonLoader = () => {
    return (
        <div className='bg-gray-300 p-4 rounded-md shadow-md animate-pulse'>
            <div className='w-full h-64 bg-gray-400 rounded-md mb-4'></div>
            <div className='h-6 bg-gray-400 rounded-md mb-2'></div>
            <div className='h-6 bg-gray-400 rounded-md'></div>
        </div>
    );
};

export default SkeletonLoader;
