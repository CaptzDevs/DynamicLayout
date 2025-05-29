/* import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
) */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router";
import './index.css'
import App from './App.jsx'
/* import Layout from './Pages/Layout'; */
import '@ant-design/v5-patch-for-react-19';
import Layout from './layout/Layout';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <App />,
        index : true
      },
    ]
  },

]);

createRoot(document.getElementById('root')).render(
 /*  <StrictMode> */
    <RouterProvider router={router} />
/*   </StrictMode>, */
)

