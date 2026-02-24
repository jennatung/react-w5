import Layout from "../Layout";
import Home from "../pages/Home";
import ProductList from "../pages/ProductList";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import OrderSuccess from "../pages/orderSuccess";
import NotFound from "../pages/NotFound";
import AdminLayout from "../AdminLayout";

// 後台
import LoginPage from "../admin/LoginPage";
import OrderAdmin from "../admin/OrderAdmin";
import ProductAdmin from "../admin/ProductAdmin";
import ProtectedRoute from "../components/ProtectedRoute";

const routes = [
    {
        path:'/',
        element: <Layout />,
        children:[
            {
                index: true,
                element: <Home />
            },
            {
                path:'productList',
                element: <ProductList />
            },
            {
                path:'productDetails/:id',
                element: <ProductDetails />
            },
            {
                path:'cart',
                element: <Cart />,
            },
            {
                path: 'cart/checkout',
                element: <Checkout />
            },        
            {
                path: 'cart/checkout/order-success',
                element: <OrderSuccess />
            },
            {
                path: '/admin',
                element: <LoginPage />
            }
        ]
    },
    {
        path:'admin',
        element: (
        <ProtectedRoute>
            <AdminLayout />
        </ ProtectedRoute>),
        children: [
            {
                path: "product",
                element: <ProductAdmin />
            },
            {
                path: "order",
                element: <OrderAdmin />
            },
        ]
    },
    {
        path:"*",
        element: <NotFound />
    }
]

export default routes;


