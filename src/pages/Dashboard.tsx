import { LoadingOutlined } from "@ant-design/icons";
import { Flex, Spin } from "antd";
import React, { Suspense } from "react";

const TodoChart = React.lazy(() => import("../components/dashboard/TodoChart"));
const TaskChart = React.lazy(() => import("../components/dashboard/TaskChart"));

const DashboardPage = () => {
  return (
    <div className="p-4">
      <Suspense
        fallback={
          <Spin
            size="large"
            indicator={<LoadingOutlined spin />}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "100vh",
            }}
          />
        }
      >
        <Flex vertical gap="large">
          <Flex vertical gap={12}>
            <h1 className="text-2xl font-semibold">Todo Charts</h1>
            <TodoChart />
          </Flex>

          <Flex vertical gap={12}>
            <h1 className="text-2xl font-semibold">Task Timeline</h1>
            <TaskChart />
          </Flex>
        </Flex>
      </Suspense>
    </div>
  );
};

export default DashboardPage;
