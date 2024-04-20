import { Navigate, createBrowserRouter, useNavigate } from "react-router-dom";
import { LoginPage, RegisterPage, RegisterUserForm, RegisterUserAs, HomePage } from "./pages";
import { NavigationWrapper } from "./components";

const routes = createBrowserRouter([
  {
    path: '',
    element: <NavigationWrapper />,
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