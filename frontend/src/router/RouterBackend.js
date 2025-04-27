import Dashboard from "../pages/backend/Dashboard";
import { BannerList, BannerCreate, BannerTrashList, BannerUpdate, BannerShow,} from "../pages/backend/Banner";
import { ProductCreate, ProductList, ProductShow, ProductTrashList, ProductUpdate, } from "../pages/backend/Product";
import { ProductStoreCreate,  ProductStoreList, ProductStoreShow, ProductStoreTrashList, ProductStoreUpdate, } from "../pages/backend/ProductStore";
import { BrandCreate, BrandList, BrandShow, BrandTrashList,BrandUpdate, } from "../pages/backend/Brand";
import { CategoryList, CategoryTrashList,CategoryCreate,CategoryUpdate, CategoryShow } from "../pages/backend/Category";
import { PostList, PostTrashList,PostCreate, PostUpdate, PostShow } from "../pages/backend/Post";
import { TopicList, TopicTrashList,TopicCreate,TopicUpdate, TopicShow  } from "../pages/backend/Topic";
import { MenuCreate, MenuList, MenuShow, MenuTrashList, MenuUpdate, } from "../pages/backend/Menu";
import { ContactList, ContactShow, ContactTrashList, } from "../pages/backend/Contact";
import { UserCreate, UserList, UserShow, UserTrashList, UserUpdate } from "../pages/backend/User";
import { ProductSaleCreate, ProductSaleList, ProductSaleShow, ProductSaleTrashList, ProductSaleUpdate } from "../pages/backend/ProductSale";
import { OrderList, OrderShow, OrderTrashList, OrderUpdate } from "../pages/backend/Order";


const RouterBackend = [
//Dashboard
  { path: "/admin", element: <Dashboard /> }, 
//Banner
  { path: "/admin/banner", element: <BannerList /> },
  { path: "/admin/add-banner", element: <BannerCreate /> },
  { path: "/admin/banner/trash", element: <BannerTrashList /> },
  { path: "/admin/banner/update/:id", element: <BannerUpdate /> },
  { path: "/admin/banner/show/:id", element: <BannerShow /> },
//Product
  { path: "/admin/products", element: <ProductList /> },
  { path: "/admin/products/trash", element: <ProductTrashList /> },
  { path: "/admin/add-product", element: <ProductCreate /> },
  { path: "/admin/product/update/:id", element: <ProductUpdate /> },
  { path: "/admin/product/show/:id", element: <ProductShow /> },
//Product Store  
  { path: "/admin/product-store", element: <ProductStoreList /> },
  { path: "/admin/product-store/create", element: <ProductStoreCreate /> },
  { path: "/admin/product-store/trash", element: <ProductStoreTrashList /> },
  { path: "/admin/product-store/show/:id", element: <ProductStoreShow /> },
  { path: "/admin/product-store/update/:id", element: <ProductStoreUpdate /> },
//Product Sale  
  { path: "/admin/product-sale", element: <ProductSaleList /> },
  { path: "/admin/product-sale/create", element: <ProductSaleCreate /> },
  { path: "/admin/product-sale/trash", element: <ProductSaleTrashList /> },
  { path: "/admin/product-sale/show/:id", element: <ProductSaleShow /> },
  { path: "/admin/product-sale/update/:id", element: <ProductSaleUpdate /> },
//Brand  
  { path: "/admin/brands", element: <BrandList /> },
  { path: "/admin/add-brand", element: <BrandCreate /> },
  { path: "/admin/brands/trash", element: <BrandTrashList /> },
  { path: "/admin/brand/update/:id", element: <BrandUpdate /> },
  { path: "/admin/brand/show/:id", element: <BrandShow /> },
//Category
  { path: "/admin/categories", element: <CategoryList /> },
  { path: "/admin/add-category", element: <CategoryCreate/> },
  { path: "/admin/categories/trash", element: <CategoryTrashList /> },
  { path: "/admin/categories/update/:id", element: <CategoryUpdate /> },
  { path: "/admin/categories/show/:id", element: <CategoryShow /> },
//Post 
  { path: "/admin/posts", element: <PostList /> },
  { path: "/admin/add-posts", element: <PostCreate /> },
  { path: "/admin/posts/trash", element: <PostTrashList /> },
  { path: "/admin/posts/update/:id", element: <PostUpdate /> },
  { path: "/admin/posts/show/:id", element: <PostShow /> },
//Topic  
  { path: "/admin/topics", element: <TopicList /> },
  { path: "/admin/topics/trash", element: <TopicTrashList /> },
  { path: "/admin/add-topics", element: <TopicCreate /> },
  { path: "/admin/topics/update/:id", element: <TopicUpdate /> },
  { path: "/admin/topics/show/:id", element: <TopicShow /> },
//Menu  
  { path: "/admin/menus", element: <MenuList /> },
  { path: "/admin/menus/trash", element: <MenuTrashList /> },
  { path: "/admin/add-menu", element: <MenuCreate /> },
  { path: "/admin/menu/update/:id", element: <MenuUpdate /> },
  { path: "/admin/menu/show/:id", element: <MenuShow /> },
//User
  { path: "/admin/users", element: <UserList /> },
  { path: "/admin/users/trash", element: <UserTrashList /> },
  { path: "/admin/add-user", element: <UserCreate /> },
  { path: "/admin/user/update/:id", element: <UserUpdate /> },
  { path: "/admin/user/show/:id", element: <UserShow /> },
//Contact
  { path: "/admin/contact", element: <ContactList /> },
  { path: "/admin/contact/trash", element: <ContactTrashList /> },
  { path: "/admin/contact/show/:id", element: <ContactShow /> },
//Oder
  { path: "/admin/order", element: <OrderList /> },
  { path: "/admin/order/trash", element: <OrderTrashList /> },
  { path: "/admin/order/show/:id", element: <OrderShow /> },
  { path: "/admin/order/update/:id", element: <OrderUpdate /> },
];

export default RouterBackend;
