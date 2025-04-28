import {
  PlusOutlined,
  QuestionCircleOutlined,
  SearchOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
} from "@ant-design/icons";
import { Button, Flex, Input, Skeleton } from "antd";
import { format } from "date-fns";
import { useModal } from "../context/ModalContext";
import React, { Suspense, useEffect, useState } from "react";

import toast from "react-hot-toast";
import Swal from "sweetalert2";

const TaskItem = React.lazy(
  () => import("../components/taskManagement/TaskItem")
);
const TaskForm = React.lazy(
  () => import("../components/taskManagement/TaskForm")
);

export type TaskType = {
  taskId: number;
  title: string;
  description: string;
  dateRange: Date | string
  createdOn: Date | string
  category: string;
  status: string;
};

const TaskManagementPage = () => {
  const { openModal, closeModal } = useModal();

  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const localTasks = localStorage.getItem("tasks");
    if (localTasks && JSON.parse(localTasks)) {
      setTasks(JSON.parse(localTasks));
    }
  }, []);

  const handleCreateTask = (values: TaskType) => {
    const highestId =
      tasks.length > 0 ? Math.max(...tasks.map((task) => task.taskId)) : 0;

    const newTasks = {
      ...values,
      taskId: highestId + 1,
      createdOn: new Date(),
    };

    const updatedTasks = [...tasks, newTasks];
    setTasks(updatedTasks);
    toast.success("Task added successfully");
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    closeModal();
  };

  const handleDeleteTask = (taskId: number) => {
    if (!taskId) {
      toast.error("Something went wrong.");
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setTasks((tasks) => tasks.filter((task) => task.taskId !== taskId));

        const currentLocalTasks = localStorage.getItem("tasks");

        if (!currentLocalTasks) {
          toast.error("Something went wrong.");
          return;
        }

        let currentTasks: TaskType[] = JSON.parse(currentLocalTasks);

        currentTasks = currentTasks.filter((task) => task.taskId !== taskId);

        localStorage.setItem("tasks", JSON.stringify(currentTasks));

        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
          confirmButtonColor: "#A5DC86",
        });
      }
    });
  };

  const handleEditTask = (editTask: TaskType) => {
    openModal(
      <div className="flex flex-col space-y-2">
        <h2 className="text-2xl font-bold mb-4">Edit your task</h2>
        <TaskForm
          editTask={editTask}
          onFinish={(values) => handleUpdateTask(editTask.taskId, values)}
          onCancel={closeModal}
        />
      </div>
    );
  };

  const handleUpdateTask = (editTaskId: number, values: TaskType) => {
    const updatedTasks = tasks.map((task) =>
      task.taskId === editTaskId
        ? { ...task, ...values, taskId: task.taskId }
        : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    toast.success("Task updated!");
    closeModal();
  };

  const handleOpenModal = () => {
    openModal(
      <div className="flex flex-col space-y-2">
        <h2 className="text-2xl font-bold mb-4">Add your Task</h2>
        <Suspense fallback={<div>Loading...</div>}>
          <TaskForm onFinish={handleCreateTask} onCancel={closeModal} />
        </Suspense>
      </div>
    );
  };

  const handleSort = () => {
    const newSortDirection = sortDirection === "asc" ? "desc" : "asc";

    setSortDirection(newSortDirection);

    const sortedTasks = [...tasks].sort((a, b) => {
      const dateA = new Date(a.dateRange).getTime();
      const dateB = new Date(b.dateRange).getTime();

      return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
    });

    setTasks(sortedTasks);
  };

  const handleToggleStatus = (taskId: number) => {
    const statusMapped = ["Todo", "On Process", "Done"];

    const currentStatus = tasks.find((task) => task.taskId === taskId)?.status;

    if (!currentStatus) return;

    const statusIndex = statusMapped.indexOf(currentStatus);

    const newStatus =
      statusIndex + 1 > statusMapped.length - 1
        ? statusMapped[0]
        : statusMapped[statusIndex + 1];

    const updatedTasks = tasks.map((task) =>
      task.taskId === taskId ? { ...task, status: newStatus } : task
    );

    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <div className="p-2">
      <header className="flex flex-col space-y-2 mb-8 w-full">
        <span>{format(new Date(), "EEEE, do MMMM")}</span>
        <h1 className="text-4xl font-bold">Task Management</h1>
        <p className="w-[500px] text-slate-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi totam
          minima id optio culpa ducimus.
        </p>
      </header>
      <Flex gap="middle" align="center" justify="space-between">
        <div className="flex items-center justify-between">
          <span className="w-[120px] font-semibold">My Task</span>
          <Input
            placeholder="Search..."
            allowClear
            suffix={<SearchOutlined />}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Flex gap="middle" align="center">
          <Button
            icon={
              sortDirection === "asc" ? (
                <SortAscendingOutlined />
              ) : (
                <SortDescendingOutlined />
              )
            }
            onClick={handleSort}
          >
            Sort
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            iconPosition="start"
            onClick={() => handleOpenModal()}
          >
            New Task
          </Button>
        </Flex>
      </Flex>

      <div>
        <ul>
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task, index) => (
              <li key={index}>
                <Suspense
                  fallback={
                    <Skeleton.Input
                      block
                      active
                      size="large"
                      style={{ marginTop: "18px", padding: "40px 0" }}
                    />
                  }
                >
                  <TaskItem
                    task={task}
                    onDeleteTask={handleDeleteTask}
                    onEditTask={handleEditTask}
                    toggleStatus={handleToggleStatus}
                  />
                </Suspense>
              </li>
            ))
          ) : (
            <div className="text-center pt-24 flex flex-col items-center justify-center gap-1">
              <QuestionCircleOutlined className="text-gray-500 text-4xl" />
              <p className="text-2xl text-slate-500">
                {searchQuery
                  ? "No matching tasks found"
                  : "Try adding some tasks"}
              </p>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default TaskManagementPage;
