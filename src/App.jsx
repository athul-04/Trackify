import Home from "./pages/Home"
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router";
import Login from "./components/Login/Login";
const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <Home />,
  },
  {
    path: "/",
    element: <Login />,
  },
]);

export const App = () => {
  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <RouterProvider router={router} />
      </DndProvider>
    </>
  )
}