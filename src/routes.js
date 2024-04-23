import { Navigate, createBrowserRouter, useNavigate } from "react-router-dom";
import { LoginPage, RegisterPage, HomePage } from "./pages";
import { NavigationWrapper } from "./layouts";
import { CategoryProvider } from "./context/category_context";

const routes = createBrowserRouter([
  {
    path: '',
    element: <CategoryProvider>
      <NavigationWrapper />
    </CategoryProvider>,
    children: [
      {
        path: '/',
        element: <HomePage />
      }
    ]
  },
    {
      path: '/login',
      element: <LoginPage />
    },
    {
        path: '/register',
        element: <RegisterPage />,
    }
  ]);

  export default routes;