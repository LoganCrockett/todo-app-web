import { RouteObject } from "react-router-dom";
import Layout from "../components/Layout";
import NotFound from "./NotFound";
import Login from "./Login";
import SignUp from "./SignUp";
import Home from "./Home";

const routes: RouteObject[] = [
    {
        element: <Layout />,
        children: [
          {
            path: "/",
            element: <Login />
          },
          {
            path: "/signUp",
            element: <SignUp />
          },
          {
            path: "/home",
            element: <Home />
          },
          {
            path: "/*",
            element: <NotFound />
          }
        ]
      }
];

export default routes;