import { RouteObject } from "react-router-dom";
import Layout from "../components/Layout";
import NotFound from "../components/NotFound";
import Login from "../components/Login";

const routes: RouteObject[] = [
    {
        element: <Layout />,
        children: [
          {
            path: "/login",
            element: <Login />
          },
          {
            path: "/*",
            element: <NotFound />
          }
        ]
      }
];

export default routes;