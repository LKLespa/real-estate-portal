import { Navigate, createBrowserRouter, useNavigate } from "react-router-dom";
import { LoginPage, RegisterPage, RegisterUserForm, RegisterUserAs, HomePage } from "./pages";
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
        children: [
          {
            path: '',
            element: <RegisterUserAs />
          },
          {
            path: ':userType',
            element: <RegisterUserForm />,
            loader: ({ params }) => {
              console.log(params);
              if (!(params.userType == 'client' || params.userType === 'owner')) {
                throw new Error('Invalid user type');
              }
              return params.userType;
            }
          },
        ]
    }
  ]);

  export default routes;