import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Result from "./pages/Result/Result";
import Home from "./pages/Home/Home";

const router = createBrowserRouter([
  {
    path: "/result",
    element: <Result />,
  },
  {
    path: "/",
    element: <Home />,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
