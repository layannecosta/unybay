// Importações de componentes de páginas
import About from "./pages/about";
import Details from "./pages/details";
import Home from "./pages/home";
import ListRecentsProducts from "./pages/list-recents-products";
import ListAllProducts from "./pages/list-all-products";
import NotFound from "./pages/NotFound";
import SearchProducts from "./pages/search";

// Importações de estilos
import "./style.css";
import 'react-responsive-carousel/lib/styles/carousel.min.css';

// Importação do template base
import UserTemplate from "./template/user-template";
import AuthTemplate from "./template/auth-template";
import AdminTemplate from "./template/admin-template";

// Importações do React Router
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import UserProducts from "./pages/user-products";
import FormProducts from "./pages/form-product";
import Contact from "./pages/contact";
import FormProductsEdit from "./pages/form-product-edit";

// Importações do Toast
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


/**
 * Componente principal da aplicação
 * Configura e gerencia todas as rotas da aplicação usando React Router
 */
export default function App() {
  // Configuração das rotas da aplicação
  const router = createBrowserRouter([
    {
      // Rota da página inicial
      path: "/",
      element: (
        <UserTemplate>
          <Home />
        </UserTemplate>
      ),
    },
    {
      // Rota da página Quem Somos
      path: "/about",
      element: (
        <UserTemplate>
          <About />
        </UserTemplate>
      ),
    },
    {
      // Rota da listagem de produtos
      path: "/all-products",
      element: (
        <UserTemplate>
          <ListAllProducts />
        </UserTemplate>
      ),
    },
    {
      // Rota da listagem de produtos recentes
      path: "/all-recents-products",
      element: (
        <UserTemplate>
          <ListRecentsProducts />
        </UserTemplate>
      ),
    },
    {
      // Rota dos detalhes de um produto específico
      path: "/products/details/:id",
      element: (
        <UserTemplate>
          <Details />
        </UserTemplate>
      ),
    },
    {
      // Rota de busca de produtos
      path: "/products/search/:product",
      element: (
        <UserTemplate>
          <SearchProducts />
        </UserTemplate>
      ),
    },
    {
      // Rota de login
      path: "/login",
      element: (
        <AuthTemplate>
          <Login />
        </AuthTemplate>
      ),
    },
    {
      // Rota de registro
      path: "/register",
      element: (
        <AuthTemplate>
          <Register />
        </AuthTemplate>
      ),
    },
    {
      // Rota do dashboard
      path: "/dashboard",
      element: (
        <AdminTemplate>
          <Dashboard />
        </AdminTemplate>
      ),
    },
    {
      // Rota exibição de produtos
      path: "/my-products",
      element: (
        <AdminTemplate>
          <UserProducts />
        </AdminTemplate>
      ),
    },
    {
      // Rota cadastro de produtos
      path: "/form-products",
      element: (
        <AdminTemplate>
          <FormProducts />
        </AdminTemplate>
      ),
    },
    {
      // Rota cadastro de produtos
      path: "/form-products-edit/:id",
      element: (
        <AdminTemplate>
          <FormProductsEdit />
        </AdminTemplate>
      ),
    },
    {
      // Rota contato
      path: "/contact",
      element: (
        <UserTemplate>
          <Contact />
        </UserTemplate>
      ),
    },
    {
      // Rota para páginas não encontradas (404)
      path: "*",
      element: (
        <UserTemplate>
          <NotFound />
        </UserTemplate>
      ),
    },
  ]);

  // Renderiza o provedor de rotas com a configuração definida
  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
}