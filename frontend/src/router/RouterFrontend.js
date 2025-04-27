import Home from "../pages/frontend/Home";
import { ProductPage, ProductCategory, ProductDetail } from "../pages/frontend/Product";
import PostNew from "../components/PostNew";
import CartPage from "../pages/frontend/Cart/CartPage";
import {ProfilePage, } from "../pages/frontend/User";
import ContactPage from "../pages/frontend/Contact/ContactPage";
import ProfileUpdate from "../pages/frontend/User/ProfileUpdate";
import CheckoutPage from "../pages/frontend/Order/CheckoutPage";


const RouterFrontend = [
    { path: "/", element: <Home /> },

    //Product
    { path: "/san-pham", element: <ProductPage /> },
    { path: "/danh-muc/:id", element: <ProductCategory />},
    { path: "/san-pham/:id", element: <ProductDetail /> },
    
    //Contact
    { path: "/lien-he", element: <ContactPage /> },

    //Post
    { path: "/tin-tuc", element: <PostNew /> },

    //Cart
    { path: "/gio-hang", element: <CartPage /> },

    //User

    { path: "/customer/:id", element: <ProfilePage /> },
    { path: "/customer/update/:id", element: <ProfileUpdate /> },
    { path: "/checkout", element: <CheckoutPage /> },
];

export default RouterFrontend;
