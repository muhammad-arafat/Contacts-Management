import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import AddContacts from "../pages/AddContacts";
import Main from "../layouts/Main";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "add-contacts",
        element: <AddContacts />,
      },
    ],
  },
]);

export default router;
