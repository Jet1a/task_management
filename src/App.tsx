import { RouterProvider } from "react-router-dom";
import createRouter from "./routes";

function App() {
  const router = createRouter();

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
