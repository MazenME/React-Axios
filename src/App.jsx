import {  RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./components/Home/Home.jsx"
import Details from "./components/details/Details.jsx";

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "details/Details/",
      element: <Details /> ,children: [
        { path: ":id", element: <Details /> },
      ]
    },
  ]);



  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App
