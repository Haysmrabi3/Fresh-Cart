import './App.css';
import {Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home'
import Register from './Components/Register/Register'
import Login from './Components/Login/Login'
import NotFoundPage from './Components/NotFoundPage/NotFoundPage'
import Products from './Components/Products/Products'
import Categories from './Components/Caregories/Categories'
import Cart from './Components/Cart/Cart'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import AuthContextProvider from './Context/AuthContext'
import AuthProtected from './Components/AuthProtected/AuthProtected'
import ProductDetailes from './Components/ProductDetailes/ProductDetailes'
import { Toaster } from 'react-hot-toast'
import WishListContextProvider from './Context/WishListConteaxt'
import { QueryClient, QueryClientProvider } from 'react-query'
import Profile from './Components/Profile/Profile'
import WishList from './Components/WishList/WishList'
import CartContextProvider from './Context/CartContext'
import FogetPassword from './Components/FogetPassword/FogetPassword'
import VerifyCode from './Components/VerifyCode/VerifyCode'
import UserContextProvider from './Context/UserContext'
import ResetPassword from './Components/ResetPassword/ResetPassword'
import Allorders from './Components/Allorders/Allorders'
import OnlinePayment from './Components/OnlinePayment/OnlinePayment'







function App() {
  const queryClint = new QueryClient()

const router = createBrowserRouter([
  {path:`` , element:<Layout/> , children: [
    {path:`` , element: <Navigate to={`/home`} /> },
    {path:`home` , element:<ProtectedRoute><Home/></ProtectedRoute>},
    {path:`profile` , element: <ProtectedRoute><Profile/></ProtectedRoute> },
    {path:`onlinepayment` , element: <ProtectedRoute><OnlinePayment/></ProtectedRoute>},
    {path:`Wishlist` , element: <ProtectedRoute><WishList/></ProtectedRoute>},
    {path:`products` , element: <ProtectedRoute><Products/></ProtectedRoute>},
    {path:`categories` , element: <ProtectedRoute><Categories/></ProtectedRoute>},
    {path:`cart` , element: <ProtectedRoute><Cart/></ProtectedRoute>},
    {path:`allorders` , element: <ProtectedRoute><Allorders/></ProtectedRoute>},
    {path:`productDetails/:id` , element: <ProtectedRoute><ProductDetailes/></ProtectedRoute>},
    {path:`regestier` , element:<AuthProtected><Register/></AuthProtected>  },
    {path:`login` , element:<AuthProtected><Login /></AuthProtected> },
    {path:`fogetpassword` , element: <FogetPassword/>},
    {path:`verifycode` , element: <VerifyCode/>},
    {path:`ResetPassword` , element: <ResetPassword/>},
    {path:`Fresh-Cart/` , element: <Navigate to={`/Home`} /> ,},
    {path:`*` , element: <NotFoundPage/>},
  ]}
])


  return<>
  
    <UserContextProvider>
  <CartContextProvider>
  <QueryClientProvider client={queryClint}>
  <WishListContextProvider>
  <AuthContextProvider>
    <RouterProvider router={router} ></RouterProvider>
    </AuthContextProvider>
  </WishListContextProvider>
  </QueryClientProvider>
  </CartContextProvider>
  </UserContextProvider>
  <Toaster/>


  
  
  </>
}

export default App;
