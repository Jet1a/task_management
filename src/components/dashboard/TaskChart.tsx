import { useEffect, useState } from "react";
import Chart from "react-google-charts";
import { TaskType } from "../../pages/TaskManagementPage";
import { Skeleton } from "antd";

const TaskChart = () => {
  const [tasks, setTasks] = useState<TaskType[]>([]);

  useEffect(() => {
    const localTasks = localStorage.getItem("tasks");
    if (localTasks && JSON.parse(localTasks)) {
      setTasks(JSON.parse(localTasks));
    }
  }, []);

  const data = [
    [
      { type: "string", id: "Task ID" },
      { type: "string", id: "Task Name" },
      { type: "date", id: "Start Date" },
      { type: "date", id: "End Date" },
    ],
    ...tasks.map((task) => [
      task.status,
      task.title,
      new Date(task.createdOn),
      new Date(task.dateRange),
    ]),
  ];

  const options = {
    alternatingRowStyle: false,
    timeline: {
      showRowLabels: true,
      rowLabelStyle: { fontName: "Poppins", fontSize: 18 },
      barLabelStyle: { fontName: "Poppins", fontSize: 16 },
    },
    height: 500,
  };

  return (
    <Chart
      chartType="Timeline"
      width="100%"
      data={data}
      options={options}
      loader={<Skeleton.Node active style={{ width: "100%", height: 500 }} />}
    />
  );
};

export default TaskChart;
