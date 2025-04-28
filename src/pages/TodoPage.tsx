import { Button, Divider, Flex, Form, Input, Skeleton } from "antd";
import React, { Suspense, useEffect, useState } from "react";
import { MinusCircleOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const PriorityCard = React.lazy(
  () => import("../components/todo/PriorityCard")
);
const TodoItem = React.lazy(() => import("../components/todo/TodoItem"));
export interface TodoItemType {
  id: number;
  title: string;
  priority: string;
  completed: boolean;
}

type TodoFormValues = {
  todos_item: TodoItemType[];
};

const TodoPage = () => {
  const [todos, setTodos] = useState<TodoItemType[]>([]);
  const [greeting, setGreeting] = useState("");
  const [priorityCount, setPriorityCount] = useState({
    low: 0,
    medium: 0,
    high: 0,
  });

  const [totalCount, setTotalCount] = useState({
    low: 0,
    medium: 0,
    high: 0,
  });

  const [form] = Form.useForm<TodoFormValues>();

  useEffect(() => {
    const localTodos = localStorage.getItem("todos");

    if (localTodos && JSON.parse(localTodos)) {
      const parsedTodos = JSON.parse(localTodos);
      setTodos(parsedTodos);
      updatePriorityCounts(parsedTodos);
    }

    const currentTime = new Date().getHours();

    if (currentTime >= 17) {
      setGreeting("Good Evening");
    } else if (currentTime >= 12) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Morning");
    }
  }, []);

  const updatePriorityCounts = (todoList: TodoItemType[]) => {
    const totals = {
      low: 0,
      medium: 0,
      high: 0,
    };

    const counts = {
      low: 0,
      medium: 0,
      high: 0,
    };

    todoList.forEach((todo) => {
      if (todo.priority === "low") totals.low++;
      else if (todo.priority === "medium") totals.medium++;
      else if (todo.priority === "high") totals.high++;

      if (todo.completed) {
        if (todo.priority === "low") counts.low++;
        else if (todo.priority === "medium") counts.medium++;
        else if (todo.priority === "high") counts.high++;
      }
    });

    setPriorityCount(counts);
    setTotalCount(totals);
  };

  const handleSubmitTodo = (values: TodoFormValues) => {
    const { todos_item } = values;

    if (!todos_item) {
      toast.error("Fields is empty");
      return;
    }

    const highestId =
      todos.length > 0 ? Math.max(...todos.map((todo) => todo.id)) : 0;

    const newTodos = todos_item.map((item, index) => ({
      ...item,
      id: highestId + index + 1,
      completed: false,
      priority: "low",
    }));

    const updatedTodos = [...todos, ...newTodos];
    setTodos(updatedTodos);
    updatePriorityCounts(updatedTodos);

    toast.success("Task(s) added successfully");
    localStorage.setItem("todos", JSON.stringify(updatedTodos));

    form.resetFields();
  };

  const handleCompletedTodo = (id: number) => {
    const completedTodo = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );

    setTodos(completedTodo);
    updatePriorityCounts(completedTodo);
    localStorage.setItem("todos", JSON.stringify(completedTodo));
    toast.success("Task completed!");
  };

  const handlePriorityChanged = (id: number, value: string) => {
    const editedTodo = todos.map((todo) =>
      todo.id === id ? { ...todo, priority: value } : todo
    );
    setTodos(editedTodo);
    updatePriorityCounts(editedTodo);
    localStorage.setItem("todos", JSON.stringify(editedTodo));
  };

  const handleDeleteTodo = (id: number) => {
    if (!id) {
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
        const currentLocalTodos = localStorage.getItem("todos");

        if (!currentLocalTodos) {
          toast.error("Something went wrong.");
          return;
        }

        let currentTodos: TodoItemType[] = JSON.parse(currentLocalTodos);

        currentTodos = currentTodos.filter((todo) => todo.id !== id);

        setTodos(currentTodos);
        updatePriorityCounts(currentTodos);
        localStorage.setItem("todos", JSON.stringify(currentTodos));

        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
          confirmButtonColor: "#A5DC86",
        });
      }
    });
  };

  const handleEditTodo = (id: number, newTitle: string) => {
    if (!newTitle || newTitle.length <= 0) {
      toast.error("Title cannot be empty");
      return;
    }

    const editedTodo = todos.map((todo) =>
      todo.id === id ? { ...todo, title: newTitle } : todo
    );

    setTodos(editedTodo);
    localStorage.setItem("todos", JSON.stringify(editedTodo));
    toast.success("Update successfully");
  };

  return (
    <div className="p-4">
      <Flex vertical gap={14}>
        <div>
          <h1 className="text-4xl font-bold">{greeting}</h1>
          <p className="text-xl font-light ">What do you plan to do today?</p>
        </div>

        <Flex gap={20}>
          <Suspense
            fallback={
              <>
                <Skeleton.Node active style={{ width: 200 }} />
                <Skeleton.Node active style={{ width: 200 }} />
                <Skeleton.Node active style={{ width: 200 }} />
              </>
            }
          >
            <PriorityCard
              priority="low"
              count={priorityCount.low}
              totalCount={totalCount.low}
            />
            <PriorityCard
              priority="medium"
              count={priorityCount.medium}
              totalCount={totalCount.medium}
            />
            <PriorityCard
              priority="high"
              count={priorityCount.high}
              totalCount={totalCount.high}
            />
          </Suspense>
        </Flex>
      </Flex>

      <p className="w-[120px] mt-6 text-lg font-semibold">Todo Task</p>

      <ul>
        {todos.length > 0 ? (
          todos
            .sort((a, b) => {
              return b.completed === a.completed ? 0 : b.completed ? -1 : 1;
            })
            .map((todo) => (
              <li key={todo.id}>
                <Suspense
                  fallback={
                    <Skeleton.Input
                      block
                      active
                      size="large"
                      style={{ marginTop: "12px", padding: "20px 0" }}
                    />
                  }
                >
                  <TodoItem
                    todo={todo}
                    onCompleted={handleCompletedTodo}
                    onPriorityChange={handlePriorityChanged}
                    onDelete={handleDeleteTodo}
                    onEdit={handleEditTodo}
                  />
                  <Divider />
                </Suspense>
              </li>
            ))
        ) : (
          <div className="text-center flex flex-col items-center justify-center gap-1">
            <QuestionCircleOutlined className="text-gray-500 text-4xl" />
            <p className="text-xl text-slate-500">Try adding some todo</p>
          </div>
        )}
      </ul>

      <Form
        form={form}
        name="todos_form"
        onFinish={handleSubmitTodo}
        layout="vertical"
        style={{ marginTop: "1rem" }}
      >
        <Form.List name="todos_item">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restFields }) => (
                <div
                  key={key}
                  className="flex items-start justify-center gap-2"
                >
                  <Form.Item
                    {...restFields}
                    name={[name, "title"]}
                    rules={[{ required: true, message: "Missing title" }]}
                    style={{ flex: 1, marginBottom: 4 }}
                  >
                    <Input
                      placeholder="Title"
                      style={{ width: "100%", fontSize: "16px" }}
                    />
                  </Form.Item>
                  <Form.Item>
                    <MinusCircleOutlined
                      style={{
                        fontSize: "20px",
                        color: "#F81D22",
                      }}
                      onClick={() => remove(name)}
                    />
                  </Form.Item>
                </div>
              ))}
              <Flex align="center" gap={8}>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
                <Form.Item>
                  <Button type="dashed" onClick={() => add()}>
                    Add field
                  </Button>
                </Form.Item>
              </Flex>
            </>
          )}
        </Form.List>
      </Form>
    </div>
  );
};

export default TodoPage;
