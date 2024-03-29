import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import routes from "./pages/pages";
import "./App.css";

function App() {
  const router = createBrowserRouter(routes);

  return (
      <div className="App">
        <RouterProvider router={router} />
      </div>
  )
}

export default App
