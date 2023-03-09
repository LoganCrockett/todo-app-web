import "./assets/styles/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from "./components/Layout";
import SignIn from './components/SignIn';
import NotFound from './components/NotFound';

function App() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          path: "/login",
          element: <SignIn />
        },
        {
          path: "/*",
          element: <NotFound />
        }
      ]
    }
  ]);

  return (
      <div className="App">
        <RouterProvider router={router} />
      </div>
  )
}

export default App
