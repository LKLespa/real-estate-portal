import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "./pages";

const routes = createBrowserRouter([
    {
      path: '/login',
      element: <LoginPage />
    },
  ]);

  export default routes;