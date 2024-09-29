import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Result from "./pages/Result/Result";
import Home from "./pages/Home/Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();
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
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </QueryClientProvider>
  );
}

export default App;
