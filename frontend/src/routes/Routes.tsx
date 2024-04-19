import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import AddContacts from "../pages/AddContacts";
import Main from "../layouts/Main";
import AllContacts from "../pages/AllContacts";

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
      {
        path: "all-contacts",
        element: <AllContacts />,
      },
    ],
  },
]);

export default router;
