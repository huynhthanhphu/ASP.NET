// import{ useRoutes} from "react-router-dom"
// import LayoutFrontend from "./layouts/frontend";
// import RouterFrontend from "./router/RouterFrontend";
// import LayoutBackend from "./layouts/backend";
// import RouterBackend from "./router/RouterBackend";
// import NotFound from "./pages/NotFound";


// function App(){
//   let element = useRoutes([
//     {
//       path: "/",
//       element: <LayoutFrontend/>,
//       children: RouterFrontend,
//     },
//     {
//       path: "/admin",
//       element: <LayoutBackend/>,
//       children: RouterBackend,
//     },
//     { path: "*", element: <NotFound/>},
//   ]);
//   return element;
// }

// export default App;

import { useRoutes, Navigate } from "react-router-dom";
import LayoutFrontend from "./layouts/frontend";
import RouterFrontend from "./router/RouterFrontend";
import LayoutBackend from "./layouts/backend";
import RouterBackend from "./router/RouterBackend";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/login/LoginAdmin"; 
import ForgotPassword from "./pages/login/ForgotPassword";
import ResetPassword from "./pages/login/ResetPassword";
import CustomerLogin from "./pages/login/CustomerLogin";
import CustomerRegister from "./pages/login/CustomerRegister";


function App() {
  const isAuthenticated = localStorage.getItem("admin_token"); // Kiểm tra nếu có token

  let element = useRoutes([
    {
      path: "/",
      element: <LayoutFrontend />,
      children: RouterFrontend,
    },
    {
      path: "/admin",
      element: isAuthenticated ? <LayoutBackend /> : <Navigate to="/login" replace />,
      children: RouterBackend,
    },
    {
      path: "/login",
      element: <AdminLogin />,
    },    
    { path: "*", element: <NotFound /> },
    { path: "/forgot-password", element: <ForgotPassword /> },
    { path: "/reset-password/:token", element: <ResetPassword />},
    { path: "/dang-nhap", element: <CustomerLogin /> },
    { path: "/dang-ky", element: <CustomerRegister /> },
  ]);

  return element;
}

export default App;
