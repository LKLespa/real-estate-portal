import { Navigate, createBrowserRouter, useNavigate } from "react-router-dom";
import { LoginPage, RegisterPage, HomePage, PropertyPage, ProfilePage } from "./pages";
import { NavigationWrapper } from "./layouts";
import { CategoryProvider } from "./context/category_context";
import { PropertiesProvider } from "./context/properties_context";

const routes = createBrowserRouter([
  {
    path: "",
    element: (
      <CategoryProvider>
        <PropertiesProvider>
          <NavigationWrapper />
        </PropertiesProvider>
      </CategoryProvider>
    ),
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "property/:propertyId",
        element: <PropertyPage />,
      },
      {
        path: 'profile',
        element: <ProfilePage />
      }
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/*",
    element: <Navigate to="/" />,
  },
]);

export default routes;