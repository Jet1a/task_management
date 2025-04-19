import {
  FilterOutlined,
  MenuOutlined,
  PlusOutlined,
  SortAscendingOutlined,
} from "@ant-design/icons";
import { Button, Flex } from "antd";
import { format } from "date-fns";
import { useModal } from "../context/ModalContext";

const TaskManagementPage = () => {
  const { openModal } = useModal();

  return (
    <div className="p-2">
      <header className="flex flex-col space-y-2 mb-8">
        <span>{format(new Date(), "EEEE, do MMMM")}</span>
        <h1 className="text-4xl font-bold">Task Management</h1>
        <p className="w-[500px] text-slate-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi totam
          minima id optio culpa ducimus.
        </p>
      </header>
      <Flex gap="middle" align="center" justify="space-between">
        <div className="flex items-center justify-between">
          <span>
            <MenuOutlined /> My Task
          </span>
        </div>
        <Flex gap="middle" align="center">
          <Button icon={<FilterOutlined />}>Filter</Button>
          <Button icon={<SortAscendingOutlined />}>Sort</Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            iconPosition="start"
            onClick={openModal}
          >
            New Task
          </Button>
        </Flex>
      </Flex>
    </div>
  );
};

export default TaskManagementPage;
