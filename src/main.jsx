import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Main from './Main/Main.jsx';
import Home from './Pages/Home/Home.jsx';
import WishList from './Pages/WishList/WishList.jsx';
import ViewBook from './Pages/ViewBook/ViewBook.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children:[
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/wishList",
        element: <WishList></WishList>
      },
      {
        path: "/viewBook/:id",
        element: <ViewBook></ViewBook>
      },
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
