import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import './map.css';
import Error from './pages/error-page';
import Home from './pages/home';
import Register from './pages/register';
import Login from './pages/signin';
import Map from './pages/map';
import Edit from './pages/edit_profile';
import Dashboard from './pages/dashboard';

import 'mapbox-gl/dist/mapbox-gl.css';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        errorElement: <Error />,
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/map',
        element: <Map />
    },
    {
        path: '/edit',
        element: <Edit />
    },
    {
        path: '/dashboard',
        element: <Dashboard />
    }
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

