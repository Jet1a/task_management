import { createBrowserRouter } from "react-router-dom";
import TaskManagementPage from "./pages/TaskManagementPage";
import RootLayout from "./layout";
import DashboardPage from "./pages/Dashboard";
import TodoPage from "./pages/TodoPage";

const createRouter = () =>
  createBrowserRouter([
    {
      path: "/",
      Component: RootLayout,
      children: [
        {
          index: true,
          Component: DashboardPage,
        },
        {
          path: "task-management",
          Component: TaskManagementPage,
        },
        {
          path: "todo",
          Component: TodoPage,
        },
      ],
    },
  ]);

export default createRouter;
