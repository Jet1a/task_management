import { Divider, Dropdown, MenuProps } from "antd";
import { TaskType } from "../../pages/TaskManagementPage";
import {
  CarFilled,
  ClockCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  HomeFilled,
  MessageFilled,
  ReadFilled,
  ShoppingFilled,
  SmileFilled,
  TagFilled,
} from "@ant-design/icons";
import { useModal } from "../../context/ModalContext";
import React from "react";
import { format } from "date-fns";

interface TaskItemProps {
  task: TaskType;
  onDeleteTask: (taskId: number) => void;
  onEditTask: (task: TaskType) => void;
  toggleStatus: (taskId: number) => void;
}

interface CategoryConfig {
  bgColor: string;
  icon?: React.ReactNode;
}

type CategoryConfigMap = {
  [key: string]: CategoryConfig;
};

type StatusConfigMap = {
  [key: string]: CategoryConfig;
};

const TaskItem = ({
  task,
  onDeleteTask,
  onEditTask,
  toggleStatus,
}: TaskItemProps) => {
  const { openModal } = useModal();

  const items: MenuProps["items"] = [
    {
      label: "Edit",
      key: "1",
      icon: <EditOutlined />,
      onClick: () => onEditTask(task),
    },
    {
      label: "Delete",
      key: "2",
      icon: <DeleteOutlined />,
      onClick: () => onDeleteTask(task.taskId),
    },
  ];

  const menuProps = {
    items,
  };

  const formatDateRange = () => {
    const currentDate = new Date();
    const endDate = new Date(task.dateRange);

    const dateDiff = endDate.getTime() - currentDate.getTime();
    const daysDiff = Math.ceil(dateDiff / (1000 * 3600 * 24));

    return (
      <p
        className={`flex items-center justify-center gap-2 ${
          daysDiff <= 3 && task.status != "Done" && "text-red-500"
        } ${task.status === "Done" && "text-green-500"}`}
      >
        <ClockCircleOutlined />
        {daysDiff != 0 && task.status === "Done"
          ? `Done on Time`
          : daysDiff < 0
          ? `${Math.abs(daysDiff)} Days Late`
          : `${daysDiff} Days left`}
      </p>
    );
  };

  const handleTaskModalOpen = () => {
    openModal(
      <div className="flex flex-col space-y-2">
        <div className="flex justify-start gap-2 w-auto">
          <h2 className="text-2xl font-bold ">{task.title}</h2>
          {categoryMapped()}
        </div>
        <Divider style={{ margin: "6px 0" }} />
        <h3 className="text-xl font-semibold">Description</h3>
        <p className="text-base">{task.description}</p>
        <p className="text-lg">
          <span className="font-semibold">Due date: </span>
          {format(new Date(task.dateRange), "PPPP")}
        </p>
      </div>
    );
  };

  const statusMapped = () => {
    const statusConfig: StatusConfigMap = {
      Todo: {
        bgColor: "bg-blue-200",
      },
      "On Process": {
        bgColor: "bg-orange-200",
      },
      Done: {
        bgColor: "bg-green-200",
      },
    };

    const config = statusConfig[task.status];

    return (
      <p
        className={`px-4 py-1 rounded-md ${config?.bgColor} cursor-pointer transition duration-200 hover:scale-105`}
        onClick={() => toggleStatus(task.taskId)}
      >
        {task.status}
      </p>
    );
  };

  const categoryMapped = () => {
    const categoryConfig: CategoryConfigMap = {
      Work: {
        bgColor: "bg-blue-200",
        icon: <ShoppingFilled />,
      },
      Personal: {
        bgColor: "bg-green-200",
        icon: <SmileFilled />,
      },
      Errands: {
        bgColor: "bg-yellow-200",
        icon: <TagFilled />,
      },
      Meetings: {
        bgColor: "bg-orange-200",
        icon: <MessageFilled />,
      },
      Home: {
        bgColor: "bg-purple-200",
        icon: <HomeFilled />,
      },
      School: {
        bgColor: "bg-pink-200",
        icon: <ReadFilled />,
      },
      Travel: {
        bgColor: "bg-indigo-200",
        icon: <CarFilled />,
      },
    };

    const config = categoryConfig[task.category];

    if (!config) return null;

    return (
      <p className={`px-4 py-1 rounded-md ${config.bgColor}`}>
        {config.icon} {task.category}
      </p>
    );
  };

  return (
    <div className="py-4 px-8 mt-6 flex items-center justify-between rounded-lg shadow-lg border border-slate-100 transition-all duration-300 hover:shadow-xl">
      <div
        className="flex flex-col cursor-pointer shrink-0 grow-0 w-64"
        onClick={handleTaskModalOpen}
      >
        <h2 className="text-xl font-semibold truncate">{task.title}</h2>
        <p className="text-md text-slate-600 truncate">{task.description}</p>
      </div>

      <div className="flex items-center justify-start gap-2 text-sm w-[300px]">
        {categoryMapped()}
        {statusMapped()}
      </div>

      <div className="flex items-center justify-end gap-4 w-[200px]">
        {formatDateRange()}
        <Dropdown menu={menuProps} trigger={["click"]} placement="bottomRight">
          <EllipsisOutlined />
        </Dropdown>
      </div>
    </div>
  );
};

export default TaskItem;
