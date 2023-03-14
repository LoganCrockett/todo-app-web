import { RouteObject } from "react-router-dom";
import Layout from "../components/Layout";
import NotFound from "./NotFound";
import Login from "./Login";

const routes: RouteObject[] = [
    {
        element: <Layout />,
        children: [
          {
            path: "/",
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