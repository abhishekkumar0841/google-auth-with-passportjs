import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { store } from "./redux/store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AuthChecker from "./components/AuthChecker.jsx";
import NotFound from "./pages/NotFound.jsx";
import PublicRouteChecker from "./components/PublicRouteChecker.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "login",
        element: <PublicRouteChecker element={<Login/>} />,
      },
      {
        path: "register",
        element: <PublicRouteChecker element={<Register/>} />,
      },
      {
        path: "dashboard",
        element: <AuthChecker element={<Dashboard/>} />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Toaster />
    <RouterProvider router={router} />
  </Provider>
);
