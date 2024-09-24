import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="h-screen flex flex-col justify-center items-center bg-gray-100">
            <h1 className="text-6xl font-bold text-gray-800">404</h1>
            <h2 className="text-2xl font-semibold text-gray-600 mt-4">Page Not Found</h2>
            <p className="mt-4 text-gray-500">
                Oops! The page you&#39;re looking for doesn&#39;t exist.
            </p>
            <Link
                to="/"
                className="mt-6 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
                Go Back Home
            </Link>
        </div>
    );
};

export default NotFound;
