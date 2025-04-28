import { Flex, Skeleton } from "antd";
import { useEffect, useState } from "react";
import Chart from "react-google-charts";
import { TodoItemType } from "../../pages/TodoPage";

const TodoChart = () => {
  const [todos, setTodos] = useState<TodoItemType[]>([]);

  useEffect(() => {
    const localTodos = localStorage.getItem("todos");
    if (localTodos && JSON.parse(localTodos)) {
      setTodos(JSON.parse(localTodos));
    }
  }, []);

  const pieData = [
    ["Todo", "Counts"],
    ["Completed", todos.filter((todo) => todo.completed).length],
    ["Todo", todos.filter((todo) => !todo.completed).length],
  ];

  const pieOptions = {
    pieSliceText: "value",
    pieStartAngle: 200,
    width: 385,
    colors: ["#0F9D58", "#ed3e31"],
    fontName: "Poppins",
    fontSize: 14,
    legend: {
      position: "bottom",
      textStyle: { fontName: "Poppins", fontSize: 14, bold: true },
    },
  };

  const columnData = [
    ["Priority", "Counts", { role: "style" }],
    ["Low", todos.filter((todo) => todo.priority === "low").length, "#00C950"],
    [
      "Medium",
      todos.filter((todo) => todo.priority === "medium").length,
      "#F0B100",
    ],
    [
      "High",
      todos.filter((todo) => todo.priority === "high").length,
      "#FB2C36",
    ],
  ];

  const columnOptions = {
    width: 800,
    fontName: "Poppins",
    fontSize: 14,
    colors: ["#00C950"],
    legend: {
      position: "top",
      textStyle: { fontName: "Poppins", fontSize: 14, bold: true },
    },
  };

  return (
    <Flex align="center" gap="large">
      <div className="rounded-xl shadow-md p-1 border border-slate-100">
        <Chart
          chartType="PieChart"
          height="250px"
          data={pieData}
          options={pieOptions}
          loader={
            <Skeleton.Node active style={{ width: "100%", height: 250 }} />
          }
        />
      </div>

      <div className="rounded-xl shadow-md p-1 border border-slate-100">
        <Chart
          chartType="ColumnChart"
          height="250px"
          width="800px"
          data={columnData}
          options={columnOptions}
          loader={
            <Skeleton.Node active style={{ width: "100%", height: 250 }} />
          }
        />
      </div>
    </Flex>
  );
};

export default TodoChart;
