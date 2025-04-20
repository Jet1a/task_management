import { Dropdown, MenuProps } from "antd";
import { TaskType } from "../../pages/TaskManagementPage";
import {
  ClockCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { useModal } from "../../context/ModalContext";

interface TaskItemProps {
  task: TaskType;
  onDeleteTask: (taskId: number) => void;
  onEditTask: (task: TaskType) => void;
}

const TaskItem = ({ task, onDeleteTask, onEditTask }: TaskItemProps) => {
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

    return daysDiff;
  };

  const handleTaskModalOpen = () => {
    openModal(
      <div className="flex flex-col space-y-2">
        <h2 className="text-2xl font-bold mb-4">{task.title}</h2>
        <h3 className="text-xl font-semibold">Description</h3>
        <p className="text-base">{task.description}</p>
      </div>
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

      <div className="flex gap-2 text-sm w-[300px]">
        <p className="px-4 py-1 rounded-md bg-orange-200">
          Category: {task.category}
        </p>
        <p className="px-4 py-1 rounded-md bg-orange-200">{task.status}</p>
      </div>

      <div className="flex items-center justify-center gap-4">
        <p className="flex items-center justify-center gap-2">
          <ClockCircleOutlined />
          {formatDateRange()} Days left
        </p>
        <Dropdown menu={menuProps} trigger={["click"]} placement="bottomRight">
          <EllipsisOutlined />
        </Dropdown>
      </div>
    </div>
  );
};

export default TaskItem;
