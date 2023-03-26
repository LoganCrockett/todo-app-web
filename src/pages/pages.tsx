import { RouteObject } from "react-router-dom";
import Layout from "../components/Layout.component";
import NotFound from "./NotFound.page";
import Login from "./Login.page";
import SignUp from "./SignUp.page";
import Home from "./Home.page";

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