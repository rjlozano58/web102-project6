import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import {createBrowserRouter, RouterProvider, Route} from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>,

    },{

        path: "/about",
        element: <About/>,

    }

]);

ReactDOM.createRoot(document.getElementById('root')).render(
    // <React.StrictMode>
    //     <App />
    // </React.StrictMode>

    <RouterProvider router={router} />

)
