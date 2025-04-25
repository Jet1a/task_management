import { Button, Checkbox, Flex, Input, Select } from "antd";
import { TodoItemType } from "../../pages/TodoPage";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useState } from "react";

interface TodoItemProps {
  todo: TodoItemType;
  onCompleted: (id: number) => void;
  onPriorityChange: (id: number, value: string) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, newTitle: string) => void;
}

const TodoItem = ({
  todo,
  onCompleted,
  onPriorityChange,
  onDelete,
  onEdit,
}: TodoItemProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  return (
    <Flex
      align="center"
      justify="space-between"
      gap={10}
      style={{ margin: "12px 0" }}
    >
      {isEdit ? (
        <>
          <Input
            defaultValue={todo.title}
            allowClear
            style={{ fontSize: "20px" }}
            required
            onChange={(e) => setNewTitle(e.target.value.trim())}
          />
        </>
      ) : (
        <Checkbox
          checked={todo.completed}
          onChange={() => onCompleted(todo.id)}
        >
          <span
            className={`text-xl font-semibold ${
              todo.completed && "line-through opacity-50"
            }`}
          >
            {todo.title}
          </span>
        </Checkbox>
      )}
      <Flex align="center" gap={12}>
        <Select
          defaultValue="low"
          value={todo.priority}
          onChange={(e) => onPriorityChange(todo.id, e)}
          style={{ width: "150px" }}
        >
          <Select.Option value="low">
            <div className="flex items-center text-green-500 ">
              <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
              Low
            </div>
          </Select.Option>

          <Select.Option value="medium">
            <div className="flex items-center text-yellow-500">
              <span className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></span>
              Medium
            </div>
          </Select.Option>

          <Select.Option value="high">
            <div className="flex items-center text-red-500">
              <span className="w-2 h-2 rounded-full bg-red-500 mr-2"></span>
              High
            </div>
          </Select.Option>
        </Select>
        <Flex align="center" gap={2}>
          {isEdit ? (
            <>
              <Button
                type="text"
                onClick={() => {
                  onEdit(todo.id, newTitle);
                  setIsEdit(false);
                }}
              >
                <CheckCircleOutlined />
              </Button>
              <Button type="text" onClick={() => setIsEdit(false)}>
                <CloseCircleOutlined />
              </Button>
            </>
          ) : (
            <>
              <Button type="text" onClick={() => setIsEdit(true)}>
                <EditOutlined />
              </Button>
              <Button type="text" onClick={() => onDelete(todo.id)}>
                <DeleteOutlined />
              </Button>
            </>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default TodoItem;
