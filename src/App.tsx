import "./assets/styles/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import routes from "./pages/pages";

function App() {
  const router = createBrowserRouter(routes);

  return (
      <div className="App">
        <RouterProvider router={router} />
      </div>
  )
}

export default App
