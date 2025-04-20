import {
  FilterOutlined,
  PlusOutlined,
  SortAscendingOutlined,
} from "@ant-design/icons";
import {
  Button,
  Flex,
  Form,
  Input,
  DatePicker,
  Select,
  Radio,
  SelectProps,
} from "antd";
import { format } from "date-fns";
import { useModal } from "../context/ModalContext";
import { CheckboxGroupProps } from "antd/es/checkbox";
import { categories } from "../data/categories";
import { useEffect, useState } from "react";
import TaskItem from "../components/taskManagement/TaskItem";
import toast from "react-hot-toast";

export type TaskType = {
  taskId: number;
  title: string;
  description: string;
  dateRange: Date;
  category: string;
  status: string;
};

const statusOptions: CheckboxGroupProps<string>["options"] = [
  { label: "Todo", value: "Todo" },
  { label: "On Process", value: "On Process" },
  { label: "Done", value: "Done" },
];

const categoryOptions: SelectProps["options"] = categories;

const TaskManagementPage = () => {
  const { openModal, closeModal } = useModal();
  const [form] = Form.useForm<TaskType>();

  const [tasks, setTasks] = useState<TaskType[]>([]);

  const minDate = new Date().toISOString();

  useEffect(() => {
    const localTasks = localStorage.getItem("tasks");
    if (localTasks && JSON.parse(localTasks)) {
      setTasks(JSON.parse(localTasks));
    }
  }, []);

  const handleSubmitTask = (values: TaskType) => {
    const highestId =
      tasks.length > 0 ? Math.max(...tasks.map((task) => task.taskId)) : 0;

    const newTasks = { ...values, taskId: highestId + 1 };

    const updatedTasks = [...tasks, newTasks];
    setTasks(updatedTasks);
    toast.success("Task added successfully");
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    closeModal();
  };

  const handleDeleteTask = (taskId: number) => {
    if (!taskId) toast.error("Something went wrong.");

    setTasks((tasks) => tasks.filter((task) => task.taskId !== taskId));

    const currentLocalTasks = localStorage.getItem("tasks");

    if (!currentLocalTasks) {
      toast.error("Something went wrong.");
      return;
    }

    let currentTasks: TaskType[] = JSON.parse(currentLocalTasks);

    currentTasks = currentTasks.filter((task) => task.taskId !== taskId);

    localStorage.setItem("tasks", JSON.stringify(currentTasks));
    toast.success("Task have been removed!");
  };

  const handleEditTask = (task: TaskType) => {
    console.log(task);
  };

  const handleOpenModal = () => {
    openModal(
      <div className="flex flex-col space-y-2">
        <h2 className="text-2xl font-bold mb-4">Add your Task</h2>
        <Form
          form={form}
          layout="vertical"
          name="task_form"
          clearOnDestroy
          onFinish={handleSubmitTask}
        >
          <Form.Item
            id="title"
            label="Task Title"
            name="title"
            rules={[{ required: true, message: "Please input your Title!" }]}
          >
            <Input placeholder="Task title" />
          </Form.Item>
          <Form.Item id="description" label="Description" name="description">
            <Input.TextArea />
          </Form.Item>
          <Form.Item id="dateRange" label="Due Date" name="dateRange">
            <DatePicker
              disabledDate={(current) =>
                current && current.toDate() < new Date(minDate)
              }
            />
          </Form.Item>
          <Form.Item id="category" label="Category/Tags" name="category">
            <Select
              style={{ width: "100%" }}
              placeholder="Category"
              options={categoryOptions}
            />
          </Form.Item>
          <Form.Item
            id="status"
            label="Status"
            name="status"
            rules={[
              { required: true, message: "Please select your task status!" },
            ]}
          >
            <Radio.Group
              block
              options={statusOptions}
              optionType="button"
              buttonStyle="outline"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full my-2">
              Submit
            </Button>
            <Button
              type="default"
              htmlType="button"
              className="w-full"
              onClick={closeModal}
            >
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  };

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
          <span>My Task</span>
        </div>
        <Flex gap="middle" align="center">
          <Button icon={<FilterOutlined />}>Filter</Button>
          <Button icon={<SortAscendingOutlined />}>Sort</Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            iconPosition="start"
            onClick={handleOpenModal}
          >
            New Task
          </Button>
        </Flex>
      </Flex>

      <div className="">
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              <TaskItem
                task={task}
                onDeleteTask={handleDeleteTask}
                onEditTask={handleEditTask}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskManagementPage;
